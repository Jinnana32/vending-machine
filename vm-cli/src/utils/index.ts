import { readFileSync } from "node:fs";
import { VendingProduct } from "../../../vm-js/src/types";

export function parseProducts(filePath: string): VendingProduct[] {
  let products = parseFile(filePath).map((item) => {
    let product = item.split(",");
    return {
      label: product[0],
      price: Number(product[1]),
    } as VendingProduct;
  });
  return products;
}

export function parseDenoms(filePath: string): number[] {
  let denoms = parseFile(filePath).map((item) => {
    return Number(item);
  });
  return denoms;
}

export function parseFile(filePath: string): string[] {
  let fileContents = readFileSync(`../${filePath}`, "utf8")
    .split("\n")
    .filter((txt) => txt !== "" && txt !== null && txt !== undefined);
  return fileContents;
}
