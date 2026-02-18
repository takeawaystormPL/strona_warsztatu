import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Home.css";
export default function Home() {
  return (
    <div>
      <Content />
    </div>
  );
}
function Content() {
  return (
    <div id="home">
      <Header />
      <div id="companyDescription">
        <h1>DM-Serwis Daniel Misiło</h1>
        <p>
          Szukasz sprawdzonego warsztatu, który szybko i skutecznie rozwiąże
          problemy Twojego auta? Zapraszamy do DM-Serwis Daniel Misiło! Nasz
          warsztat oferuję szeroki wachlarz usług takich jak:
          <ul>
            <li>
              Czyszczenie filtrów DPF <a href="/services">zobacz więcej</a>
            </li>
            <li>Diagnostyka pojazdów</li>
            <li>Mechanika pojazdów</li>
            <li>Praca z oprogramowaniem samochodu</li>
            <li>Cofanie liczników</li>
            <li>Chip tuning</li>
            <li>Wymiana oleju</li>
            <li>Naprawa klimatyzacji</li>
          </ul>
          Przyjedź pod adres Gorzyce 268,37-204 Tryńcza a my zajmiemy się resztą
        </p>
      </div>
      <Footer />
    </div>
  );
}
