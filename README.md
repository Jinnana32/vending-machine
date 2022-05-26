# vending-machine
State-of-the-art vending  machine to be rolled out to all public schools in Australia.

# vm-js

Contains the core module of the vending machine. This module includes:

1. Vending Machine Class
2. Coin Class
3. Vending Machine hook

`Vending Machine Class` - contains the necessary functions to operate the a vending machine

`Coin Class` - utility class that makes it easy to operate the vending machine by doing the computations for the curreny.

`Vending Machine hook` - a react custom hook that extends the usage of vm-js in form of a hook. This helps the frontend to implement VM faster and much easier.

# vm-react

Is the implementation of vm-js in the frontend. This project is the user friendly version of the vending machine, it has the UI to interact with the VM and contains an example of the usage of the vm hooks.

# vm-cli

Example implementation of vm-js in the command line.