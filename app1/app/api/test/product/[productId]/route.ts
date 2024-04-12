import { PRODUCT } from 'cms/product';
import { sanityFetch } from 'cms/utils/sanityFetch';
import groq from 'groq';
import { NextRequest, NextResponse } from 'next/server';

type Product = {
    _id: string;
    title: string;
    content: string;
};

const query = groq`*[_type == '${PRODUCT}' && _id == $id][0] 
{_id, title, content}`;

/**
 * @swagger
 * /api/test/product/{productId}:
 *   get:
 *     summary: Gets a product by id
 *     description: Returns the products if it exists
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: prods
 */

export async function GET(request: NextRequest) {
    const params = request.nextUrl.pathname.split('/');

    const product: Product = await sanityFetch<Product>({
        query: query,
        params: { id: params[params.length - 1] },
    });

    return NextResponse.json({
        message: 'Product from dataset',
        product,
    });
}
