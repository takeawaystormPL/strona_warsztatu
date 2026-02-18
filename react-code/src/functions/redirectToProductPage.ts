export default function redirectToProductPage(productID: number) {
    const pageURL = new URL(document.URL);
    pageURL.pathname = "openedProduct";
    pageURL.searchParams.set("id", String(productID));
    return (window.location.href = pageURL.toString());
  }