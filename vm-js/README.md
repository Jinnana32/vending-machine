# vm-js

The core library that implements the vending machine.

`vm-js/src/core/vending-machine.ts`
Vending Machine class is a simple implementation of a real world vending machine. It have the functionalities to:

1. Accept coin
2. Vend a product (Choco bar in this instance)
3. Collect change
4. Cancel transaction
5. Pick up product

# Hooks

vm-js comes with it's own custom hooks that can be used to build the frontend using React. It exposes several states and a dispatch by array destructuring.

[vm, coinStash, changeStash, productStash, dispatch]

`dispatch` method allows the user to invoke vm functionality without needing directly interact with the core module.

Available action types:

1. `insertCoin`
2. `cancel`
3. `collect`
4. `vend`
5. `pickup`

# Test

To run the test,

```bash
npm run test
```
