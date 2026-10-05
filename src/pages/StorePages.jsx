/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { crusts, pizzas, sizes, toppings } from '../data/pizzas';
import { useCart } from '../context/CartContext';
import usePageMeta from '../hooks/usePageMeta';
import PizzaCard from '../components/PizzaCard';
import Reveal from '../components/Reveal';
import { formatCurrency, getOrderStatus, getUnitPrice } from '../utils/order';
import heroPizza from '../assets/background.jpg';
import pizzaFallback from '../assets/pizza2.jpg';

const shortDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const dateTime = (date) => new Date(date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

function SectionHeading({ eyebrow, title, copy }) {
  return <Reveal className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</Reveal>;
}

function PageIntro({ eyebrow, title, copy }) {
  return <Reveal as="section" className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{copy && <p>{copy}</p>}</Reveal>;
}

function Totals({ totals, couponCode }) {
  return (
    <dl className="totals-list">
      <div><dt>Subtotal</dt><dd>{formatCurrency(totals.subtotal)}</dd></div>
      {totals.discount > 0 && <div className="discount-line"><dt>Discount <span>{couponCode}</span></dt><dd>−{formatCurrency(totals.discount)}</dd></div>}
      <div><dt>Taxes (5%)</dt><dd>{formatCurrency(totals.tax)}</dd></div>
      <div><dt>Delivery</dt><dd>{totals.delivery === 0 && totals.subtotal > 0 ? <span className="free-label">On us</span> : formatCurrency(totals.delivery)}</dd></div>
      <div className="total-line"><dt>Total</dt><dd>{formatCurrency(totals.total)}</dd></div>
    </dl>
  );
}

function CouponBox({ items, couponCode, applyCoupon, removeCoupon }) {
  const [code, setCode] = useState(couponCode);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const result = applyCoupon(code);
    if (result.error) {
      setError(true);
      setMessage(result.error);
      return;
    }
    setError(false);
    setMessage(`${result.code} applied — ${result.label}.`);
  };
  return (
    <div className="coupon-area">
      {couponCode ? (
        <div className="coupon-applied"><span>✦ <strong>{couponCode}</strong> applied</span><button type="button" className="text-button" onClick={() => { removeCoupon(); setCode(''); setMessage(''); }}>Remove</button></div>
      ) : (
        <form className="coupon-form" onSubmit={submit}>
          <label htmlFor="coupon-code">Have a little code?</label>
          <div className="coupon-input-row"><input id="coupon-code" value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="Enter promo code" autoComplete="off" /><button className="button button-small button-dark" type="submit" disabled={!items.length}>Apply</button></div>
          {message && <p className={error ? 'form-error' : 'form-success'} role="status">{message}</p>}
        </form>
      )}
    </div>
  );
}

function OrderSummary({ items, totals, couponCode, actions, children }) {
  return (
    <Reveal as="aside" className="summary-card">
      <h2>Your order</h2>
      {items.length > 0 && <div className="summary-items">{items.map((item, index) => (
        <div className="summary-item" key={item.cartId || `${item.pizzaId}-${index}`}><span>{item.quantity} × {item.name}<small>{item.size} · {item.crust}</small></span><strong>{formatCurrency(getUnitPrice(item) * item.quantity)}</strong></div>
      ))}</div>}
      {children}
      <Totals totals={totals} couponCode={couponCode} />
      {actions}
      <p className="summary-footnote">Freshly baked just for you <span aria-hidden="true">♥</span></p>
    </Reveal>
  );
}

export function HomePage() {
  usePageMeta('PizzAmore | Vegetarian pizza, made with amore', 'Fresh, feel-good vegetarian pizza, baked to order and delivered with love.');
  const featured = [pizzas[0], pizzas[2], pizzas[1]];
  return (
    <>
      <section className="hero" style={{ '--hero-image': `url("${heroPizza}")` }}>
        <div className="hero-scrim"></div>
        <Reveal className="hero-content" distance={12}>
          <span className="hero-kicker"><span aria-hidden="true">✦</span> YOUR NEW FAVOURITE IS HERE</span>
          <h1>A little more<br /><em>amore</em> in every bite.</h1>
          <p>Hand-stretched, generously topped, 100% vegetarian. Your kind of pizza night starts here.</p>
          <div className="hero-buttons"><Link className="button button-primary button-large" to="/menu">Order now <span aria-hidden="true">→</span></Link><Link className="hero-secondary" to="/about">The PizzAmore story <span aria-hidden="true">↗</span></Link></div>
          <div className="hero-note"><span className="hero-note-icon">V</span><span><strong>Always vegetarian</strong><small>Never an afterthought.</small></span></div>
        </Reveal>
        <div className="hero-caption"><span>THE GARDEN MARGHERITA</span><span>MADE FRESH, JUST FOR YOU</span></div>
      </section>

      <Reveal as="section" className="benefits-strip" aria-label="Why order from PizzAmore">
        <div><span className="benefit-icon">✳</span><span><strong>Good ingredients</strong><small>Fresh, never fussy</small></span></div>
        <div><span className="benefit-icon">⌁</span><span><strong>Made to order</strong><small>Hot from our oven</small></span></div>
        <div><span className="benefit-icon">♡</span><span><strong>100% vegetarian</strong><small>More joy, no compromise</small></span></div>
        <div><span className="benefit-icon">↗</span><span><strong>At your doorstep</strong><small>Free delivery over ₹499</small></span></div>
      </Reveal>

      <Reveal as="nav" className="home-category-nav" aria-label="Shop pizza categories">
        <span className="eyebrow">WHAT ARE YOU IN THE MOOD FOR?</span>
        {['Classics', 'Premium', 'Veggie', 'Spicy', 'Cheese lovers'].map((category) => <Link key={category} to={`/menu?category=${encodeURIComponent(category)}`}>{category}<span aria-hidden="true">↗</span></Link>)}
      </Reveal>

      <section className="content-section featured-section">
        <SectionHeading eyebrow="THE CROWD PLEASERS" title="A very good place to start." copy="Fresh from our oven and straight to your favourites list." />
        <div className="pizza-grid">{featured.map((pizza, index) => <PizzaCard key={pizza.id} pizza={pizza} index={index} />)}</div>
        <Reveal className="center-action"><Link className="button button-outline" to="/menu">Explore the full menu <span aria-hidden="true">→</span></Link></Reveal>
      </section>

      <Reveal as="section" className="home-promo">
        <div><span className="eyebrow">A LITTLE SOMETHING EXTRA</span><h2>First slice is on us.<br /><em>Well, almost.</em></h2><p>Take 10% off your first order with <strong>FIRSTORDER</strong>. Just add a little amore to your cart.</p><Link to="/offers" className="button button-light">See this week’s offers <span aria-hidden="true">→</span></Link></div>
        <div className="promo-stamp"><span>10%</span><small>OFF YOUR<br />FIRST ORDER</small></div>
      </Reveal>

      <Reveal as="section" className="content-section home-story">
        <div className="story-art"><img src={pizzaFallback} alt="Freshly baked vegetarian pizza topped with vegetables and cheese" loading="lazy" /><span className="story-stamp">100%<br />VEGGIE</span></div>
        <div className="story-copy"><span className="eyebrow">A BETTER KIND OF PIZZA NIGHT</span><h2>Big flavour.<br /><em>Good feeling.</em></h2><p>We believe the best pizza starts with the good stuff. Real vegetables, lovely cheese and dough that gets the time it deserves. Every single one is vegetarian, so everyone gets a seat at the table.</p><Link className="text-link" to="/about">A little more about us <span aria-hidden="true">→</span></Link></div>
      </Reveal>
    </>
  );
}

export function MenuPage() {
  usePageMeta('PizzAmore Menu | Vegetarian pizza for everyone', 'Explore the full PizzAmore menu of freshly made vegetarian pizzas.');
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'All pizzas');
  const [sort, setSort] = useState('featured');
  const query = (searchParams.get('q') || '').trim();
  useEffect(() => {
    setCategory(searchParams.get('category') || 'All pizzas');
  }, [searchParams]);
  const categories = ['All pizzas', ...new Set(pizzas.map((pizza) => pizza.category))];
  const shown = useMemo(() => {
    const filtered = pizzas.filter((pizza) => {
      const matchesCategory = category === 'All pizzas' || pizza.category === category;
      const searchable = `${pizza.name} ${pizza.description} ${pizza.category} ${pizza.ingredients.join(' ')}`.toLowerCase();
      return matchesCategory && searchable.includes(query.toLowerCase());
    });
    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [category, query, sort]);
  return (
    <div className="content-section menu-page">
      <PageIntro eyebrow="FRESH FROM OUR OVEN" title="The menu" copy="Hand-stretched, topped with the good stuff, and always 100% vegetarian." />
      <div className="menu-toolbar">
        <div className="category-tabs" role="group" aria-label="Filter by category">
          {categories.map((item) => <button type="button" key={item} className={category === item ? 'category-tab active' : 'category-tab'} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <label className="sort-control">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Our favourites</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
      </div>
      {query && <div className="search-result-note">Showing results for <strong>“{query}”</strong><button type="button" className="text-button" onClick={() => setSearchParams({})}>Clear search</button></div>}
      {shown.length ? <div className="pizza-grid">{shown.map((pizza, index) => <PizzaCard key={pizza.id} pizza={pizza} index={index} />)}</div> : <div className="empty-state"><span className="empty-icon">⌕</span><h2>No pizzas found just yet.</h2><p>Try searching for cheese, paneer, or veggie — or clear your filters to see everything.</p><button type="button" className="button button-outline" onClick={() => { setCategory('All pizzas'); setSearchParams({}); }}>Show all pizzas</button></div>}
    </div>
  );
}

export function PizzaPage() {
  usePageMeta('Customize your pizza | PizzAmore', 'Make it your own with your favourite size, crust and veggie toppings.');
  const { slug } = useParams();
  const pizza = pizzas.find((item) => item.id === slug);
  const [searchParams] = useSearchParams();
  const editingId = searchParams.get('edit');
  const { items, addItem, updateItem } = useCart();
  const existing = items.find((item) => item.cartId === editingId);
  const [size, setSize] = useState(existing?.size || 'Regular');
  const [crust, setCrust] = useState(existing?.crust || 'Classic');
  const [selectedToppings, setSelectedToppings] = useState(existing?.toppings || []);
  const [quantity, setQuantity] = useState(existing?.quantity || 1);
  const [instructions, setInstructions] = useState(existing?.instructions || '');
  const navigate = useNavigate();
  if (!pizza) return <Navigate to="/menu" replace />;
  const draft = { basePrice: pizza.price, size, crust, toppings: selectedToppings };
  const price = getUnitPrice(draft);
  const toggleTopping = (name) => setSelectedToppings((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const submit = () => {
    const selection = { pizzaId: pizza.id, name: pizza.name, basePrice: pizza.price, image: pizza.image, size, crust, toppings: selectedToppings, quantity, instructions };
    if (existing) {
      updateItem(existing.cartId, selection);
      navigate('/cart');
    } else {
      addItem(selection);
    }
  };
  return (
    <div className="content-section product-page">
      <Link to="/menu" className="back-link">← Back to the menu</Link>
      <div className="product-layout">
        <Reveal className="product-photo"><img src={pizza.image} alt={`${pizza.name} pizza`} onError={(event) => { event.currentTarget.src = pizzaFallback; }} /><span className="veg-mark product-veg" aria-label="100% vegetarian">V</span></Reveal>
        <Reveal className="product-config" delay={0.08}>
          <span className="eyebrow">{pizza.category.toUpperCase()} · 100% VEGETARIAN</span>
          <h1>{pizza.name}</h1>
          <div className="product-rating"><span>★ {pizza.rating}</span><span>({pizza.reviews} lovely reviews)</span></div>
          <p className="product-description">{pizza.description}</p>
          <div className="ingredient-line"><strong>The good stuff</strong><p>{pizza.ingredients.join(' · ')}</p></div>
          <fieldset className="option-group"><legend>1. Pick your size</legend><div className="choice-row">{sizes.map((option) => <button type="button" key={option.name} className={`choice-button${size === option.name ? ' selected' : ''}`} aria-pressed={size === option.name} onClick={() => setSize(option.name)}><strong>{option.name}</strong><small>{option.adjustment > 0 ? `+${formatCurrency(option.adjustment)}` : option.adjustment < 0 ? `−${formatCurrency(Math.abs(option.adjustment))}` : 'Classic'}</small></button>)}</div></fieldset>
          <fieldset className="option-group"><legend>2. Choose your crust</legend><div className="choice-row crust-choices">{crusts.map((option) => <button type="button" key={option.name} className={`choice-button${crust === option.name ? ' selected' : ''}`} aria-pressed={crust === option.name} onClick={() => setCrust(option.name)}><strong>{option.name}</strong>{option.adjustment > 0 && <small>+{formatCurrency(option.adjustment)}</small>}</button>)}</div></fieldset>
          <fieldset className="option-group"><legend>3. Make it extra (optional)</legend><div className="topping-list">{toppings.map((topping) => <label className="topping-option" key={topping.name}><input type="checkbox" checked={selectedToppings.includes(topping.name)} onChange={() => toggleTopping(topping.name)} /><span className="custom-check" aria-hidden="true"></span><span>{topping.name}</span><small>+{formatCurrency(topping.price)}</small></label>)}</div></fieldset>
          <label className="field-label instructions-label" htmlFor="pizza-instructions">A note for our pizzaiolo <span>Optional</span></label><textarea id="pizza-instructions" rows="2" maxLength="160" value={instructions} onChange={(event) => setInstructions(event.target.value)} placeholder="Anything we should know? e.g. extra crispy, please." />
          <div className="add-to-bucket-row"><div className="quantity-control"><button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span aria-live="polite">{quantity}</span><button type="button" aria-label="Increase quantity" disabled={quantity >= 20} onClick={() => setQuantity(Math.min(20, quantity + 1))}>＋</button></div><button type="button" className="button button-primary button-large add-product-button" onClick={submit}>{existing ? 'Save changes' : 'Add to bucket'} <strong>{formatCurrency(price * quantity)}</strong></button></div>
          <p className="product-tax-note">Made fresh to order · Taxes calculated in your bucket</p>
        </Reveal>
      </div>
    </div>
  );
}

export function CartPage() {
  usePageMeta('Your bucket | PizzAmore', 'Review your pizza order and make it your own.');
  const { items, updateQuantity, removeItem, clearCart, totals, couponCode, applyCoupon, removeCoupon } = useCart();
  if (!items.length) return <div className="content-section"><div className="empty-state cart-empty"><span className="empty-icon">♧</span><span className="eyebrow">NOTHING IN HERE (YET)</span><h1>Your bucket is taking a little breather.</h1><p>It’s a great time to browse the menu and find a new favourite.</p><Link className="button button-primary" to="/menu">Find your pizza <span aria-hidden="true">→</span></Link></div></div>;
  return (
    <div className="content-section cart-page">
      <PageIntro eyebrow="ALMOST THE BEST PART" title="Your bucket" copy={`${items.reduce((sum, item) => sum + item.quantity, 0)} delicious ${items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'pizza' : 'pizzas'}, made your way.`} />
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item, index) => <Reveal as="article" className="cart-item" key={item.cartId} delay={(index % 4) * 0.05}>
            <img src={item.image} alt={item.name} onError={(event) => { event.currentTarget.src = pizzaFallback; }} />
            <div className="cart-item-info"><h2>{item.name}</h2><p>{item.size} · {item.crust}{item.toppings.length ? ` · ${item.toppings.join(', ')}` : ''}</p>{item.instructions && <small className="item-note">Note: {item.instructions}</small>}<div className="cart-item-actions"><div className="quantity-control compact"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>−</button><span>{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} disabled={item.quantity >= 20} onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>＋</button></div><Link className="text-button" to={`/pizza/${item.pizzaId}?edit=${item.cartId}`}>Edit</Link><button type="button" className="text-button remove-button" onClick={() => removeItem(item.cartId)}>Remove</button></div></div>
            <strong className="cart-item-price">{formatCurrency(getUnitPrice(item) * item.quantity)}</strong>
          </Reveal>)}
          <div className="cart-bottom-links"><Link className="text-link" to="/menu">← Keep browsing</Link><button type="button" className="text-button" onClick={clearCart}>Clear bucket</button></div>
          <div className="delivery-nudge">{totals.delivery === 0 ? <><span>✦</span> Your delivery is on us. Lovely choice!</> : <>You’re {formatCurrency(499 - totals.subtotal)} away from free delivery.</>}</div>
        </div>
        <OrderSummary items={[]} totals={totals} couponCode={couponCode}><CouponBox items={items} couponCode={couponCode} applyCoupon={applyCoupon} removeCoupon={removeCoupon} /><Link className="button button-primary button-block" to="/checkout">Continue to checkout <span aria-hidden="true">→</span></Link><Link className="secure-note" to="/terms">Secure checkout · Cash on delivery</Link></OrderSummary>
      </div>
    </div>
  );
}

const emptyCustomer = { name: '', email: '', phone: '', house: '', street: '', city: '', state: '', pincode: '', landmark: '', instructions: '' };

export function CheckoutPage() {
  usePageMeta('Checkout | PizzAmore', 'Add your delivery details and place your PizzAmore order.');
  const { items, totals, couponCode, applyCoupon, removeCoupon, placeOrder } = useCart();
  const [customer, setCustomer] = useState(emptyCustomer);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');
  const navigate = useNavigate();
  if (!items.length) return <div className="content-section"><div className="empty-state"><span className="empty-icon">♧</span><h1>Your bucket is empty.</h1><p>Add a pizza before checking out. Your next favourite is just around the corner.</p><Link to="/menu" className="button button-primary">Browse the menu <span aria-hidden="true">→</span></Link></div></div>;
  const change = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };
  const validate = () => {
    const next = {};
    ['name', 'email', 'phone', 'house', 'street', 'city', 'state', 'pincode'].forEach((key) => {
      if (!customer[key].trim()) next[key] = 'This field is required.';
    });
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) next.email = 'Enter a valid email address.';
    if (customer.phone && !/^[6-9]\d{9}$/.test(customer.phone.replace(/\D/g, ''))) next.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (customer.pincode && !/^\d{6}$/.test(customer.pincode.trim())) next.pincode = 'Enter a valid 6-digit pincode.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      setOrderError('A couple of details need your attention.');
      return;
    }
    setSubmitting(true);
    setOrderError('');
    try {
      const order = await placeOrder(customer, paymentMethod);
      navigate(`/orders/${order.id}`, { replace: true });
    } catch (error) {
      setOrderError(error.message || 'We couldn’t place that order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  const textField = (key, label, options = {}) => <div className={`form-field ${options.wide ? 'field-wide' : ''}`} key={key}><label htmlFor={key}>{label}{options.optional && <span>Optional</span>}</label><input id={key} name={key} type={options.type || 'text'} value={customer[key]} onChange={change} autoComplete={options.autoComplete} maxLength={options.maxLength} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} />{errors[key] && <small className="field-error" id={`${key}-error`}>{errors[key]}</small>}</div>;
  return (
    <div className="content-section checkout-page">
      <PageIntro eyebrow="ONE LAST THING" title="Delivery details" copy="We’ll get your pizza there hot, happy, and right on time." />
      <form className="checkout-layout" onSubmit={submit} noValidate>
        <div className="checkout-fields">
          <Reveal as="section" className="form-section"><div className="form-section-heading"><span className="step-number">01</span><div><h2>Who’s hungry?</h2><p>We’ll use these details for your order updates.</p></div></div><div className="form-grid">{textField('name', 'Full name', { autoComplete: 'name' })}{textField('email', 'Email address', { type: 'email', autoComplete: 'email' })}{textField('phone', 'Mobile number', { type: 'tel', autoComplete: 'tel', maxLength: 10 })}</div></Reveal>
          <Reveal as="section" className="form-section" delay={0.06}><div className="form-section-heading"><span className="step-number">02</span><div><h2>Where should we meet you?</h2><p>We deliver with care. Tell us where to find you.</p></div></div><div className="form-grid">{textField('house', 'House / flat no.', { autoComplete: 'address-line1' })}{textField('street', 'Street / area', { autoComplete: 'address-line2' })}{textField('city', 'City', { autoComplete: 'address-level2' })}{textField('state', 'State', { autoComplete: 'address-level1' })}{textField('pincode', 'Pincode', { autoComplete: 'postal-code', maxLength: 6 })}{textField('landmark', 'Landmark', { optional: true })}<div className="form-field field-wide"><label htmlFor="instructions">Delivery instructions <span>Optional</span></label><textarea id="instructions" name="instructions" rows="2" value={customer.instructions} onChange={change} placeholder="Gate code, leave at the door, and so on." /></div></div></Reveal>
          <Reveal as="section" className="form-section" delay={0.12}><div className="form-section-heading"><span className="step-number">03</span><div><h2>How would you like to pay?</h2><p>Simple, safe, and no surprises.</p></div></div><label className="payment-choice"><input type="radio" name="payment" value="Cash on delivery" checked={paymentMethod === 'Cash on delivery'} onChange={(event) => setPaymentMethod(event.target.value)} /><span className="payment-icon">₹</span><span><strong>Cash on delivery</strong><small>Pay when your pizza arrives</small></span><span className="payment-check" aria-hidden="true">✓</span></label></Reveal>
        </div>
        <OrderSummary items={items} totals={totals} couponCode={couponCode}><CouponBox items={items} couponCode={couponCode} applyCoupon={applyCoupon} removeCoupon={removeCoupon} />{orderError && <p className="order-error" role="alert">{orderError}</p>}<button className="button button-primary button-block" type="submit" disabled={submitting}>{submitting ? <><span className="button-spinner"></span> Placing your order…</> : <>Place order · {formatCurrency(totals.total)} <span aria-hidden="true">→</span></>}</button><p className="checkout-terms">By placing your order, you agree to our <Link to="/terms">terms</Link> and <Link to="/privacy">privacy policy</Link>.</p></OrderSummary>
      </form>
    </div>
  );
}

const statusLabels = ['Order confirmed', 'In the oven', 'On the way', 'Delivered'];
const statusDescriptions = ['We’ve got your order and are getting things ready.', 'Our pizzaiolo is making your pizza fresh.', 'Your order is on its way to you.', 'Delivered with a little amore.'];

function OrderTimeline({ order }) {
  const [step, setStep] = useState(() => getOrderStatus(order));
  useEffect(() => {
    const interval = window.setInterval(() => setStep(getOrderStatus(order)), 30000);
    return () => window.clearInterval(interval);
  }, [order]);
  return <ol className="order-timeline">{statusLabels.map((label, index) => <li key={label} className={index < step ? 'complete' : index === step ? 'current' : ''}><span className="timeline-marker">{index < step ? '✓' : String(index + 1).padStart(2, '0')}</span><div><strong>{label}</strong><p>{index <= step ? statusDescriptions[index] : 'Coming up next.'}</p>{index === 0 && <small>{dateTime(order.createdAt)}</small>}</div></li>)}</ol>;
}

function OrderCard({ order, showActions = true }) {
  const { reorder } = useCart();
  const step = getOrderStatus(order);
  return <Reveal as="article" className="order-card"><div className="order-card-top"><div><span className="eyebrow">ORDER {order.id}</span><p>{shortDate(order.createdAt)} · {order.items.reduce((sum, item) => sum + item.quantity, 0)} items</p></div><span className={`status-pill status-${step}`}>{statusLabels[step]}</span></div><div className="order-card-pizzas">{order.items.map((item) => <span key={`${item.pizzaId}-${item.size}-${item.crust}`}>{item.quantity} × {item.name}</span>)}</div><div className="order-card-bottom"><strong>{formatCurrency(order.summary.total)}</strong>{showActions && <div><button type="button" className="button button-small button-outline" onClick={() => reorder(order)}>Reorder</button><Link className="text-link" to={`/orders/${order.id}`}>View order →</Link></div>}</div></Reveal>;
}

export function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders } = useCart();
  const order = orders.find((item) => item.id === orderId);
  usePageMeta(order ? `Order ${order.id} | PizzAmore` : 'Order not found | PizzAmore', 'Your PizzAmore order confirmation and live delivery progress.');
  if (!order) return <div className="content-section"><div className="empty-state"><span className="empty-icon">⌕</span><h1>We couldn’t find that order.</h1><p>Orders are saved in the browser where you placed them.</p><Link to="/orders" className="button button-primary">View order history</Link></div></div>;
  return (
    <Reveal as="div" className="content-section confirmation-page">
      <div className="confirmation-heading"><span className="confirmation-check">✓</span><span className="eyebrow">THAT’S A VERY GOOD CHOICE</span><h1>Order placed, {order.customer.name.split(' ')[0]}!</h1><p>Your pizza is in good hands. We’ll see you soon.</p></div>
      <div className="confirmation-grid">
        <Reveal as="section" className="confirmation-card tracking-card"><div className="order-card-top"><div><span className="eyebrow">ORDER {order.id}</span><p>Placed {dateTime(order.createdAt)}</p></div><span className={`status-pill status-${getOrderStatus(order)}`}>{statusLabels[getOrderStatus(order)]}</span></div><div className="estimated-arrival"><span>ESTIMATED ARRIVAL</span><strong>{new Date(order.estimatedDelivery).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}</strong><small>About 45 minutes after ordering</small></div><OrderTimeline order={order} /></Reveal>
        <Reveal as="section" className="confirmation-card" delay={0.08}><h2>Order details</h2><div className="summary-items">{order.items.map((item, index) => <div className="summary-item" key={`${item.pizzaId}-${index}`}><span>{item.quantity} × {item.name}<small>{item.size} · {item.crust}{item.toppings.length ? ` · ${item.toppings.join(', ')}` : ''}</small></span><strong>{formatCurrency(getUnitPrice(item) * item.quantity)}</strong></div>)}</div><Totals totals={order.summary} couponCode={order.couponCode} /><div className="address-summary"><strong>Delivering to</strong><p>{order.customer.name}<br />{order.customer.house}, {order.customer.street}<br />{order.customer.city}, {order.customer.state} {order.customer.pincode}{order.customer.landmark ? <><br />Near {order.customer.landmark}</> : null}</p>{order.customer.instructions && <small>Note: {order.customer.instructions}</small>}</div><div className="payment-summary"><strong>Payment</strong><span>{order.paymentMethod}</span></div></Reveal>
      </div>
      <div className="center-action"><Link to="/orders" className="button button-outline">Go to order history</Link><Link to="/menu" className="text-link">Order something else →</Link></div>
    </Reveal>
  );
}

export function OrderHistoryPage() {
  usePageMeta('Your orders | PizzAmore', 'See your PizzAmore order history and order your favourites again.');
  const { orders } = useCart();
  return <div className="content-section order-history"><PageIntro eyebrow="A LITTLE MORE AMORE" title="Your orders" copy="Your past pizzas are never far away." />{orders.length ? <div className="order-list">{orders.map((order) => <OrderCard key={order.id} order={order} />)}</div> : <div className="empty-state"><span className="empty-icon">♡</span><h2>Your next favourite is out there.</h2><p>Place your first order and it’ll show up here, ready for a repeat.</p><Link className="button button-primary" to="/menu">Browse the menu <span aria-hidden="true">→</span></Link></div>}</div>;
}

export function OrderTrackingPage() {
  usePageMeta('Track your order | PizzAmore', 'Follow your freshly made PizzAmore order from oven to doorstep.');
  const { orders } = useCart();
  const [input, setInput] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [searched, setSearched] = useState(false);
  const order = orders.find((item) => item.id.toLowerCase() === selectedId.toLowerCase());
  const submit = (event) => { event.preventDefault(); setSelectedId(input.trim()); setSearched(true); };
  return <div className="content-section tracking-page"><PageIntro eyebrow="HOT, HAPPY & ON ITS WAY" title="Track your pizza" copy="Enter an order ID or pick one from your recent orders." /><form className="tracking-search" onSubmit={submit}><label htmlFor="track-id">Order ID</label><div><input id="track-id" value={input} onChange={(event) => setInput(event.target.value)} placeholder="e.g. PA-261005-A1B2C3" required /><button className="button button-primary" type="submit">Track order <span aria-hidden="true">→</span></button></div></form>{orders.length > 0 && <div className="recent-orders"><label htmlFor="recent-order">Or choose a recent order</label><select id="recent-order" value={selectedId} onChange={(event) => { setSelectedId(event.target.value); setInput(event.target.value); setSearched(true); }}><option value="">Choose an order</option>{orders.map((item) => <option key={item.id} value={item.id}>{item.id} · {shortDate(item.createdAt)}</option>)}</select></div>}{searched && !order && <div className="inline-alert" role="alert">We couldn’t find that order on this device. Check the ID or choose a recent order.</div>}{order && <section className="track-result"><div className="track-result-heading"><div><span className="eyebrow">ORDER {order.id}</span><p>Placed {dateTime(order.createdAt)} · {formatCurrency(order.summary.total)}</p></div><Link className="text-link" to={`/orders/${order.id}`}>Full order details →</Link></div><OrderTimeline order={order} /><div className="track-address"><strong>Delivery address</strong><p>{order.customer.house}, {order.customer.street}, {order.customer.city}, {order.customer.state} {order.customer.pincode}</p></div></section>}</div>;
}

export function OffersPage() {
  usePageMeta('Offers & good deals | PizzAmore', 'A little extra amore: explore PizzAmore offers and save on your vegetarian pizza order.');
  const [copied, setCopied] = useState('');
  const offers = [
    { code: 'FIRSTORDER', title: 'A warm welcome', copy: '10% off your first order, up to ₹150.', detail: 'Min. order ₹299 · First order only', tint: 'peach' },
    { code: 'PIZZALOVE', title: 'A little pizza love', copy: '₹75 off when your bucket is ₹399 or more.', detail: 'Min. order ₹399', tint: 'green' },
    { code: 'VEGGIE20', title: 'Veggie feast', copy: '20% off your veggie feast, up to ₹200.', detail: 'Min. order ₹599', tint: 'yellow' },
    { code: 'WELCOME10', title: 'Good things ahead', copy: 'Take 10% off orders over ₹249, up to ₹100.', detail: 'Min. order ₹249', tint: 'pink' },
  ];
  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
    } catch {
      setCopied(`manual-${code}`);
    }
  };
  return <div className="content-section offers-page"><PageIntro eyebrow="A LITTLE EXTRA AMORE" title="Good things come in pizza boxes." copy="Something lovely for your next order. Add a code in your bucket to use it." /><div className="offers-grid">{offers.map((offer, index) => <Reveal as="article" className={`offer-card offer-${offer.tint}`} key={offer.code} delay={(index % 3) * 0.06}><span className="offer-sparkle" aria-hidden="true">✳</span><span className="eyebrow">A PIZZAMORE TREAT</span><h2>{offer.title}</h2><p>{offer.copy}</p><small>{offer.detail}</small><div className="offer-code-row"><code>{offer.code}</code><button type="button" className="text-button" onClick={() => copyCode(offer.code)}>{copied === offer.code ? 'Copied ✓' : copied === `manual-${offer.code}` ? 'Select code' : 'Copy code'}</button></div></Reveal>)}</div><Reveal className="center-action"><Link className="button button-primary" to="/menu">Find your pizza <span aria-hidden="true">→</span></Link></Reveal></div>;
}

export function AboutPage() {
  usePageMeta('Our story | About PizzAmore', 'Meet PizzAmore: a little more care, a lot more flavour, and vegetarian pizza for everyone.');
  return <div className="about-page"><PageIntro eyebrow="A LITTLE ABOUT US" title={<>Pizza made with<br /><em>a little more heart.</em></>} copy="We’re here for the shared slices, the extra napkins and the “just one more bite” moments." /><Reveal as="section" className="about-feature content-section"><div className="about-image"><img src={heroPizza} alt="A freshly baked pizza with colourful vegetarian toppings" /><span>GOOD FOOD<br />BRINGS US<br />TOGETHER.</span></div><div><span className="eyebrow">OUR KIND OF PIZZA</span><h2>Vegetarian by choice.<br /><em>Delicious by nature.</em></h2><p>PizzAmore started with a simple thought: a great pizza night should feel good for everyone around the table. So we put vegetables right at the heart of it — never as an afterthought.</p><p>We make each pizza to order, layer on ingredients we love, and let our dough take the time it needs. No shortcuts. Just thoughtful food and the kind of flavour that makes you reach for another slice.</p><Link className="button button-primary" to="/menu">Meet the menu <span aria-hidden="true">→</span></Link></div></Reveal><Reveal as="section" className="about-values"><SectionHeading eyebrow="THE PIZZAMORE PROMISE" title="A few things we’ll never compromise on." /><div className="value-grid"><article><span>01</span><h3>Always veggie</h3><p>Every pizza is thoughtfully made with vegetarian ingredients. More people at the table, more to love.</p></article><article><span>02</span><h3>Fresh, every time</h3><p>We make each order fresh, using produce and ingredients chosen for flavour first.</p></article><article><span>03</span><h3>Made with care</h3><p>From a properly rested dough to the final drizzle, the little things make a big difference.</p></article></div></Reveal><Reveal as="section" className="about-cta"><h2>Let’s make tonight a pizza night.</h2><Link className="button button-light" to="/menu">Order a little amore <span aria-hidden="true">→</span></Link></Reveal></div>;
}

export function ContactPage() {
  usePageMeta('Get in touch | PizzAmore', 'Have a question or a little feedback? PizzAmore would love to hear from you.');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [failure, setFailure] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'Tell us a little more (at least 10 characters).';
    setErrors(next);
    setSuccess('');
    setFailure('');
    if (Object.keys(next).length) return;
    try {
      const saved = JSON.parse(localStorage.getItem('pizzamore-messages-v1') || '[]');
      localStorage.setItem('pizzamore-messages-v1', JSON.stringify([{ ...form, createdAt: new Date().toISOString() }, ...saved]));
      setSuccess('Thanks for taking the time. Your message is saved in this browser.');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setFailure('We couldn’t save your message on this device. Please try again.');
    }
  };
  const change = (event) => { setForm({ ...form, [event.target.name]: event.target.value }); setErrors({ ...errors, [event.target.name]: '' }); };
  return <div className="content-section contact-page"><PageIntro eyebrow="WE’RE ALL EARS" title="Say hello." copy="A question, a kind word, a pizza suggestion? We’re listening." /><div className="contact-layout"><form className="contact-form" onSubmit={submit} noValidate><div className="form-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" value={form.name} onChange={change} aria-invalid={Boolean(errors.name)} />{errors.name && <small className="field-error">{errors.name}</small>}</div><div className="form-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" type="email" name="email" value={form.email} onChange={change} aria-invalid={Boolean(errors.email)} />{errors.email && <small className="field-error">{errors.email}</small>}</div><div className="form-field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" rows="5" value={form.message} onChange={change} aria-invalid={Boolean(errors.message)} />{errors.message && <small className="field-error">{errors.message}</small>}</div>{success && <p className="form-success" role="status">{success}</p>}{failure && <p className="form-error" role="alert">{failure}</p>}<button type="submit" className="button button-primary">Send a little note <span aria-hidden="true">→</span></button><p className="contact-privacy-note">This demo saves your message only in this browser; it doesn’t send email.</p></form><aside className="contact-aside"><span className="contact-heart">♡</span><h2>Good conversations<br />start with hello.</h2><p>Looking for an order update? Your order history and tracker are just a click away.</p><Link to="/track" className="text-link">Track an order →</Link><div className="contact-divider"></div><span className="eyebrow">A LITTLE HELP</span><p>Delivery, ingredients or just can’t decide what to order? Drop us a note and we’ll do our best to help.</p></aside></div></div>;
}

export function LegalPage({ type }) {
  const privacy = type === 'privacy';
  usePageMeta(`${privacy ? 'Privacy policy' : 'Terms & conditions'} | PizzAmore`, `${privacy ? 'How PizzAmore handles your information.' : 'The terms for ordering with PizzAmore.'}`);
  return <div className="content-section legal-page"><PageIntro eyebrow="THE IMPORTANT BITS" title={privacy ? 'Privacy policy' : 'Terms & conditions'} copy={`Last updated ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}`} />{privacy ? <div className="legal-copy"><h2>A note about this demo</h2><p>PizzAmore is a client-side demonstration ordering experience. There is no connected restaurant service, payment processor, or remote account system.</p><h2>Information stored on this device</h2><p>To make the demo work, your bucket, orders and contact messages are saved in your browser’s local storage. They stay on this device and are not sent to a server. Clearing your browser storage removes this information.</p><h2>Payments</h2><p>Checkout supports cash on delivery as a demonstration. No payment details are collected or processed.</p><h2>Contact</h2><p>Use the contact form to test its validation and local save experience. It does not send a message to PizzAmore or any third party.</p></div> : <div className="legal-copy"><h2>Using this ordering demo</h2><p>PizzAmore is a local-first demonstration. Orders placed here are saved in your browser and are not transmitted to a restaurant or delivery service.</p><h2>Prices and offers</h2><p>Menu prices, taxes, delivery charges and promotional codes are examples for this demo. Your order summary is calculated in the browser and is not a commercial quote.</p><h2>Payment and delivery</h2><p>Cash on delivery is shown for demonstration purposes only. No payment is collected and no delivery will be arranged.</p><h2>Availability</h2><p>Your bucket and order history are stored in this browser. They may not be available on another device or browser profile.</p></div>}</div>;
}

export function NotFoundPage() {
  usePageMeta('Page not found | PizzAmore', 'That page isn’t on the menu. Come back to PizzAmore.');
  return <div className="content-section"><div className="empty-state"><span className="eyebrow">404 · WRONG TURN, RIGHT SMELL</span><h1>There’s no pizza this way.</h1><p>That page isn’t on our menu, but there’s plenty more to love.</p><Link to="/" className="button button-primary">Back to PizzAmore</Link></div></div>;
}
