import { PRODUCT } from 'cms/product';
import { sanityFetch } from 'cms/utils/sanityFetch';
import groq from 'groq';
import { NextRequest, NextResponse } from 'next/server';

import { getUrlForImage } from './imageUtils';
import { ExternalProduct, Product } from './product.types';

const query = groq`*[_type == '${PRODUCT}'] 
{_id, title, content, image}`;

/**
 * @swagger
 * /api/test/product:
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
    console.log(products);

    const externalProducts = products.map(
        (p) =>
            <ExternalProduct>{
                _id: p._id,
                title: p.title,
                content: p.content,
                image: p.image ? getUrlForImage(p.image) : undefined,
            }
    );

    return NextResponse.json({
        message: 'Products from dataset',
        products: externalProducts,
    });
}

/**
 * @swagger
 * /api/test/product:
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
