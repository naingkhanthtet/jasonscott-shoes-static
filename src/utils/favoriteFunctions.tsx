import Cookies from "js-cookie";
import Shoe from "../types/Shoe";

/*
  Favorite action methods
  */
// add favorite
export const handleAddFavorites = async (favoriteItem: Shoe) => {
  const favoritesFromCookies = JSON.parse(Cookies.get("favorites") || "[]");

  // Avoid duplicates
  const isAlreadyFavorited = favoritesFromCookies.some(
    (shoe: Shoe) => shoe.id === favoriteItem.id
  );

  const updatedFavorites = isAlreadyFavorited
    ? favoritesFromCookies
    : [...favoritesFromCookies, { ...favoriteItem }];
  Cookies.set("favorites", JSON.stringify(updatedFavorites));
};

// remove favorite
export const handleRemoveFavorites = async (itemId: number) => {
  const favoritesCookies = JSON.parse(Cookies.get("favorites") || "[]");

  const updatedFavorites = favoritesCookies.filter(
    (shoe: Shoe) => shoe.id !== itemId
  );

  Cookies.set("favorites", JSON.stringify(updatedFavorites));
};
