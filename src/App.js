import { useState } from "react";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Footer from "./components/Footer/Footer";

function App() {
  const [itemsCount, setItemsCount] = useState(0);
  return (
    <div>
      <Header itemsCount={itemsCount} />
      <Shop setItemsCount={setItemsCount} />
      <Footer />
    </div>
  );
}

export default App;
