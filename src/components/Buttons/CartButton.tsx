import React, { useEffect, useState } from "react";
import Shoe from "../../types/Shoe";
import { StyledButton } from "../styles/BasicComponents";
import {
  handleAddToCart,
  handleRemoveFromCart,
} from "../../utils/cartFunctions";
import Cookies from "js-cookie";

const CartButton: React.FC<Shoe> = ({
  id,
  name,
  price,
  brand,
  color,
  type,
  image,
  quantity,
}) => {
  const [isCart, setIsCart] = useState(false);

  // set isCart value from cart cookies
  useEffect(() => {
    const cartFromCookies = JSON.parse(Cookies.get("cart") || "[]");
    const cartExists = cartFromCookies.some((shoe: Shoe) => shoe.id === id);
    setIsCart(cartExists);
  }, [id]);

  const toggleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isCart) {
      handleRemoveFromCart(id);
    } else {
      handleAddToCart({ id, name, price, brand, color, type, image, quantity });
    }
    window.dispatchEvent(new Event("cartUpdated"));
    setIsCart(!isCart);
  };

  return (
    <StyledButton onClick={toggleAddToCart}>
      {isCart ? "Remove from Cart" : "Add to Cart"}
    </StyledButton>
  );
};

export default CartButton;
