import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Orders from './components/Orders/Orders';
// import Footer from "./components/Footer/Footer";
import Inventory from "./components/Inventory/Inventory";
import Shipment from './components/Shipment/Shipment';
import About from "./components/About/About";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import RequireAuth from "./components/RequireAuth/RequireAuth";

export const UseCartItemsCount = createContext();

function App() {
  const [itemsCount, setItemsCount] = useState(0);
  return (
    <div>
      <UseCartItemsCount.Provider value={{ itemsCount, setItemsCount }}>
        <Header />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory"
            element={
              <RequireAuth>
                <Inventory />
              </RequireAuth>
            } />
          <Route path="/shipment" element={
            <RequireAuth>
              <Shipment />
            </RequireAuth>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>

        {/* <Footer /> */}
      </UseCartItemsCount.Provider>
    </div>
  );
}

export default App;
