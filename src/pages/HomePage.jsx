import Button from './Button';
import './homepage.css';
function Example() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="text-center">
      <Button label="Order Now" onClick={handleClick} />
    </div>
  );
}

export default Example;
