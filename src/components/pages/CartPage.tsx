import React, { useEffect, useState } from "react";
import {
  Image,
  FlexColumn,
  FlexRow,
  StyledButton,
  StyledLink,
  ContentWidth,
} from "../styles/BasicComponents";
import Shoe from "../../types/Shoe";
import Cookies from "js-cookie";
import BackHome from "./BackHome";
import { Typography, Box, IconButton, Select, MenuItem } from "@mui/material";
import { CartShoeBox } from "../styles/CartComponents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteButton from "../Buttons/FavoriteButton";
import {
  handleQuantityChange,
  handleRemoveFromCart,
} from "../../utils/cartFunctions";

const CartPage: React.FC = () => {
  const [cartShoes, setCartShoes] = useState<Shoe[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // load cart data from cookies
    const loadCartFromCookies = () => {
      const carts = JSON.parse(Cookies.get("cart") || "[]");
      setCartShoes(carts);
    };
    loadCartFromCookies();

    // const updateCartListener = () => loadCartFromCookies();

    // run load cart data again after updating the cart data
    window.addEventListener("cartUpdated", loadCartFromCookies);
    return () => {
      window.removeEventListener("cartUpdated", loadCartFromCookies);
    };
  }, []);

  // Calculate total price based on quantities
  useEffect(() => {
    const newTotalPrice = cartShoes.reduce((sum, shoe) => {
      return sum + shoe.price * (shoe.quantity || 1);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cartShoes]);

  // calculate total quantity of all shoes in cart
  useEffect(() => {
    const newTotalQuantity = cartShoes.reduce((sum, shoe) => {
      return sum + (shoe.quantity || 1);
    }, 0);
    setTotalQuantity(newTotalQuantity);
  }, [cartShoes]);

  return (
    <>
      <BackHome />
      <ContentWidth
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "20px",
        }}
      >
        {cartShoes.length > 0 ? (
          <>
            {/* Shoe Boxes */}
            <FlexColumn sx={{ width: { xs: "100%", md: "60%" }, gap: "10px" }}>
              {cartShoes.map((cartShoe) => (
                <CartShoeBox
                  key={cartShoe.id}
                  sx={{
                    display: "flex",
                    padding: "10px",
                  }}
                >
                  <StyledLink to={`/shoes/${cartShoe.id}`}>
                    <Box
                      sx={{
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={cartShoe.image}
                        alt={cartShoe.name}
                        sx={{ maxWidth: "300px" }}
                      />
                    </Box>

                    {/* Content section */}
                    <FlexColumn sx={{ width: "60%", padding: "10px" }}>
                      <Typography variant="h5">{cartShoe.name}</Typography>
                      <Typography>
                        {cartShoe.brand}, {cartShoe.type}, {cartShoe.color}
                      </Typography>
                      <Typography variant="h5">
                        $
                        {(cartShoe.price * (cartShoe.quantity || 1)).toFixed(2)}
                      </Typography>
                    </FlexColumn>
                  </StyledLink>

                  {/* Icons section */}
                  <FlexColumn sx={{ width: "10%", alignItems: "center" }}>
                    <IconButton
                      onClick={() => handleRemoveFromCart(cartShoe.id)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    <FavoriteButton
                      id={cartShoe.id}
                      name={cartShoe.name}
                      price={cartShoe.price}
                      image={cartShoe.image}
                    />
                    <Select
                      value={cartShoe.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          cartShoe.id,
                          parseInt(e.target.value as string)
                        )
                      }
                      size="small"
                      sx={{
                        borderRadius: "0px",
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </FlexColumn>
                </CartShoeBox>
              ))}
            </FlexColumn>

            {/* Summary Section */}
            <FlexColumn
              sx={{
                width: { xs: "100%", md: "40%" },
                padding: "10px",
                gap: "20px",
              }}
            >
              <Typography variant="h5">Order Summary</Typography>

              <FlexRow>
                <Typography>Total Items</Typography>
                <Typography>
                  {/* {Object.values(quantities).reduce((acc, qty) => acc + qty, 0)} */}
                  {totalQuantity}
                </Typography>
              </FlexRow>
              <FlexRow>
                <Typography>Total Price</Typography>
                <Typography>${totalPrice}</Typography>
              </FlexRow>
              <StyledLink to="/checkout">
                <StyledButton
                  sx={{
                    width: "100%",
                  }}
                >
                  Checkout
                </StyledButton>
              </StyledLink>
            </FlexColumn>
          </>
        ) : (
          <Typography variant="h5">No shoes in Cart</Typography>
        )}
      </ContentWidth>
    </>
  );
};

export default CartPage;
