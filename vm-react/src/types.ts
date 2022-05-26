import { Coin } from "../../vm-js/src";
import { VendingProduct } from "../../vm-js/src/types";

export interface ICoinSlot {
  dollar: number;
  setDollar: (dollar: number) => void;
  cent: number;
  setCent: (cent: number) => void;
  insertCoin: () => void;
}

export interface IChangeStash {
  changeStash: Coin;
  collectStash: () => void;
}

export interface IProductShelf {
  coinStash: Coin;
  products: VendingProduct[];
  onVendProduct: (product: VendingProduct) => void;
}
