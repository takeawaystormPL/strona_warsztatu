import { User } from "../components/Types";
export async function changeShoppingList(
  shoppingList: {productID:number,amount:number}[],
  productID: number,
  amount:number,
  username: string,
  errorParagraph: React.RefObject<HTMLParagraphElement | null>,
  setProductList:React.Dispatch<React.SetStateAction<User>>
) {
  try {
    let newShoppingList:{productID:number,amount:number}[]=[];
    if(shoppingList == null){
     newShoppingList.push({productID,amount});
    }else{
        newShoppingList= shoppingList.find(el=>el.productID == productID)
      ? shoppingList.filter((el) => el.productID !== productID)
      : [...shoppingList, {productID,amount}];
    }
    const response = await fetch("http://localhost:8000/updateShoppingCart", {
      method: "POST",
      credentials:"include",
      body: JSON.stringify({
         username: username,
        shoppingCart:newShoppingList,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status != 200) {
      if (response.status >= 500) {
        throw new Error("Błąd wewnętrzny serwera");
      }
      const json = await response.json();
      throw new Error(json["message"]);
    }
    setProductList(prev=>({
      ...prev,
      ProductInShoppingCart:newShoppingList
    }));
  } catch (e) {
    errorParagraph.current!.innerText =
      typeof e == "string" ? e : e instanceof Error ? e.message : "";
  }
}