'use client';

import { ProductType } from "@/types/ProductType";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Product from "./Product";
import { fetchProducts } from "../actions";

function InfiniteScroll({
    initialProducts,
}: {
    initialProducts: ProductType[];
}) {

    const [products, setProducts] =
        useState<ProductType[]>(initialProducts);

    const [hasMore, setHasMore] =
        useState<boolean>(true);

    const [isLoading, setIsLoading] =
        useState<boolean>(false);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const lastProductId =
        products[products.length - 1]?.id;

    const loadMoreProducts = useCallback(async () => {

        if (isLoading) return;

        try {

            setIsLoading(true);

            const response = await fetchProducts({
                lastProductId,
            });

            if (!response) return;

            const { formatedProducts, has_more } =
                response;

            if (formatedProducts.length > 0) {

                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...formatedProducts,
                ]);

                setHasMore(has_more);

            } else {

                setHasMore(false);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setIsLoading(false);
        }

    }, [lastProductId, isLoading]);

    useEffect(() => {

        if (inView && hasMore && !isLoading) {
            loadMoreProducts();
        }

    }, [inView, hasMore, isLoading, loadMoreProducts]);

    return (
        <>
            {products.map((product) => (
                <Product
                    key={product.id}
                    product={product}
                />
            ))}

            {hasMore && (
                <div ref={ref}>
                    {isLoading
                        ? "Carregando..."
                        : "Carregando mais produtos..."}
                </div>
            )}
        </>
    );
}

export default InfiniteScroll;