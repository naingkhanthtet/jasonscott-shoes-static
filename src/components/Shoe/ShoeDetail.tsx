import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import {
  ContentWidth,
  FlexRow,
  FlexColumn,
  Image,
} from "../styles/BasicComponents";
import { ShoeDetailContainer } from "../styles/ShoeComponents";
import BackHome from "../pages/BackHome";
import FavoriteButton from "../Buttons/FavoriteButton";
import Shoe from "../../types/Shoe";
import CartButton from "../Buttons/CartButton";
import { shoesData } from "../../assets/shoesData";

const ShoeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shoe, setShoe] = useState<Shoe | null>(null);

  useEffect(() => {
    // Find the shoe by ID
    const foundShoe = shoesData.find((shoe) => shoe.id === parseInt(id || ""));
    setShoe(foundShoe || null);
  }, [id]);

  if (!shoe) return <ContentWidth>Shoe not found</ContentWidth>;

  return (
    <>
      <BackHome />
      <ContentWidth>
        {shoe && (
          <ShoeDetailContainer>
            <Box
              sx={{
                width: { xs: "100%", sm: "50%" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={shoe.image}
                alt={shoe.name}
                sx={{ maxWidth: "600px" }}
              />
            </Box>
            <FlexColumn
              sx={{
                width: { xs: "100%", sm: "50%" },
                alignItems: { sm: "center" },
                justifyContent: "center",
              }}
            >
              <div>
                <Typography variant="h4">{shoe.name}</Typography>
                <Typography variant="h5">${shoe.price}</Typography>
                <Typography>
                  {shoe.brand}, {shoe.type}, {shoe.color}, {shoe.gender}
                </Typography>
                <Typography>{shoe.stock} stocks left</Typography>
                <FlexRow>
                  <CartButton
                    id={shoe.id}
                    name={shoe.name}
                    brand={shoe.brand}
                    color={shoe.color}
                    type={shoe.type}
                    price={shoe.price}
                    gender={shoe.gender}
                    image={shoe.image}
                    stock={shoe.stock}
                    quantity={1}
                  />
                  <FavoriteButton
                    id={shoe.id}
                    name={shoe.name}
                    price={shoe.price}
                    image={shoe.image}
                  />
                </FlexRow>
              </div>
            </FlexColumn>
          </ShoeDetailContainer>
        )}
      </ContentWidth>
    </>
  );
};

export default ShoeDetail;
