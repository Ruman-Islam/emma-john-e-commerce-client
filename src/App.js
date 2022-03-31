import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Orders from './components/Orders/Orders';
// import Footer from "./components/Footer/Footer";
import Inventory from "./components/Inventory/Inventory";
import About from "./components/About/About";

function App() {
  const [itemsCount, setItemsCount] = useState(0);
  return (
    <div>
      <Header itemsCount={itemsCount} />
      <Routes>
        <Route path="/" element={<Shop setItemsCount={setItemsCount} />} />
        <Route path="/shop" element={<Shop setItemsCount={setItemsCount} />} />
        <Route path="/orders" element={<Orders setItemsCount={setItemsCount} />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
