import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Services() {
  return (
    <div id="servicesContainer">
      <Header />
      <div id="header">
        <div>
          <h1>Filtry DPF</h1>
          <button
            onClick={() => {
              window.scroll(0, 600);
            }}
          >
            Zobacz więcej
          </button>
        </div>
      </div>
      <div id="services">
        <p>
          Nasz warsztat oferuje najróżniejsze usługi związane z filrami DPF
          takie jak:
          <ul>
            <li>
              CZYSZCZENIE FILTRÓW:DPF,EURO 5/EURO 6,KATALIZATORÓW CZYSZCZENIE
              ZAWORÓW I CHŁODNIC EG
              <p className="desc">
                Filtr cząstek stałych DPF/FAP oraz katalizator to kluczowe
                elementy układu wydechowego, które odpowiadają za ograniczenie
                emisji spalin. Z czasem ulegają one zapchaniu sadzą i popiołem,
                co skutkuje spadkiem mocy silnika, większym spalaniem oraz
                pojawieniem się kontrolki na desce rozdzielczej. W naszej firmie
                stosujemy specjalną maszynę do czyszczenia filtrów DPF,która
                skutecznie usuwa wszelkie nagromadzone zanieszyszczenia
              </p>
            </li>
            <li>
              CZYSZCZENIE ZAWORÓW I CHŁODNIC EGR
              <p className="desc">
                Zawór EGR (recyrkulacji spalin) odpowiada za zmniejszenie emisji
                szkodliwych substancji do atmosfery. Niestety, wraz z
                przebiegiem osadza się w nim sadza i nagar, co prowadzi do jego
                zablokowania. Objawy to m.in.: nierówna praca silnika, spadek
                mocy, szarpanie podczas jazdy czy wyższe spalanie. Nasza
                technologia czyszczenia pozwala usunąć wszystkie
                zanieczyszczenia z zaworów i chłodnic EGR, bez konieczności
                kosztownej wymiany elementu. To oznacza: płynniejszą i
                stabilniejszą pracę silnika, poprawę osiągów i mniejsze
                spalanie, dłuższą żywotność układu recyrkulacji spalin.
              </p>
            </li>
            <li>
              CZYSZCZENIE KOLEKTORÓW SSĄCYCH I DOLOTOWYCH
              <p className="desc">
                Kolektor ssący i dolotowy to elementy, przez które powietrze
                trafia do cylindrów silnika. Niestety, w wyniku recyrkulacji
                spalin i pracy EGR odkłada się w nich gruba warstwa nagaru,
                która potrafi znacznie ograniczyć przepływ powietrza. Efektem
                jest: spadek mocy, większe spalanie, a nawet problemy z
                odpalaniem silnika. Dzięki naszemu czyszczeniu kolektor
                odzyskuje swoją pełną drożność. Stosujemy specjalistyczne środki
                i urządzenia, które pozwalają skutecznie usunąć nagar bez ryzyka
                uszkodzenia elementu. Rezultat to: wyraźna poprawa osiągów,
                optymalna praca silnika, wydłużenie żywotności układu
                dolotowego.
              </p>
            </li>
          </ul>
        </p>
      </div>
      <Footer />
    </div>
  );
}
