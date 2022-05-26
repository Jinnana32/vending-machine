import { useEffect, useState } from "react";
import { Coin, VendingMachine } from "../../../vm-js/src";
import { VendingProduct } from "../../../vm-js/src/types";

export type ICoinType = "dollar" | "cent";

export type VendingMachineActions =
  | "insertCoin"
  | "cancel"
  | "collect"
  | "vend"
  | "pickup";

interface VMDispatch {
  type: VendingMachineActions;
  payload: any;
}

const useVendingMachine = (
  products: VendingProduct[],
  denoms: number[]
): [
  string,
  VendingProduct[],
  Coin,
  Coin,
  VendingProduct | null,
  ({ type, payload }: VMDispatch) => void
] => {
  const [vm, setVm] = useState<VendingMachine | null>(null);

  const [vendingInstruction, setVendingInstruction] = useState<string>("");
  const [productsDisplay, setProductsDisplay] = useState<VendingProduct[]>([]);
  const [productStash, setProductStash] = useState<VendingProduct | null>(null);
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
      case "pickup":
        pickUpProduct();
        break;
      default:
        cancelTransaction();
        break;
    }
  };

  useEffect(() => {
    let vendingMachine = new VendingMachine(products, denoms);
    setVm(vendingMachine);
    setVendingInstruction(vendingMachine.getVendingInstructions);
    setProductsDisplay(vendingMachine.getProducts);
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
      setChangeStash(vm?.getChangeStash!);
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
      let vendedProduct = vm?.vend(product.label);
      setCoinStash(vm?.coinStash!);
      setChangeStash(vm?.getChangeStash!);
      setProductStash(vendedProduct!);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }

  function pickUpProduct() {
    vm?.pickUpProduct();
    setProductStash(null);
  }

  return [
    vendingInstruction,
    productsDisplay,
    coinStash,
    changeStash,
    productStash,
    dispatch,
  ];
};

export default useVendingMachine;
