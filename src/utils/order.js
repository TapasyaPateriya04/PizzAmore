import { crusts, sizes, toppings } from '../data/pizzas';

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);

export const getUnitPrice = (item) => {
  const sizeAdjustment = sizes.find((size) => size.name === item.size)?.adjustment ?? 0;
  const crustAdjustment = crusts.find((crust) => crust.name === item.crust)?.adjustment ?? 0;
  const toppingTotal = (item.toppings || []).reduce(
    (sum, name) => sum + (toppings.find((topping) => topping.name === name)?.price ?? 0),
    0,
  );
  return Math.max(0, item.basePrice + sizeAdjustment + crustAdjustment + toppingTotal);
};

export const couponOffers = {
  FIRSTORDER: { label: '10% off your first order', type: 'percent', value: 10, max: 150, minimum: 299, firstOrder: true },
  PIZZALOVE: { label: '₹75 off', type: 'fixed', value: 75, minimum: 399 },
  VEGGIE20: { label: '20% off your veggie feast', type: 'percent', value: 20, max: 200, minimum: 599 },
  WELCOME10: { label: '10% off your order', type: 'percent', value: 10, max: 100, minimum: 249 },
};

export const calculateSummary = (items, couponCode = '') => {
  const subtotal = items.reduce((sum, item) => sum + getUnitPrice(item) * item.quantity, 0);
  const offer = couponOffers[couponCode];
  const eligible = offer && subtotal >= offer.minimum;
  const discount = eligible
    ? Math.min(offer.type === 'percent' ? subtotal * offer.value / 100 : offer.value, offer.max ?? Infinity, subtotal)
    : 0;
  const taxable = subtotal - discount;
  const tax = Math.round(taxable * 0.05);
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 40;
  return { subtotal, discount: Math.round(discount), tax, delivery, total: taxable + tax + delivery };
};

export const validateCoupon = (code, items, orders) => {
  const normalized = code.trim().toUpperCase();
  const offer = couponOffers[normalized];
  if (!offer) return { error: 'That code doesn’t look right. Check it and try again.' };
  if (offer.firstOrder && orders.length > 0) return { error: 'FIRSTORDER is only for your first PizzAmore order.' };
  const subtotal = calculateSummary(items).subtotal;
  if (subtotal < offer.minimum) return { error: `Add ${formatCurrency(offer.minimum - subtotal)} more to use ${normalized}.` };
  return { code: normalized, label: offer.label };
};

export const getOrderStatus = (order) => {
  const elapsedMinutes = (Date.now() - new Date(order.createdAt).getTime()) / 60000;
  if (elapsedMinutes >= 45) return 3;
  if (elapsedMinutes >= 20) return 2;
  if (elapsedMinutes >= 1) return 1;
  return 0;
};

export const safeRead = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Could not read saved ${key} data.`, error);
    return fallback;
  }
};

export const safeWrite = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Could not save ${key} data.`, error);
    return false;
  }
};
