import { useEffect, useState } from "react";
import "./App.css";
import { VendingMachine, Coin } from "../../vm-js/src";
import { VendingProduct } from "../../vm-js/src/types";
import CoinSlot from "./components/coin-slot.component";
import ChangeStash from "./components/change-stash.component";
import ProductShelf from "./components/product-shelf.component";

function App() {
  let rawProducts = [
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

  const [vm, setVm] = useState<VendingMachine | null>(null);
  const [coinStash, setCoinStash] = useState<Coin>(new Coin());
  const [changeStash, setChangeStash] = useState<Coin>(new Coin());
  const [products, setProducts] = useState<VendingProduct[]>([]);
  const [dollar, setDollar] = useState<number>(0);
  const [cent, setCent] = useState<number>(0);

  useEffect(() => {
    let vendingMachine = new VendingMachine(rawProducts, denoms);
    setVm(vendingMachine);
    setProducts(vendingMachine.getProducts);
    return () => {
      setVm(null);
    };
  }, []);

  const insertCoin = () => {
    try {
      if (vm && dollar > 0) {
        let dollarCoin = new Coin(`$${dollar}`);
        vm.insertCoin(dollarCoin);
      }

      if (vm && cent > 0) {
        let centCoin = new Coin(`${cent}c`);
        vm.insertCoin(centCoin);
      }
      setCoinStash(vm?.coinStash!);
    } catch (error) {
      console.error(error);
      alert(error);
    }

    setDollar(0);
    setCent(0);
  };

  const cancelTransaction = () => {
    vm?.cancelTransaction();
    setCoinStash(vm?.coinStash!);
    setChangeStash(vm?.getChangeStash!);
  };

  const collectStash = () => {
    let change = vm?.collectChange();
    setChangeStash(vm?.getChangeStash!);
    alert(`You collected ${change?.toString()}`);
  };

  const onVendProduct = (product: VendingProduct) => {
    try {
      vm?.vend(product.label);
      setCoinStash(vm?.coinStash!);
      setChangeStash(vm?.getChangeStash!);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <div className="w-4/6 mx-auto mt-24 p-10 border border-gray-300 rounded">
      <h3 className="text-center mb-2 text-2xl">Vending Machine</h3>
      <p className="text-center text-gray-600 text-sm mb-5">
        {vm && vm.getVendingInstructions}
      </p>
      <div className="flex">
        <div className="w-96">
          <CoinSlot
            dollar={dollar}
            cent={cent}
            setDollar={setDollar}
            setCent={setCent}
            insertCoin={insertCoin}
          />

          {coinStash.amount > 0 && (
            <button
              type="button"
              className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
              onClick={cancelTransaction}
            >
              Cancel
            </button>
          )}

          <ChangeStash changeStash={changeStash} collectStash={collectStash} />
        </div>
        <div className="pl-5 w-full">
          <ProductShelf
            products={products}
            coinStash={coinStash}
            onVendProduct={onVendProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
