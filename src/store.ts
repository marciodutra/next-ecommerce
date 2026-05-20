import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { ProductType } from '@/types/ProductType';

type CartState = {
    cart: ProductType[];
    addProduct: (product: ProductType) => void;
    // removeProduct: (productId: number) => void;
    isOpen: boolean;
    toogleCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            addProduct: (product) =>
                set((state) => {
                    const existingProduct = state.cart.find(
                        (p) => p.id === product.id
                    );

                    if (existingProduct) {
                        const updatedCart = state.cart.map((p) => {
                            if (p.id === product.id) {
                                return { ...p, quantity: +1 };
                            }

                            return p;
                        });

                        return { cart: updatedCart };
                    } else {
                        return {
                            cart: [
                                ...state.cart,
                                { ...product, quantity: 1 }
                            ]
                        };
                    }
                }),

            isOpen: false,
            toogleCart: () =>
                set((state) => ({ isOpen: !state.isOpen })),
        }),
        { name: 'cart-storage' }
    )
);