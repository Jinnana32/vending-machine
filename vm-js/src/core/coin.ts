export class Coin {
  public amount: number;
  constructor(amount?: string | number) {
    if (amount && typeof amount === "string") {
      if (amount.startsWith("$")) {
        this.amount = parseInt(amount.replace("$", "")) * 100;
      } else if (amount.endsWith("c")) {
        this.amount = parseInt(amount.replace("c", ""));
      } else {
        throw new Error("Invalid currency");
      }
    } else if (amount && typeof amount === "number") {
      this.amount = amount;
    } else {
      this.amount = 0;
    }
  }

  public add(amount: number) {
    this.amount += amount;
  }

  public toString() {
    if (this.amount <= 99 && this.amount > 0) {
      return `${this.amount}c`;
    }
    let convertedAmount = this.amount / 100;
    return convertedAmount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
}
