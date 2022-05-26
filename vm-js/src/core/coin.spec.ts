import { Coin } from "./coin";

describe("Coin", () => {
  it("should accept valid currency", () => {
    let coins = ["$1", "50c"];
    let expected = [
      { amount: 100, stringValue: "$1.00" },
      { amount: 50, stringValue: "$0.50" },
    ];
    coins.forEach((coin, index) => {
      let newCoin = new Coin(coin);
      expect(newCoin.amount).toBe(expected[index].amount);
      expect(newCoin.toString()).toBe(expected[index].stringValue);
    });
  });
  it("should not accept invalid dollar currency", () => {
    let invalidCurrency = "132$312";
    const invalidCoin = () => {
      let coin = new Coin(invalidCurrency);
    };
    expect(invalidCoin).toThrow(Error);
    expect(invalidCoin).toThrow("Invalid currency");
  });
});
