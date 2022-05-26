import { Coin } from './core/coin';
import { VendingMachine } from './core/vending-machine';

function main() {
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

  let twoDollar = new Coin("$2");
    let fiftyCents = new Coin("50c");
    vm.insertCoin(twoDollar);
    vm.insertCoin(fiftyCents);

  vm.vend('Caramel');
  console.log(`change -> vm.changeCollector`)
  let change = vm.collectChange();
  console.log(change.toString(), change.amount);
}

main();
