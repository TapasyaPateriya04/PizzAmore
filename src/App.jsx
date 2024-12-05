import './App.css';
import './styles/global.css';
import SpecialPage from './pages/SpecialPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import PromoSection from './components/PromoSection';  // Import PromoSection
import MenuPage from './components/MenuPage';  // Ensure MenuPage is imported

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="App">
          {/* Hero section or Special Page */}
          <SpecialPage />
          
          {/* About section */}
          <AboutPage /> 

          {/* Promotional section (can highlight offers) */}
          <PromoSection />  

          {/* Menu Page displaying vegetarian pizzas */}
          <MenuPage />
        </div>
      </main>

      {/* Footer section */}
      <Footer />
    </div>
  );
}

export default App;
