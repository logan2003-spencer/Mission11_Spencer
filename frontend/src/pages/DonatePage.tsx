import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";


function DonatePage() 
{
  const navigate = useNavigate();
  const {bookTitle, bookId} = useParams();
  const {addToCart} = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      bookTitle: bookTitle || "No book found",
      donationAmount}
      addToCart(newItem);
      navigate('/cart');
    }

  return (
    <>
      <WelcomeBand />
      <h2>Donate to {bookTitle}</h2>

      <div>
        <input type="number" placeholder="Enter Donation Amount: " value={donationAmount} onChange={(x) => setDonationAmount(Number(x.target.value))}/>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>


      <button onClick={() => navigate('/books')}>Go Back</button>
    
    </>
  )
}



export default DonatePage;