import ShopHeader from "../components/ShopHeader";
export default function PaymentSuccess(props: {
  username: string;
  email: string;
  shoppingList: { productID: number; amount: number }[];
}) {
  return (
    <div id="container">
      <ShopHeader
        isLogged={props.username !== ""}
        username={props.username}
        email={props.email}
      />
      <div className="paymentStatus">
        <h2>Płatność powiodła się</h2>
        <p>
          Twoje zamówienie zostało zrealizowane.Szczegóły zamówienia zostały
          przesłane na twój adres email
        </p>
        <button
          onClick={() => {
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
