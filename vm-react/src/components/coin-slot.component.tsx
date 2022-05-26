import { ICoinSlot } from "../types";

const CoinSlot = ({
  label,
  amount,
  onChange,
  onClick,
  inputDisabled,
  buttonDisabled,
}: ICoinSlot) => {
  return (
    <div>
      <label className="block">{label}</label>
      <div className="flex justify-between">
        <input
          type="number"
          className="border border-gray-400 rounded pl-2 mr-2 w-24"
          value={amount}
          onChange={onChange}
          disabled={inputDisabled}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white rounded px-5"
          onClick={onClick}
          disabled={buttonDisabled}
        >
          insert coin
        </button>
      </div>
    </div>
  );
};

export default CoinSlot;
