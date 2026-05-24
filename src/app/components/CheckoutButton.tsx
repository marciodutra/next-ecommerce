'use client';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store'; 
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type CheckoutButtonProps = {
    totalPrice: number;
};
export default function CheckoutButton({totalPrice}: CheckoutButtonProps) {
    const router = useRouter();
    const {user} = useUser();
    const cartStore = useCartStore();

    const handleCheckout = () => {
        if(!user) {
            cartStore.toogleCart();
            router.push(`/sign-in?redirectUrl='/'`);
            return;
        }
        cartStore.setCheckout('checkout')
        }

    return (
        <div className='border-t border-gray-400 my-4'>
            <p className='text-teal-600 font-bold'>
                Total: {formatPrice(totalPrice)}
            </p>
            <button onClick={handleCheckout} 
                    className='w-full rounded-md bg-teal-600 text-white py-2 mt-2'>
                Finalizar compra
            </button>
        </div>
    )
}