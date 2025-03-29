import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li
                key={item.bookId}
                style={{
                  border: "2px solid #ccc",  // Adds a border around each item
                  padding: "10px",            // Adds some space inside the border
                  margin: "10px 0",           // Adds space between items
                  borderRadius: "5px",        // Optional: rounded corners (remove if you want sharp corners)
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{item.bookTitle} : ${item.donationAmount.toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.bookId)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${cart.reduce((total, item) => total + item.donationAmount, 0).toFixed(2)}</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            backgroundColor: "yellow",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Checkout
        </button>
        <button
          style={{
            backgroundColor: "yellow",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/books")}
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );
}

export default CartPage;
