import { SearchingInterfaceProps, Searching } from "../components/Types";
import searchIcon from "../resources/searchIcon.svg";
export default function SearchingInterface({
  filtersValue,
  changeFiltersValue,
  filterProducts,
}: SearchingInterfaceProps) {
  return (
    <div id="searchingDiv">
      <input
        type="text"
        name="searchedTitle"
        id="searchedTitle"
        placeholder="Czego szukasz?"
        value={filtersValue.searchedTitle}
        onChange={(e: React.SyntheticEvent) => {
          updateState(e, changeFiltersValue);
        }}
      />
      <select
        name="searchedCategory"
        id="searchedCategory"
        defaultValue={filtersValue.searchedCategory}
        onChange={(e: React.SyntheticEvent) => {
          updateState(e, changeFiltersValue);
        }}
      >
        <option value="all">Wszystkie</option>
        <option value="filtry_oleju">Filtry oleju</option>
        <option value="filtry_paliwa">Filtry paliwa</option>
        <option value="o-ringi">O-ringi</option>
        <option value="oleje">Oleje</option>
        <option value="lozyska">Łożyska</option>
        <option value="wycieraczki">Wycieraczki</option>
        <option value="zestawy_naprawcze">Zestawy naprawcze</option>
        <option value="swiece">Swiece</option>
      </select>
      <select
        name="searchedProducent"
        id="searchedProducent"
        onChange={(e: React.SyntheticEvent) => {
          updateState(e, changeFiltersValue);
        }}
        defaultValue={filtersValue.searchedProducent}
      >
        <option value="all">Wszyscy</option>
        <option value="filtron">Filtron</option>
        <option value="mann">Mann-filter</option>
        <option value="bosch">Bosch</option>
        <option value="purflux">Purflux</option>
        <option value="ngk">NGK</option>
        <option value="elring">Elring</option>
        <option value="shell">Shell</option>
        <option value="castrol">Castrol</option>
        <option value="valvoline">Valvoline</option>
      </select>
      <button
        onClick={() => {
          filterProducts(filtersValue);
        }}
      >
        <img src={searchIcon} alt="search icon" />
      </button>
    </div>
  );
}
function updateState(
  event: React.SyntheticEvent,
  stateSetter: React.Dispatch<React.SetStateAction<Searching>>,
) {
  const element: HTMLInputElement | HTMLSelectElement =
    event.currentTarget.id == "searchedTitle"
      ? (event.target as HTMLInputElement)
      : (event.target as HTMLSelectElement);
  stateSetter((prev) => ({
    ...prev,
    [element.name]: element.value,
  }));
}
