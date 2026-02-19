import "../css/footer.css";
import phoneIcon from "../resources/callIcon.svg";
import mailIcon from "../resources/mailIcon.svg";
import locationIcon from "../resources/locationIcon.svg";
export default function Footer(props: {}) {
  return (
    <footer>
      <div>
        <h2>Podstrony</h2>
        <a href="#/home">O nas</a>
        <a href="#/store">Sklep</a>
        <a href="#/services">DPF</a>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p>
          <img src={locationIcon} alt="" id="locationIcon" />
          Gorzyce 268, 37-204 Tryńcza
        </p>

        <p>
          <img src={mailIcon} alt="" />
          danielmisilo@op.pl
        </p>
        <p>
          {" "}
          <img src={phoneIcon} alt="" />
          500631039, 571804842
        </p>
      </div>
    </footer>
  );
}
