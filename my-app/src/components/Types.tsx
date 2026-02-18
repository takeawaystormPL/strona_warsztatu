export type searchingInterface = {
  name: string;
  surname: string;
};
export type Searching = {
  searchedCategory: string;
  searchedTitle: string;
  searchedProducent: string;
};
export type SearchingInterfaceProps = {
  filtersValue: Searching;
  changeFiltersValue: React.Dispatch<React.SetStateAction<Searching>>;
  filterProducts: (state: Searching) => void;
};
export type Product = {
  ID: number;
  productName: string;
  category: string;
  price: number;
  manufacturer: string;
  source: string;
  whichCars: string;
  amount: number;
};
export type ProductInShoppingCart = Product & {
  amount: number;
};
export type LoginData = {
  username: string;
  password: string;
};
export type RegisterData = LoginData & {
  email: string;
};
export type newPassword = {
  newPassword: string;
  confirmPassword: string;
};
export type ResetPasswordProps = {
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
};
export type User = {
  username: string;
  email: string;
  ProductInShoppingCart: { productID: number; amount: number }[];
};
export type ShoppingData = User & {
  SetProductsInShoppingCart: React.Dispatch<React.SetStateAction<User>>;
};
export enum ProductTypes {
  filtry_oleju = "filtry_oleju",
  filtry_paliwa = "filtry_paliwa",
  o_ringi = "o-ringi",
  oleje = "oleje",
  lozyska = "lozyska",
  wycieraczki = "wycieraczki",
  zestawy_naprawcze = "zestawy_naprawcze",
  swiece = "swiece",
}
export type AddProduct = {
  productName: string;
  productPrice: number;
  productCategory: ProductTypes;
  productImage: Blob;
  productManufacturer: string;
  productForWhichCars: string;
};
