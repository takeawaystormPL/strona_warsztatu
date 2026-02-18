import tools from "../resources/construction_32dp_E3E3E3_FILL0_wght400_GRAD0_opsz40.svg";
import pusteLogo from "../resources/logo_bez_tla(1).png";
import logo from "../resources/logo.png";
export default function Header() {
  return (
    <header id="pageHeader">
      <div
        id="logo"
        onClick={() => {
          window.location.href = "/home";
        }}
      >
        <img src={pusteLogo} alt="shoppingCart" />
        {/* <h1>Auto-serwis</h1> */}
      </div>
      <div id="links">
        <a href="/home">O nas</a>
        <a href="/store">Sklep</a>
        <a href="/services">DPF</a>
      </div>
    </header>
  );
}
