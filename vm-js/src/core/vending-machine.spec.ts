import { Coin } from "./coin";
import { VendingMachine } from "./vending-machine";

describe("Vending Machine", () => {
  let products = [
    {
      label: "Caramel",
      price: 250,
    },
    {
      label: "Hazelnut",
      price: 310,
    },
    {
      label: "Organic Raw",
      price: 200,
    },
  ];
  let denoms = [100, 200, 50, 20, 10];
  let vm = new VendingMachine(products, denoms);

  it("should accept amount listed in denominations", () => {
    let oneDollar = "$1";
    let coin = new Coin(oneDollar);
    vm.insertCoin(coin);
    expect(vm.coinStash.amount).toBe(100);
    expect(vm.coinStash.toString()).toBe(coin.toString());

    vm.cancelTransaction();
    vm.collectChange();
  });
  it("should not accept amount not listed in denominations", () => {
    let fiveDollar = "$5";
    let coin = new Coin(fiveDollar);

    const insertCoinError = () => {
      vm.insertCoin(coin);
    };

    expect(insertCoinError).toThrow(Error);
    expect(insertCoinError).toThrow("Please insert coin in the denominations.");
  });

  it("should vend if money is sufficient", () => {
    let twoDollar = new Coin("$2");
    let fiftyCents = new Coin("50c");
    vm.insertCoin(twoDollar);
    vm.insertCoin(fiftyCents);

    const vendProduct = () => {
      vm.vend('Caramel');
    }
    expect(vendProduct).not.toThrow(Error);

    let change = vm.collectChange();
    expect(change.amount).toBe(0);
  });

  it("should not vend if money is insufficient", () => {
    let twoDollar = new Coin("$2");
    vm.insertCoin(twoDollar);

    const vendProduct = () => {
      console.log(vm.coinStash);
      vm.vend('Caramel');
    }
    expect(vendProduct).toThrow(Error);
  });
});
