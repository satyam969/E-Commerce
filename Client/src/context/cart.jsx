import { createContext, useContext, useState,useEffect } from "react";


const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
  []
  );

  // local storage pe cart me products sav ehai wh a se le aao

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);




  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };