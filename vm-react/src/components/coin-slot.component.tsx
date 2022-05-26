import { FC } from "react";
import { Fragment } from "react";
import { ICoinSlot } from "../types";

const CoinSlot: FC<ICoinSlot> = ({
  dollar,
  setDollar,
  cent,
  setCent,
  insertCoin,
}: ICoinSlot) => {
  return (
    <Fragment>
      <div>
        <label htmlFor="dollar" className="block">
          dollar ($)
        </label>
        <div className="flex justify-between">
          <input
            type="number"
            className="border border-gray-400 rounded pl-2 mr-2 w-24"
            value={dollar}
            onChange={(e) => setDollar(parseInt(e.target.value))}
            disabled={cent > 0}
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white rounded px-5"
            onClick={insertCoin}
          >
            insert coin
          </button>
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor="cents" className="block">
          cents (c)
        </label>
        <div className="flex justify-between">
          <input
            type="number"
            className="border border-gray-400 rounded pl-2 mr-2 w-24"
            value={cent}
            onChange={(e) => setCent(parseInt(e.target.value))}
            disabled={dollar > 0}
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white rounded px-5"
            onClick={insertCoin}
          >
            insert coin
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CoinSlot;
