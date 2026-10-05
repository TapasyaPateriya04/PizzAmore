/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { calculateSummary, safeRead, safeWrite, validateCoupon } from '../utils/order';

const CartContext = createContext(null);
const CART_KEY = 'pizzamore-cart-v1';
const ORDERS_KEY = 'pizzamore-orders-v1';
const COUPON_KEY = 'pizzamore-coupon-v1';

const makeId = () => `item-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.round(Math.random() * 1e9)}`}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => safeRead(CART_KEY, []));
  const [orders, setOrders] = useState(() => safeRead(ORDERS_KEY, []));
  const [couponCode, setCouponCode] = useState(() => safeRead(COUPON_KEY, ''));
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!safeWrite(CART_KEY, items)) setToast('Your bucket could not be saved in this browser. Keep this tab open.');
  }, [items]);

  useEffect(() => {
    if (!safeWrite(ORDERS_KEY, orders)) setToast('Your order history could not be saved in this browser.');
  }, [orders]);

  useEffect(() => {
    if (!safeWrite(COUPON_KEY, couponCode)) setToast('Your coupon could not be saved in this browser.');
  }, [couponCode]);

  useEffect(() => {
    if (couponCode && calculateSummary(items, couponCode).discount === 0) {
      setCouponCode('');
      setToast('Your coupon was removed because your bucket no longer meets its minimum.');
    }
  }, [items, couponCode]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addItem = useCallback((item) => {
    setItems((current) => [...current, { ...item, cartId: makeId(), quantity: item.quantity || 1 }]);
    setToast(`${item.name} added to your bucket.`);
  }, []);

  const updateItem = useCallback((cartId, item) => {
    setItems((current) => current.map((entry) => entry.cartId === cartId
      ? { ...item, cartId, quantity: entry.quantity }
      : entry));
    setToast(`${item.name} customization updated.`);
  }, []);

  const updateQuantity = useCallback((cartId, quantity) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.cartId !== cartId));
      return;
    }
    if (!Number.isInteger(quantity) || quantity > 20) {
      setToast('You can order between 1 and 20 of each pizza.');
      return;
    }
    setItems((current) => current.map((item) => item.cartId === cartId ? { ...item, quantity } : item));
  }, []);

  const removeItem = useCallback((cartId) => {
    setItems((current) => current.filter((item) => item.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode('');
  }, []);

  const applyCoupon = useCallback((code) => {
    const result = validateCoupon(code, items, orders);
    if (result.error) return result;
    setCouponCode(result.code);
    return result;
  }, [items, orders]);

  const removeCoupon = useCallback(() => setCouponCode(''), []);

  const placeOrder = useCallback(async (customer, paymentMethod) => {
    if (!items.length) throw new Error('Your bucket is empty.');
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    const summary = calculateSummary(items, couponCode);
    const order = {
      id: `PA-${new Date().toISOString().slice(2, 10).replaceAll('-', '')}-${globalThis.crypto?.randomUUID?.().slice(0, 6).toUpperCase() || Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      items: items.map((item) => ({ ...item })),
      couponCode,
      summary,
      customer: { ...customer },
      paymentMethod,
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
    };
    const updatedOrders = [order, ...orders];
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    } catch (error) {
      console.error('Could not save the new order in this browser.', error);
      throw new Error('We couldn’t save your order on this device. Your bucket is still here; check your browser storage and try again.');
    }
    setOrders(updatedOrders);
    clearCart();
    return order;
  }, [items, couponCode, orders, clearCart]);

  const reorder = useCallback((order) => {
    setItems((current) => [
      ...current,
      ...order.items.map((item) => ({ ...item, cartId: makeId() })),
    ]);
    setCouponCode('');
    setToast('Your previous pizzas are back in the bucket.');
  }, []);

  const totals = useMemo(() => calculateSummary(items, couponCode), [items, couponCode]);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(() => ({
    items, orders, couponCode, totals, itemCount, toast, setToast,
    addItem, updateItem, updateQuantity, removeItem, clearCart,
    applyCoupon, removeCoupon, placeOrder, reorder,
  }), [items, orders, couponCode, totals, itemCount, toast, addItem, updateItem, updateQuantity, removeItem, clearCart, applyCoupon, removeCoupon, placeOrder, reorder]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider.');
  return context;
}
