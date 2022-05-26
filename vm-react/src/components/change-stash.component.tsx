import { IChangeStash } from "../types";

const ChangeStash = ({ changeStash, collectStash }: IChangeStash) => {
  return (
    <div className="mt-10 bg-gray-600 p-4 rounded text-white">
      <h3>Change stash:</h3>
      <div>{changeStash.toString()}</div>
      <button
        type="button"
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded"
        onClick={collectStash}
      >
        Collect
      </button>
    </div>
  );
};

export default ChangeStash;
