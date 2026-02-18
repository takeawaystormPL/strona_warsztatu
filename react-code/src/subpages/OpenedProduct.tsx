import { Product, ShoppingData } from "../components/Types";
import { useState, useEffect, useRef } from "react";
import ShopHeader from "../components/ShopHeader";
import "../css/openedProduct.css";
import { changeShoppingList } from "../functions/changeShoppingList";
import Footer from "../components/Footer";
async function loadProductData(
  changeOpenedProductData: React.Dispatch<React.SetStateAction<Product>>,
) {
  try {
    const url = new URL(document.URL);
    console.log(Number(url.searchParams.get("id")));
    const response = await fetch("http://localhost:8000/loadProducts", {
      method: "POST",
      body: JSON.stringify({
        id: Number(url.searchParams.get("id")),
      }),
    });
    if (!response.ok) throw new Error(await response.json());
    const json = await response.json();
    changeOpenedProductData(json[0]);
    console.log(json);
    return;
  } catch (error) {
    console.log(
      typeof error == "string"
        ? error
        : error instanceof Error
          ? error.message
          : "",
    );
  }
}
export default function OpenedProduct(props: ShoppingData) {
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [openedProductData, changeOpenedProductData] = useState<Product>({
    ID: 0,
    productName: "",
    category: "",
    price: 0,
    manufacturer: "",
    source: "",
    whichCars: "",
    amount: 0,
  });
  useEffect(() => {
    console.log(props.ProductInShoppingCart.length);
    loadProductData(changeOpenedProductData);
  }, []);
  return (
    <div id="openedProductContainer">
      <ShopHeader
        isLogged={props.username != ""}
        username={props.username}
        email={props.email}
      />
      <div id="openedProduct">
        <img src={openedProductData.source} alt="" />
        <div id="text">
          <h1>{openedProductData.productName}</h1>
          <div id="panel">
            <p>Cena:{openedProductData.price}.00 zł</p>
            <p>Dla aut:{openedProductData.whichCars}</p>
            <p className={openedProductData.amount > 0 ? "available" : "error"}>
              {openedProductData.amount > 0 ? "Dostępny" : "Niedostępny"}
            </p>
            <p className="error" ref={errorRef}></p>
            {/* 
            
            {props.username !== "" ? (  
              <button
                onClick={() => {
                  changeShoppingList(
                    props.ProductInShoppingCart,
                    openedProductData.ID,
                    1,
                    props.username,
                    errorRef,
                    props.SetProductsInShoppingCart
                  );
                }}
              >
                {props.ProductInShoppingCart.map((el) => el.productID).includes(
                  openedProductData.ID
                )
                  ? "Usuń z koszyka"
                  : "Dodaj do koszyka"}
              </button>
            ) : (
              <p id="isNotSignedParagraph">
                Aby zakupić produkt,musisz się zalogować
              </p>
            )}  
            */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
