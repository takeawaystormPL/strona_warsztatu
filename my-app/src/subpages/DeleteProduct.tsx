import { useEffect, useRef, useState } from "react";
import validateIfAdmin from "../functions/validateIfAdmin";
import ShopHeader from "../components/ShopHeader";

export default function DeleteProduct(props: {
  username: string;
  email: string;
}) {
  const [productName, setProductName] = useState<string>("");
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    if (!validateIfAdmin()) window.history.back();
  }, []);
  return (
    <div>
      <ShopHeader
        isLogged={props.username.length != 0}
        username={props.username}
        email={props.email}
      />
      <form
        action=""
        onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();
          deleteProduct(productName, errorRef, setProductName);
        }}
      >
        <h1>Usuń produkt</h1>
        <div>
          <label htmlFor="productName">Podaj nazwę produktu</label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={productName}
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
              setProductName((e.target as HTMLInputElement).value);
            }}
          />
        </div>
        <p className="error" ref={errorRef}></p>
        <input type="submit" value="Usuń produkt" />
      </form>
    </div>
  );
}
async function deleteProduct(
  productName: string,
  errorRef: React.RefObject<HTMLParagraphElement | null>,
  setProductName: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    const response = await fetch("http://localhost:8000/deleteProduct", {
      method: "POST",
      body: JSON.stringify({
        productName: productName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status > 499) throw new Error("Błąd wewnętrzny serwera");
    else if (response.status !== 200) {
      const json = await response.json();
      throw new Error(json["message"]);
    }
    if (response.status === 200) {
      errorRef.current!.innerText = "";
      setProductName("");
    }
  } catch (e) {
    errorRef.current!.innerText =
      typeof e == "string" ? e : e instanceof Error ? e.message : "";
  }
}
