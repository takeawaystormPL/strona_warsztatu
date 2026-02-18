import { useState, useEffect, useRef } from "react";
import "../css/shop.css";
import ShopHeader from "../components/ShopHeader";
import { Searching, Product, User } from "../components/Types";
import SearchingInterface from "../components/SearchingInterface";
import redirectToProductPage from "../functions/redirectToProductPage";
import Footer from "../components/Footer";

export default function Shop(props: User) {
  const [filtersValue, changeFiltersValue] = useState<Searching>({
    searchedCategory: "all",
    searchedTitle: "",
    searchedProducent: "all",
  });
  const [productList, setProductList] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  function filterResults(state: Searching) {
    const url = new URL(document.URL);
    let searchedCategory =
      url.searchParams.get("searchedCategory") == null
        ? state.searchedCategory
        : url.searchParams.get("searchedCategory");
    let productsToShow: Product[] = productList;
    if (state.searchedTitle !== "")
      productsToShow = productsToShow.filter((el) =>
        el.productName
          .toLowerCase()
          .includes(state.searchedTitle.toLowerCase()),
      );
    if (searchedCategory !== "all")
      productsToShow = productsToShow.filter(
        (el) => el.category === searchedCategory,
      );
    if (state.searchedProducent !== "all")
      productsToShow = productsToShow.filter(
        (el) => el.manufacturer === state.searchedProducent,
      );
    setProductsToShow(productsToShow);
  }

  useEffect(() => {
    LoadFromDatabase(setProductList, setProductsToShow);
    filterResults(filtersValue);
  }, []);

  return (
    <div id="shopContainer" ref={containerRef}>
      <ShopHeader
        isLogged={props.username !== ""}
        username={props.username}
        email={props.email}
      />
      <SearchingInterface
        filtersValue={filtersValue}
        changeFiltersValue={changeFiltersValue}
        filterProducts={filterResults}
      />
      <div id="productList">
        {productsToShow.map((product) => (
          <div
            className="product"
            onClick={() => {
              redirectToProductPage(product.ID);
            }}
          >
            <img src={product.source} alt="productImage" />
            <p className="productName">{product.productName}</p>
            <p className="productPrice">{product.price}.00zł</p>
            <p className="productAvailability">
              {product.amount > 0 ? "Dostępny" : "Niedostępny"}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
async function LoadFromDatabase(
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>,
  setProductsToShow: React.Dispatch<React.SetStateAction<Product[]>>,
) {
  const response = await fetch("http://localhost:8000/loadProducts", {
    method: "POST",
    body: JSON.stringify({
      id: 0,
    }),
    credentials: "include",
    headers: {
      "Application-type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error("Couldn't load products");
  }
  const json = await response.json();
  const productList = json as Product[];
  if (productList.length <= 0) {
    throw new Error("Couldn't convert response to Product[] type");
  }
  setProductList(productList);
  setProductsToShow(
    new URL(document.URL).searchParams.get("searchedCategory") != null
      ? productList.filter(
          (el) =>
            el.category ===
            new URL(document.URL).searchParams.get("searchedCategory"),
        )
      : productList,
  );
  return;
}
