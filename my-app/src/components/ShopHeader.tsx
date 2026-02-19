import "../css/header.css";
import { useRef } from "react";
import pusteLogo from "../resources/logo_bez_tla(1).png";
import shoppingCart from "../resources/shoppingCart.svg";
import userIcon from "../resources/personIcon.svg";
function showWindow(ref: React.RefObject<HTMLDivElement | null>) {
  ref.current!.classList.toggle("invisible");
}
export default function ShopHeader(props: {
  isLogged: boolean;
  username?: string;
  email?: string;
}) {
  const windowRef = useRef<HTMLDivElement>(null);
  return (
    <header id="shopHeader">
      <div id="logo">
        <a href="#/store">
          <img src={pusteLogo} alt="shoppingCart" />
        </a>
      </div>
      <div id="links">
        <a href="/store?searchedCategory=filtry_oleju">Filtry oleju</a>
        <a href="/store?searchedCategory=filtry_paliwa">Filtry paliwa</a>
        <a href="/store?searchedCategory=oleje">Oleje</a>
        {props.username === "admin" && <a href="/addProduct">Dodaj produkt</a>}
      </div>
      <div id="shoppingIcons">
        {props.isLogged ? (
          <a href="/shoppingList">
            <img src={shoppingCart} alt="" id="shoppingIcon" />
          </a>
        ) : (
          <a>
            <img src={shoppingCart} alt="" id="shoppingIcon" />
          </a>
        )}

        <img
          src={userIcon}
          id="userIcon"
          alt="userIcon"
          onClick={() => {
            showWindow(windowRef);
          }}
        />
        {props.isLogged ? (
          <div id="accountDiv" className="invisible" ref={windowRef}>
            <img src={userIcon} id="userIcon" />
            <p>Nazwa:{props.username}</p>
            <p>Email:{props.email}</p>
          </div>
        ) : (
          <div id="accountDiv" className="invisible" ref={windowRef}>
            <h3>Nie jesteś zalogowany</h3>
            <a href="/loginPage">Zaloguj się</a>
            <a href="/registerPage">Zarejestruj się</a>
          </div>
        )}
      </div>
    </header>
  );
}
