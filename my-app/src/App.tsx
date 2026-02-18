import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./subpages/Home";
import Shop from "./subpages/Shop";
import Cos from "./components/Cos";
import "./css/App.css";
import "./css/header.css";
import "./css/content.css";
import "./css/Services.css";
import OpenedProduct from "./subpages/OpenedProduct";
import LoginPage from "./subpages/LoginPage";
import RegisterPage from "./subpages/RegisterPage";
import ResetPassword from "./subpages/ResetPassword";
import { useEffect, useState } from "react";
import { User } from "./components/Types";
import ShoppingList from "./subpages/ShoppingList";
import PaymentFailure from "./subpages/PaymentFailure";
import PaymentSuccess from "./subpages/PaymentSuccess";
import AddProduct from "./subpages/AddProduct";
import DeleteProduct from "./subpages/DeleteProduct";
import Services from "./subpages/Services";
function App() {
  const [userData, setUserData] = useState<User>({
    username: "",
    email: "",
    ProductInShoppingCart: [],
  });
  async function verifyUser() {
    try {
      const pageURL = new URL(document.URL);
      const pathnames: string[] = [
        "/shoppingList",
        "/store",
        "/openedProduct",
        "/paymentFailure",
        "/paymentSuccessful",
        "/addProduct",
      ];
      if (!pathnames.includes(pageURL.pathname)) return true;
      const response = await fetch("http://localhost:8000/validateUser", {
        method: "GET",
        credentials: "include",
      });
      if (response.status !== 200) {
        if (response.status !== 401) throw new Error("Błąd wewnętrzny serwera");
        const json = await response.json();
        throw new Error(json["Error"]);
      }
      const json = await response.json();
      setUserData(json as User);
      return true;
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/store"
          element={
            <Shop
              username={userData.username}
              email={userData.email}
              ProductInShoppingCart={userData.ProductInShoppingCart}
            />
          }
        />
        <Route
          path="/openedProduct"
          element={
            <OpenedProduct
              username={userData.username}
              email={userData.email}
              ProductInShoppingCart={userData.ProductInShoppingCart}
              SetProductsInShoppingCart={setUserData}
            />
          }
        />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route
          path="/shoppingList"
          element={
            <ShoppingList
              email={userData.email}
              username={userData.username}
              shoppingList={userData.ProductInShoppingCart}
              setShoppingList={setUserData}
            />
          }
        />
        <Route
          path="/paymentFailure"
          element={
            <PaymentFailure
              email={userData.email}
              username={userData.username}
              shoppingList={userData.ProductInShoppingCart}
            />
          }
        />
        <Route
          path="/paymentSuccessful"
          element={
            <PaymentSuccess
              email={userData.email}
              username={userData.username}
              shoppingList={userData.ProductInShoppingCart}
            />
          }
        />
        <Route
          path="/addProduct"
          element={
            <AddProduct username={userData.username} email={userData.email} />
          }
        />
        <Route
          path="/deleteProduct"
          element={
            <DeleteProduct
              username={userData.username}
              email={userData.email}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}
export default App;
