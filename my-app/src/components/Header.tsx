import "../css/header.css";
import pusteLogo from "../resources/logo_bez_tla(1).png";
export default function Header() {
  return (
    <header id="pageHeader">
      <div
        id="logo"
        onClick={() => {
          window.location.href = "#/home";
        }}
      >
        <img src={pusteLogo} alt="shoppingCart" />
        {/* <h1>Auto-serwis</h1> */}
      </div>
      <div id="links">
        <a href="#/home">O nas</a>
        <a href="#/store">Sklep</a>
        <a href="#/services">DPF</a>
      </div>
    </header>
  );
}
