import { useState, useEffect } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();

                // Clean data: some Platzi images come as strings of arrays due to API eccentricities
                const cleanedData = data.map(product => {
                    let images = product.images;
                    if (typeof images[0] === 'string' && images[0].startsWith('["')) {
                        try {
                            images = JSON.parse(images[0]);
                        } catch (e) {
                            // Fallback if parse fails
                        }
                    }
                    return { ...product, images };
                });

                setProducts(cleanedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useProducts;
