// App.jsx
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Shopcategory from './pages/Shopcategory';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Loginsignup from './pages/Loginsignup';
import Footer from './components/footer/Footer';
import men_banner from './components/assests/Frontend_Assets/banner_mens.png';
import women_banner from './components/assests/Frontend_Assets/banner_women.png';
import kids_banner from './components/assests/Frontend_Assets/banner_kids.png';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<Shopcategory  banner={men_banner} category="men" />} />
        <Route path="/womens" element={<Shopcategory  banner={women_banner} category="women" />} />
        <Route path="/kids" element={<Shopcategory   banner={kids_banner} category="kid" />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Loginsignup />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
