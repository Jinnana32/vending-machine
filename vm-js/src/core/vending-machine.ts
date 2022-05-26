import { VendingProduct } from "../types";
import { Coin } from "./coin";
export class VendingMachine {
  public coinStash: Coin;
  public changeCollector: number;

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
    this.coinStash = new Coin();
    this.changeCollector = 0;
  }

  public insertCoin(coin: Coin): void {
    // check if coin exist in the denoms
    if (!this.isInDenoms(coin)) {
      throw new Error("Please insert coin in the denominations.");
    }

    this.coinStash.add(coin.amount);
  }

  public vend(selectedProduct: string): void {
    let product = this.products.find(
      (product) => product.label.toLowerCase() === selectedProduct.toLowerCase()
    );

    if (!product) {
      throw new Error("Please select a product that is within the menu.");
    }

    if (product.price > this.coinStash.amount) {
      throw new Error("You have insufficient funds.");
    }

    let coinChange = this.coinStash.amount - product.price;
    this.coinStash = new Coin();
    this.changeCollector += coinChange;
  }

  public collectChange() : Coin {
    let change: Coin = new Coin(this.changeCollector);
    this.changeCollector = 0;
    return change;
  }

  public isInDenoms(coin: Coin): boolean {
    return this.denoms.indexOf(coin.amount) !== -1;
  }

  public cancelTransaction() {
    this.changeCollector = this.coinStash.amount;
    this.coinStash = new Coin();
  }
}
