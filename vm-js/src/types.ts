import { Coin } from "./core/coin";

export interface VendingProduct {
  label: string;
  price: number;
  coin?: Coin;
}
