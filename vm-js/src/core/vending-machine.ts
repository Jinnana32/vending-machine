import { VendingProduct } from "../types";
import { Coin } from "./coin";
export class VendingMachine {
  public coins: Coin;
  public refundedCoins: number;

  /**
   * @param products - products to be displayed in the vending machine
   * @param denoms - determines the denomination to be accepted by the
   * vending machine.
   *
   * $ denomination is === amount * 100
   * cents should be a number from 1 to 99
   *
   * eg. ($1 -> 100, $2 -> 200, 50c -> 50)
   */
  constructor(public products: VendingProduct[], public denoms: number[]) {
    this.coins = new Coin();
    this.refundedCoins = 0;
  }

  public insertCoin(rawCoin: string): void {
    // check if coin exist in the denoms
    // coin should start with $ or end with c
    // coin should be a whole number
    let coin = new Coin(rawCoin);
    this.coins.add(coin.amount);
  }
}
