import { useRef, useState, useEffect } from "react";
import ShopHeader from "../components/ShopHeader";
import validateIfAdmin from "../functions/validateIfAdmin";
import {
  AddProduct as AddProductType,
  ProductTypes,
} from "../components/Types";

export default function AddProduct(props: { username: string; email: string }) {
  const [addProductState, setAddProductState] = useState<AddProductType>({
    productName: "",
    productPrice: 0,
    productCategory: ProductTypes.filtry_oleju,
    productManufacturer: "",
    productForWhichCars: "",
    productImage: new Blob(),
  });
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    async function xd() {
      if (!(await validateIfAdmin())) window.history.back();
    }
    xd();
  }, []);
  return (
    <div>
      <ShopHeader
        username={props.username}
        isLogged={props.username.length !== 0}
        email={props.email}
      />
      <form
        onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();
          AddProductToDatabase(addProductState, errorRef, setAddProductState);
        }}
      >
        <h1>Dodaj produkt</h1>
        <div>
          <label htmlFor="productName">Podaj nazwę produktu:</label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={addProductState.productName}
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
              setAddProductState((prev) => ({
                ...prev,
                [(e.target as HTMLInputElement).name]: (
                  e.target as HTMLInputElement
                ).value,
              }));
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="productManufacturer">
            Podaj producenta produktu:
          </label>
          <select
            name="productManufacturer"
            id="productManufacturer"
            value={addProductState.productManufacturer}
            onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => {
              setAddProductState((prev) => ({
                ...prev,
                [(e.target as HTMLSelectElement).name]: (
                  e.target as HTMLSelectElement
                ).value,
              }));
            }}
            required
          >
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
        </div>
        <div>
          <label htmlFor="productForWhichCars">
            Podaj modele,do których produkt pasuje:
          </label>
          <input
            type="text"
            name="productForWhichCars"
            id="productForWhichCars"
            value={addProductState.productForWhichCars}
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
              setAddProductState((prev) => ({
                ...prev,
                [(e.target as HTMLInputElement).name]: (
                  e.target as HTMLInputElement
                ).value,
              }));
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="productCategory">Podaj kategorię produktu:</label>
          <select
            name="productCategory"
            id="productCategory"
            value={addProductState.productCategory}
            onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => {
              setAddProductState((prev) => ({
                ...prev,
                [(e.target as HTMLSelectElement).name]: (
                  e.target as HTMLSelectElement
                ).value,
              }));
            }}
          >
            <option value="filtry_oleju" selected>
              Filtry oleju
            </option>
            <option value="filtry_paliwa">Filtry paliwa</option>
            <option value="o-ringi">O-ringi</option>
            <option value="oleje">Oleje</option>
            <option value="lozyska">Łożyska</option>
            <option value="wycieraczki">Wycieraczki</option>
            <option value="zestawy_naprawcze">Zestawy naprawcze</option>
            <option value="swiece">Swiece</option>
          </select>
        </div>
        <div>
          <label htmlFor="productPrice">Podaj cenę produktu:</label>
          <input
            type="number"
            name="productPrice"
            id="productPrice"
            value={addProductState.productPrice}
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
              setAddProductState((prev) => ({
                ...prev,
                [(e.target as HTMLSelectElement).name]: Number(
                  (e.target as HTMLSelectElement).value,
                ),
              }));
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="productPhoto">Dodaj zdjęcie produktu:</label>
          <input
            type="file"
            name="productPhoto"
            id="productPhoto"
            accept="image/png,image/jpeg,image/webp,image/jfif"
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
              setAddProductState((prev) => ({
                ...prev,
                productImage: (
                  (e.target as HTMLInputElement).files as FileList
                )[0],
              }));
            }}
            required
          />
        </div>
        <p className="error" ref={errorRef}></p>
        <input type="submit" value="Dodaj produkt" />
      </form>
    </div>
  );
}
//Function for adding product to database
async function AddProductToDatabase(
  addProductState: AddProductType,
  errorRef: React.RefObject<HTMLParagraphElement | null>,
  setAddProductState: React.Dispatch<React.SetStateAction<AddProductType>>,
) {
  try {
    const allowedTypes: string[] = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/jfif",
    ];
    if (!allowedTypes.includes(addProductState.productImage.type))
      throw new Error("Niedozwolony format miniaturki");
    const formData = new FormData();
    formData.set("productImage", addProductState.productImage);
    formData.set("productName", addProductState.productName);
    formData.set("productCategory", addProductState.productCategory);
    formData.set("productPrice", addProductState.productPrice.toString());
    formData.set("productManufacturer", addProductState.productManufacturer);
    formData.set("productForWhichCars", addProductState.productForWhichCars);
    const response = await fetch("http://localhost:8000/addProduct", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (response.status !== 200) {
      if (response.status > 499)
        throw new Error("Błąd wewnętrzny,spróbuj ponownie później");
      else {
        const json = await response.json();
        throw new Error(json["message"]);
      }
    }
    setAddProductState({
      productName: "",
      productPrice: 0,
      productCategory: ProductTypes.filtry_oleju,
      productManufacturer: "",
      productForWhichCars: "",
      productImage: new Blob(),
    });
    errorRef.current!.innerText = "";
    return true;
  } catch (e) {
    console.log(e);
    errorRef.current!.innerText =
      typeof e == "string" ? e : e instanceof Error ? e.message : "";
  }
}
