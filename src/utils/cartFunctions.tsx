import Cookies from "js-cookie";
import Shoe from "../types/Shoe";

/*
  Cart action methods
  */
// add to cart function for both registered and unregistered
export const handleAddToCart = (cartItem: Shoe) => {
  // const updatedCart = [...user.cart, { ...cartItem, quantity: 1 }];
  const cartCookies = JSON.parse(Cookies.get("cart") || "[]");
  // avoid cart duplicates
  const isAlreadyInCart = cartCookies.some(
    (shoe: Shoe) => shoe.id === cartItem.id
  );

  const updatedCart = isAlreadyInCart
    ? cartCookies
    : [...cartCookies, { ...cartItem }];
  Cookies.set("cart", JSON.stringify(updatedCart));
};

// remove from cart for both registered and unregistered
export const handleRemoveFromCart = async (itemId: number) => {
  const cartCookies = JSON.parse(Cookies.get("cart") || "[]");

  const updatedCart = cartCookies.filter((shoe: Shoe) => shoe.id !== itemId);
  Cookies.set("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};

// cart item quanity change for both registered and unregistered
export const handleQuantityChange = (itemId: number, quantity: number) => {
  const cartCookies = JSON.parse(Cookies.get("cart") || "[]");

  const updatedCart = cartCookies.map((shoe: Shoe) =>
    shoe.id === itemId ? { ...shoe, quantity } : shoe
  );
  Cookies.set("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};
