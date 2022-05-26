## Starting the Vending Machine

Install dependencies, then run:

```bash
npm run start-vending -- -p products.txt -d denoms.txt
```

This will spin off an instance of the Vending Machine.

The `-p` flag is to specify that the products data will be taken from the products.txt file

The product.text has the following format:

    <product_name>,<product_price>

The `-d` flag is to specify the denominations taken from the denoms.txt

The denoms can accept additional items and is computed in hundreds for the dollar and 0-99 for the cents.

eg.
100 -> $1
200 -> $2
50 -> 50c
20 -> 20c
10 -> 10c
