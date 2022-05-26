import { useEffect, useState } from "react";
import { Coin, VendingMachine } from "../../../vm-js/src";
import { VendingProduct } from "../../../vm-js/src/types";

export type ICoinType = "dollar" | "cent";

export type VendingMachineActions =
  | "insertCoin"
  | "cancel"
  | "collect"
  | "vend";

interface VMDispatch {
  type: VendingMachineActions;
  payload: any;
}

const useVendingMachine = (
  products: VendingProduct[],
  denoms: number[]
): [
  VendingMachine | null,
  Coin,
  Coin,
  ({ type, payload }: VMDispatch) => void
] => {
  const [vm, setVm] = useState<VendingMachine | null>(null);
  const [coinStash, setCoinStash] = useState<Coin>(new Coin());
  const [changeStash, setChangeStash] = useState<Coin>(new Coin());

  const dispatch = ({ type, payload }: VMDispatch) => {
    switch (type) {
      case "insertCoin":
        let { amount, coinType } = payload;
        insertCoin(amount, coinType);
        break;
      case "vend":
        let { product } = payload;
        vendProduct(product);
        break;
      case "collect":
        collectStash();
        break;
      default:
        cancelTransaction();
        break;
    }
  };

  useEffect(() => {
    let vendingMachine = new VendingMachine(products, denoms);
    setVm(vendingMachine);
    return () => {
      setVm(null);
    };
  }, []);

  function insertCoin(amount: number, coinType: ICoinType) {
    try {
      if (vm && coinType === "dollar" && amount > 0) {
        let dollarCoin = new Coin(`$${amount}`);
        vm.insertCoin(dollarCoin);
      }
      if (vm && coinType === "cent" && amount > 0) {
        let centCoin = new Coin(`${amount}c`);
        vm.insertCoin(centCoin);
      }
      setCoinStash(vm?.coinStash!);
    } catch (error) {
      console.error(`Error inserting coin: ${error}`);
      alert(error);
    }
  }

  function cancelTransaction() {
    vm?.cancelTransaction();
    setCoinStash(vm?.coinStash!);
    setChangeStash(vm?.getChangeStash!);
  }

  function collectStash() {
    let change = vm?.collectChange();
    setChangeStash(vm?.getChangeStash!);
    alert(`You collected ${change?.toString()}`);
  }

  function vendProduct(product: VendingProduct) {
    try {
      vm?.vend(product.label);
      setCoinStash(vm?.coinStash!);
      setChangeStash(vm?.getChangeStash!);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }

  return [vm, coinStash, changeStash, dispatch];
};

export default useVendingMachine;
