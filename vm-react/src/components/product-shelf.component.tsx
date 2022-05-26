import { Fragment } from "react";
import { VendingProduct } from "../../../vm-js/src/types";
import { IProductShelf } from "../types";

const ProductShelf = ({
  coinStash,
  products,
  onVendProduct,
}: IProductShelf) => {
  return (
    <Fragment>
      <div className="flex justify-between">
        <div>Products</div>
        <div>Your cash: {coinStash.toString()}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {products.map((product: VendingProduct, index: number) => {
          let isBuyable = false;

          if (coinStash.amount >= product.coin?.amount!) {
            isBuyable = true;
          }

          return (
            <div
              key={index}
              className={`flex flex-col justify-between text-center border border-orange-300 p-2 ${
                isBuyable ? "" : "opacity-50"
              }`}
              onClick={() => {
                if (isBuyable) {
                  onVendProduct(product);
                }
              }}
            >
              <h4 className="mb-2">{product.label}</h4>
              <p>{product.coin?.toString()}</p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ProductShelf;
