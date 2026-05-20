import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { ProductType } from '@/types/ProductType';

type CartState = {
    cart: ProductType[];
    // addToCart: (product: ProductType) => void;
    // removeFromCart: (productId: number) => void;
    isOpen: boolean;
    toogleCart: () => void;
}    
export const useCartStore = create<CartState>()(
    persist((set) => ({
        cart: [],
        isOpen: false,
        toogleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }), { name: 'cart-storage'} )
)