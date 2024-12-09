import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import theme from "./theme";
import Home from "./components/pages/Home";
import ShoeDetail from "./components/Shoe/ShoeDetail";
import Nav from "./components/Header/Nav";
import Footer from "./components/Footer/Footer";
import FavoritePage from "./components/pages/FavoritePage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import {
  AppWrapper,
  ContentWrapper,
} from "./components/styles/BasicComponents";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">(
    (Cookies.get("theme") as "light" | "dark") || "light"
  );

  // Memorize the theme to avoid re-render
  const currentTheme = useMemo(() => theme(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    Cookies.set("theme", newMode, { expires: 365 });
  };

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Nav onToggleTheme={toggleTheme} mode={mode} />
        <AppWrapper>
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shoes/:id" element={<ShoeDetail />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </ContentWrapper>
          <Footer />
        </AppWrapper>
      </ThemeProvider>
    </Router>
  );
};

export default App;
