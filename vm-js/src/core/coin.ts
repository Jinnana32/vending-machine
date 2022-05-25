export class Coin {
  public amount: number;
  constructor(amount?: string) {
    if (amount) {
      if (amount.startsWith("$")) {
        this.amount = parseInt(amount.replace("$", "")) * 100;
      } else if (amount.endsWith("c")) {
        this.amount = parseInt(amount.replace("c", ""));
      } else {
        throw new Error("Invalid currency");
      }
    } else {
      this.amount = 0;
    }
  }

  public add(amount: number) {
    this.amount += amount;
  }

  public toString() {
    let convertedAmount = this.amount / 100;
    return convertedAmount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
}
