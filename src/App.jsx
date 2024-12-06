// /* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import PromoCard from './components/PromoCard';   
import Footer from './components/Footer';   
// eslint-disable-next-line no-unused-vars
import Header from './components/Header';   
import { CartProvider } from './context/CartContext';
import './App.css';
import './styles/global.css';
import HomePage from './pages/HomePage';  

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-center text-xl font-bold">PizzAmore</h1>
              <nav>
                <ul className="flex space-x-6">
                  <li><Link to="/" className="hover:text-accent">Home</Link></li>
                  <li><Link to="/menu" className="hover:text-accent">Menu</Link></li>
                  <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
                  <li><Link to="/promo" className="hover:text-accent">Promo</Link></li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            <div className="App">
              <Routes>
                <Route path="/" element={<HomePage />} /> 
                <Route path="/about" element={<AboutPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/promo" element={<PromoCard />} />
              </Routes>
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
export default App;
