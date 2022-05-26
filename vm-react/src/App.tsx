import { ChangeEvent, useState } from "react";

import { VendingProduct } from "../../vm-js/src/types";
import useVendingMachine from "../../vm-js/src/hooks/vending-machine.hook";

import CoinSlot from "./components/coin-slot.component";
import ChangeStash from "./components/change-stash.component";
import ProductShelf from "./components/product-shelf.component";

import productsData from "./data/products.data";
import denomData from "./data/denom.data";

function App() {
  const [vm, coinStash, changeStash, productStash, dispatch] =
    useVendingMachine(productsData, denomData);
  const [dollar, setDollar] = useState<number>(0);
  const [cent, setCent] = useState<number>(0);
  const minCent = 0;
  const maxCent = 99;

  const onCentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      minCent,
      Math.min(maxCent, parseInt(event.target.value))
    );
    setCent(value);
  };

  const onDollarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setDollar(value);
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
            label={"dollar ($)"}
            amount={dollar}
            onChange={onDollarChange}
            onClick={() => {
              dispatch({
                type: "insertCoin",
                payload: { amount: dollar, coinType: "dollar" },
              });
              setDollar(0);
            }}
            inputDisabled={cent > 0}
            buttonDisabled={dollar <= 0 || productStash !== null}
          />
          <CoinSlot
            label={"cents (c)"}
            amount={cent}
            onChange={onCentChange}
            onClick={() => {
              dispatch({
                type: "insertCoin",
                payload: { amount: cent, coinType: "cent" },
              });
              setCent(0);
            }}
            inputDisabled={dollar > 0}
            buttonDisabled={cent <= 0 || productStash !== null}
          />

          {coinStash.amount > 0 && (
            <button
              type="button"
              className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
              onClick={() => dispatch({ type: "cancel", payload: null })}
            >
              Cancel
            </button>
          )}

          <ChangeStash
            changeStash={changeStash}
            collectDisabled={changeStash.amount <= 0 || productStash !== null}
            collectStash={() => dispatch({ type: "collect", payload: null })}
          />
        </div>
        <div className="pl-5 w-full">
          <ProductShelf
            products={vm?.getProducts}
            coinStash={coinStash}
            productStash={productStash}
            pickSnack={() => dispatch({ type: "pickup", payload: null })}
            onVendProduct={(product: VendingProduct) =>
              dispatch({ type: "vend", payload: { product } })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
