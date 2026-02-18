export default async function lockProductAmount(
  shoppingList: { productID: number; amount: number }[],
  errorRef: React.RefObject<HTMLParagraphElement | null>,
  lockOrUnlock:boolean
) {
  try {
    const response = await fetch("http://localhost:8000/lockProductAmount", {
      method: "POST",
      body: JSON.stringify({
        shoppingList: shoppingList,
        lockOrUnlock: lockOrUnlock,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.status != 200) {
      const json = await response.json();
      throw new Error(json["message"]);
    }
    return true;
  } catch (e) {
    console.log(e);
    errorRef.current!.innerText =
      typeof e == "string" ? e : e instanceof Error ? e.message : "";
    return false;
  }
}