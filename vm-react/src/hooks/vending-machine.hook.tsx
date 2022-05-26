
import { useEffect } from 'react';
import { useState } from 'react';
import { VendingMachine, Coin } from '../../../vm-js/src';
import { VendingProduct } from '../../../vm-js/src/types';

interface VendingMachineProps {
    products: VendingProduct[],
    denoms: number[]
}

const useVendingMachine = ({ products, denoms }: VendingMachineProps) => {

    const [vm, setVm] = useState<VendingMachine | null>(new VendingMachine(products, denoms))

    return [vm]

}