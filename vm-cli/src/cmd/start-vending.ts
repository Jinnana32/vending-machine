import yargs from "yargs/yargs";
import inquirer, { Question } from "inquirer";
import { hideBin } from "yargs/helpers";
import { VendingMachine } from "../../../vm-js/src/core/vending-machine";
import { Coin } from "../../../vm-js/src/core/coin";
import { parseDenoms, parseProducts } from "../utils";

const PRODUCTS_FILE = "products_file";
const DENOMS_FILE = "denoms_file";

const argv: any = yargs(hideBin(process.argv))
  .usage("Usage: $0 -p <products> -d <denoms>")
  .option("p", {
    alias: "products_file",
    describe: "products to dispay on the vending machine",
    type: "string",
  })
  .option("d", {
    alias: "denoms_file",
    describe: "denoms to be used on the vending machine",
    type: "string",
  })
  .demandOption(["p", "d"]).argv;

async function start() {
  // parse products
  let productsFile = argv[PRODUCTS_FILE];
  let products = parseProducts(productsFile);

  // parse denoms
  let denomsFile = argv[DENOMS_FILE];
  const denoms = parseDenoms(denomsFile);

  // create new VM instance
  const vm = new VendingMachine(products, denoms);

  // ask for coins until user can buy atleast one snack
  let askToInsertCoin = {
    type: "list",
    name: "selected",
    message: "Insert a coin.",
    choices: ["$1", "$2", "50c", "20c", "10c"],
  } as Question;

  let isSufficientBalance = false;
  let coin = await inquirer.prompt([askToInsertCoin]);

  // continue asking until the user have enough money to buy
  // a choco bar.
  while (!isSufficientBalance) {
    // create an instance of a Coin to insert into the VM
    let newCoin = new Coin(coin.selected);
    vm.insertCoin(newCoin);

    console.info(`You currenctly have ${vm.coinStash} available.\n`);
    // Filter products to check whether the user can afford a choco bar
    let affordableBars = products.filter(
      (product) => product.price <= vm.coinStash.amount
    );
    if (affordableBars.length > 0) {
      let sufficientBalanceConfirm = {
        type: "confirm",
        name: "willProceed",
        message:
          "You have enough funds to buy one of the chocolate bar. Continue insert coin?",
      } as Question;
      let { willProceed } = await inquirer.prompt([sufficientBalanceConfirm]);
      if (!willProceed) {
        products = affordableBars;
        isSufficientBalance = true;
        continue;
      }
    }
    coin = await inquirer.prompt([askToInsertCoin]);
  }

  let askWhatProduct = {
    type: "list",
    name: "rawProduct",
    message: "Select a product to buy. Select `0` to exit.",
    choices: products.map(
      (product) => `${product.label} - ${product.coin?.toString()}`
    ),
  } as Question;

  console.info(`You currenctly have ${vm.coinStash} available.\n`);
  let { rawProduct } = await inquirer.prompt([askWhatProduct]);
  let product = rawProduct.split(" - ")[0];
  let vendedProduct = vm.vend(product);

  console.info(`Product slides through the bin...`);
  console.info(`Change dropping...`);
  console.log(`Here's your change ${vm.getChangeStash}`);
  console.log(`You can pick up your ${vendedProduct.label} chocolate bar`);
}

start();
