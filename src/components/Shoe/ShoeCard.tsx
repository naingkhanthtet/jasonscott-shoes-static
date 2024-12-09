import React from "react";
import { Typography } from "@mui/material";
import { ShoeCardBox, ShoeCardImageBox } from "../styles/ShoeComponents";
import { FlexColumn, FlexRow, Image } from "../styles/BasicComponents";
import { Link } from "react-router-dom";
import FavoriteButton from "../Buttons/FavoriteButton";
import Shoe from "../../types/Shoe";

const ShoeCard: React.FC<Shoe> = ({ id, name, price, image }) => {
  return (
    <ShoeCardBox key={id}>
      <Link
        to={`/shoes/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ShoeCardImageBox>
          <Image src={image} alt={name} />
        </ShoeCardImageBox>
      </Link>

      <FlexRow>
        <Link
          to={`/shoes/${id}`}
          style={{ textDecoration: "none", color: "inherit", width: "80%" }}
        >
          <FlexColumn>
            <Typography variant="h6">{name}</Typography>
            <Typography>${price}</Typography>
          </FlexColumn>
        </Link>
        <FlexColumn>
          <FavoriteButton id={id} name={name} price={price} image={image} />
        </FlexColumn>
      </FlexRow>
    </ShoeCardBox>
  );
};

export default ShoeCard;
