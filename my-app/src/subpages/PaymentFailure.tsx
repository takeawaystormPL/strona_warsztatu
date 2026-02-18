import lockProductAmount from "../functions/lockProductAmount";
import ShopHeader from "../components/ShopHeader";
import "../css/paymentPage.css";
import { useEffect, useRef } from "react";
export default function PaymentFailure(props: {
  email: string;
  username: string;
  shoppingList: { productID: number; amount: number }[];
}) {
  const errorRef = useRef<HTMLParagraphElement>(null);
  const isRendered = useRef<boolean>(false);
  useEffect(() => {
    lockProductAmount(props.shoppingList, errorRef, false);
  }, [props.shoppingList]);
  return (
    <div id="container">
      <ShopHeader
        isLogged={props.username !== ""}
        username={props.username}
        email={props.email}
      />
      <div className="paymentStatus">
        <h2>Płatność nie powiodła się</h2>
        <p>
          Twoje zamówienie z powodu niepowodzenia płatności nie zostanie
          zrealizowane.
        </p>
        <button
          onClick={(e) => {
            window.location.href = "/shoppingList";
          }}
          className="redirectToShoppingList"
        >
          Przejdź do koszyka
        </button>
      </div>
    </div>
  );
}
