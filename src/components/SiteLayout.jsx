import { useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function SiteLayout() {
  const { itemCount, toast } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef(null);
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    if (window.matchMedia('(max-width: 780px)').matches && !searchOpen) {
      setSearchOpen(true);
      window.requestAnimationFrame(() => searchInput.current?.focus());
      return;
    }
    navigate(`/menu${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
    setMenuOpen(false);
    setSearchOpen(false);
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement"><span>✦</span> A little more amore <span className="announcement-dot">·</span> Free delivery over ₹499</div>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="PizzAmore home" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">P</span>
            <span className="brand-name"><span className="brand-word">pizz<span>amore</span></span><small>GOOD FOOD. GOOD MOOD.</small></span>
          </Link>
          <button type="button" className="mobile-menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/menu" onClick={closeMenu}>Menu</NavLink>
            <NavLink to="/offers" onClick={closeMenu}>Offers</NavLink>
            <NavLink to="/about" onClick={closeMenu}>Our story</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </nav>
          <div className="header-actions">
            <form className={`header-search${searchOpen ? ' search-open' : ''}`} role="search" onSubmit={submitSearch}>
              <input ref={searchInput} aria-label="Search pizzas" placeholder="Find your favourite…" value={search} onChange={(event) => setSearch(event.target.value)} />
              <button type="submit" aria-label="Search">⌕</button>
            </form>
            <Link className="orders-link" to="/orders" aria-label="Your orders">Orders</Link>
            <Link className="bucket-link" to="/cart" aria-label={`Bucket, ${itemCount} items`}>
              <svg className="bucket-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8h17l-1.4 12h-14L3.5 8Z" /><path d="M8 9V6a4 4 0 0 1 8 0v3" /><path d="M9 13v3m6-3v3" /></svg><span className="bucket-label">Bucket</span>
              {itemCount > 0 && <span className="bucket-count" aria-live="polite">{itemCount}</span>}
            </Link>
          </div>
        </div>
      </header>
      <main id="main-content" className="page-main"><Outlet /></main>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand brand-light"><span className="brand-mark">P</span><span className="brand-name"><span className="brand-word">pizz<span>amore</span></span><small>GOOD FOOD. GOOD MOOD.</small></span></Link>
            <p>Made with care, topped with the good stuff, and always 100% vegetarian.</p>
          </div>
          <div><h2>Explore</h2><Link to="/menu">Our menu</Link><Link to="/offers">Offers</Link><Link to="/about">Our story</Link></div>
          <div><h2>Here to help</h2><Link to="/track">Track an order</Link><Link to="/orders">Order history</Link><Link to="/contact">Contact us</Link></div>
          <div><h2>The fine print</h2><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms &amp; conditions</Link></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} PizzAmore. Made with amore.</span><span>Freshly baked. Always vegetarian. <span aria-hidden="true">♥</span></span></div>
      </footer>
      {toast && <div className="toast-message" role="status" aria-live="polite"><span aria-hidden="true">✓</span>{toast}</div>}
    </div>
  );
}
