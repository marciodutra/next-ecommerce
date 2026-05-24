import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductType } from '@/types/ProductType';

type CartState = {
    cart: ProductType[];
    addProduct: (product: ProductType) => void;
    removeProduct: (product: ProductType) => void;
    isOpen: boolean;
    toogleCart: () => void;
    onCheckout: string;
    setCheckout: (checkoutI: string) => void;
    paymentIntent: string;
    setPaymentIntent: (paymentIntent: string) => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            addProduct: (item) =>
                set((state) => {
                    const Product = state.cart.find(
                        (p) => p.id === item.id
                    );

                    if (Product) {
                        const updatedCart = state.cart.map((p) => {
                            if (p.id === item.id) {
                                return { ...p, quantity: p.quantity ? p.quantity + 1 : 1 };
                            }

                            return p;
                        });

                        return { cart: updatedCart };
                    } else {
                        return {
                            cart: [
                                ...state.cart,
                                { ...item, quantity: 1 }
                            ]
                        };
                    }
                }),

            removeProduct: (item) =>
                set((state) => {
                    const existingProduct = state.cart.find((p) => p.id === item.id);

                    if (existingProduct && existingProduct.quantity! > 1) {
                        const updatedCart = state.cart.map((p) => {
                            if (p.id === item.id) {
                                return { ...p, quantity: p.quantity! - 1 };
                            }

                            return p;
                        });

                        return { cart: updatedCart };
                    }else{
                        const filteredCart = state.cart.filter((p) => p.id !== item.id);
                        return { cart: filteredCart };
                    }
                }),


            isOpen: false,
            toogleCart: () =>
                set((state) => ({ isOpen: !state.isOpen })),
            onCheckout: 'cart',
            setCheckout: (checkoutI) =>
                set(() => ({ onCheckout: checkoutI })),
            paymentIntent: '',
            setPaymentIntent: (paymentIntent) => set(() => ({ paymentIntent })),
        }),
        { name: 'cart-storage' }
    )
);