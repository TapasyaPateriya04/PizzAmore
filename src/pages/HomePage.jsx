import Button from '../components/Button';  
import '@styles/homepage.css'
import pizzaImage from "../assets/pizza1.jpg";
 

function HomePage() {
  const handleClick = () => {
    console.log('Button clicked!'); 
  };

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero bg-gray-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to PizzAmore</h1>
          <p className="text-xl mb-8">Your favorite place for delicious vegetarian pizzas!</p>
          <Button label="Order Now" onClick={handleClick} />
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us py-16 bg-gray-100 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-4">About PizzAmore</h2>
          <p className="text-lg mb-6">
            We specialize in fresh, handmade vegetarian pizzas, made with love and the best ingredients.
          </p>
          <img src={pizzaImage} alt="Delicious pizza" className="mx-auto rounded-lg shadow-lg w-64" />
        </div>
      </section>

      {/* Promotions Section */}
      <section className="promotions py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Special Offers</h2>
          <p className="text-lg mb-6">Check out our amazing deals and discounts on your favorite pizzas!</p>
          <Button label="View Offers" onClick={handleClick} />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
