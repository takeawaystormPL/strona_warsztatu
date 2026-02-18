import ShopHeader from "../components/ShopHeader";
import { useState, useEffect, useRef } from "react";
import { ProductInShoppingCart } from "../components/Types";
import { User } from "../components/Types";
import Image from "../resources/mechanic_photo.jpg";
import lockProductAmount from "../functions/lockProductAmount";
import "../css/shoppingList.css";
import redirectToProductPage from "../functions/redirectToProductPage";
import { changeShoppingList } from "../functions/changeShoppingList";

export default function ShoppingList(props: {
  username: string;
  email: string;
  shoppingList: { productID: number; amount: number }[];
  setShoppingList: React.Dispatch<React.SetStateAction<User>>;
}) {
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [productList, setProductList] = useState<ProductInShoppingCart[]>([]);
  console.log(productList);

  useEffect(() => {
    getShoppingList(props.shoppingList, setProductList);
    console.log(props.shoppingList);
  }, [props.shoppingList]);
  return (
    <div id="productListContainer">
      <ShopHeader
        isLogged={props.username !== ""}
        username={props.username}
        email={props.email}
      />{" "}
      {props.username !== "" && (
        <h1>Twój koszyk:{productList.length} produktów</h1>
      )}
      <div id="productList">
        {/* <div
          className="productOnProductList"
          onClick={() => {
            redirectToProductPage(1);
          }}
        >
          <img src={Image} alt="productImage" />
          <p className="productName">Filtr oleju</p>
          <p className="productPrice">24.00zł</p>
          <div>
            <label htmlFor="amount">Wybierz ilość:</label>
            <select
              name="amount"
              id="amount"
              onChange={(e: React.SyntheticEvent) => {
                e.stopPropagation();
              }}
            >
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option value="1">4</option>
            </select>
          </div>
          <button onClick={(e) => {}}>Usuń z koszyka</button>
        </div> */}
        {props.username !== ""}
        {productList.map((el) => (
          <div
            className="productOnProductList"
            onClick={() => {
              redirectToProductPage(el.ID);
            }}
          >
            <img src={Image} alt="productImage" />
            <p className="productName">{el.productName}</p>
            <p className="productPrice">
              {Number(el.price) * Number(el.amount)}.00zł
            </p>
            <div>
              <label htmlFor="amount">Wybierz ilość:</label>
              <select
                name="amount"
                id="amount"
                onClick={(e: React.SyntheticEvent) => {
                  e.stopPropagation();
                }}
                defaultValue={el.amount}
                onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => {
                  changeShoppingList(
                    props.shoppingList,
                    el.ID,
                    Number(e.currentTarget.value),
                    props.username,
                    errorRef,
                    props.setShoppingList,
                  );
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                changeShoppingList(
                  props.shoppingList,
                  el.ID,
                  0,
                  props.username,
                  errorRef,
                  props.setShoppingList,
                );
              }}
            >
              Usuń z listy ulubionych
            </button>
          </div>
        ))}
      </div>
      <div id="shoppingListPanel">
        {props.username === "" && (
          <p>Żeby dodawać produkty do koszyka,musisz być zalogowany</p>
        )}
        {props.username === "" && (
          <button
            id="payment"
            onClick={() => {
              window.location.href = "/loginPage";
            }}
          >
            Zaloguj się
          </button>
        )}
        {props.username !== "" && (
          <p>
            Do zapłaty:
            {productList.length > 0
              ? productList
                  .map((el) => el.amount * el.price)
                  .reduce((a, b) => a + b)
              : 0}
            .00 zł
          </p>
        )}
        {props.username !== "" && (
          <button
            id="payment"
            onClick={() => {
              redirectToCheckout(props.shoppingList, errorRef);
            }}
          >
            Przejdź do płatności
          </button>
        )}
        {props.username !== "" && <p className="error" ref={errorRef}></p>}
      </div>
    </div>
  );
}
async function getShoppingList(
  productsID: { productID: number; amount: number }[],
  setProductList: React.Dispatch<React.SetStateAction<ProductInShoppingCart[]>>,
) {
  try {
    const response = await fetch("http://localhost:8000/getShoppingList", {
      method: "POST",
      body: JSON.stringify({
        shoppingList: productsID,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log("cos");
    if (response.status !== 200) {
      if (response.status >= 500) {
        throw new Error("Błąd wewnętrzny serwera");
      }
      if (response.status === 204) {
        setProductList([]);
        return;
      }
      const json = await response.json();
      throw new Error(json["Error"]);
    }
    const json = await response.json();
    setProductList(json != null ? (json as ProductInShoppingCart[]) : []);
  } catch (e) {
    console.log(typeof e == "string" ? e : e instanceof Error ? e.message : "");
  }
}

async function redirectToCheckout(
  shoppingList: { productID: number; amount: number }[],
  errorParagraph: React.RefObject<HTMLParagraphElement | null>,
) {
  try {
    console.log(shoppingList);
  } catch (e) {
    typeof e == "string"
      ? (errorParagraph.current!.innerText = e)
      : e instanceof Error
        ? (errorParagraph.current!.innerText = e.message)
        : (errorParagraph.current!.innerText = "");
  }
}
function changeAmountOfProduct(
  setProductList: React.Dispatch<React.SetStateAction<ProductInShoppingCart[]>>,
  productID: number,
  amount: number,
) {
  return setProductList((prev) => {
    let array = prev.filter((el) => el.ID !== productID);
    let foundElement = prev.find((el) => el.ID === productID);
    foundElement = {
      ...foundElement!,
      amount: amount,
    };
    return [...array, foundElement];
  });
}
