/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/order';
import fallbackPizza from '../assets/pizza1.jpg';

export default function PizzaCard({ pizza }) {
  const { addItem } = useCart();
  return (
    <article className="pizza-card">
      <Link className="pizza-card-image" to={`/pizza/${pizza.id}`} aria-label={`View ${pizza.name}`}>
        <img src={pizza.image} alt={`${pizza.name} vegetarian pizza`} loading="lazy" onError={(event) => { event.currentTarget.src = fallbackPizza; }} />
        <span className="veg-mark" title="Vegetarian" aria-label="100% vegetarian">V</span>
        {pizza.badge && <span className="pizza-badge">{pizza.badge}</span>}
        <span className="image-arrow" aria-hidden="true">↗</span>
      </Link>
      <div className="pizza-card-body">
        <div className="pizza-card-heading"><h3><Link to={`/pizza/${pizza.id}`}>{pizza.name}</Link></h3><span className="rating">★ {pizza.rating}</span></div>
        <p>{pizza.description}</p>
        <div className="pizza-card-bottom">
          <div><strong>{formatCurrency(pizza.price)}</strong><small>Regular</small></div>
          <button type="button" className="button button-small button-outline" onClick={() => addItem({
            pizzaId: pizza.id, name: pizza.name, basePrice: pizza.price, image: pizza.image,
            size: 'Regular', crust: 'Classic', toppings: [], instructions: '',
          })}>Quick add <span aria-hidden="true">＋</span></button>
        </div>
      </div>
    </article>
  );
}
