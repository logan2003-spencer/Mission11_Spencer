import './App.css';
import BooksPage from './pages/BooksPage';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonatePage from './pages/DonatePage';  
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBookPage from './pages/AdminBookPage';

function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<BooksPage />} /> 
          <Route path='/books' element={<BooksPage />} />
          <Route path='/donate/:bookTitle/:bookId' element={<DonatePage />} /> 
          <Route path='/cart' element={<CartPage />} />
          <Route path="/adminBooks" element={<AdminBookPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </>
  );
}

export default App;

