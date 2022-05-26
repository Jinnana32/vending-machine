import { Coin } from "../../vm-js/src";
import { VendingProduct } from "../../vm-js/src/types";

export interface ICoinSlot {
  label: string;
  amount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  inputDisabled: boolean;
  buttonDisabled: boolean;
}

export interface IChangeStash {
  changeStash: Coin;
  collectDisabled: boolean;
  collectStash: () => void;
}

export interface IProductShelf {
  coinStash: Coin;
  products: VendingProduct[] | null | undefined;
  productStash: VendingProduct | null;
  pickSnack: () => void;
  onVendProduct: (product: VendingProduct) => void;
}
