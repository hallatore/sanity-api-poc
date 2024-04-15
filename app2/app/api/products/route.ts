import { NextRequest } from 'next/server';

type ProductResponse = {
    message: string;
    products: ExternalProduct[];
};

export type ExternalProduct = {
    _id: string;
    title: string;
    content: string;
};

export async function GET(request: NextRequest) {
    const products = await getExternalProducts();

    return Response.json(
        products.map((product) => ({
            id: product._id,
            title: product.title,
        }))
    );
}

export async function getExternalProducts() {
    const response = await fetch('http://localhost:3000/api/test/product', {
        cache: 'no-cache',
    });
    const productResponse = (await response.json()) as ProductResponse;
    return productResponse.products;
}
