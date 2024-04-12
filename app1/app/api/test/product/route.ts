import { PRODUCT } from 'cms/product';
import { sanityFetch } from 'cms/utils/sanityFetch';
import groq from 'groq';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

type Product = {
    _id: string;
    title: string;
    content: string;
};

const query = groq`*[_type == '${PRODUCT}'] 
{_id, title, content}`;

/**
 * @swagger
 * /api/test/products:
 *   get:
 *     summary: Gets some products
 *     description: Returns some products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: prods
 */

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;

    console.log(request.nextUrl.searchParams);

    const products: Product[] = await sanityFetch<Product[]>({
        query: query,
    });

    if (!products) {
        return NextResponse.error();
    }

    return NextResponse.json({
        message: 'Products from dataset',
        products,
    });
}

/**
 * @swagger
 * /api/test/products:
 *   post:
 *     summary: does nothing
 *     description: does nothing. amazing
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: you did it
 */

export async function POST(request: NextRequest) {
    return NextResponse.json({
        message: 'congrats',
    });
}
