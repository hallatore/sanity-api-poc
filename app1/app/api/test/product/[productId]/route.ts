import { PRODUCT } from 'cms/product';
import { sanityFetch } from 'cms/utils/sanityFetch';
import groq from 'groq';
import { NextRequest, NextResponse } from 'next/server';

import { getUrlForImage } from '../imageUtils';
import { ExternalProduct, Product } from '../product.types';

const query = groq`*[_type == '${PRODUCT}' && _id == $id][0] 
{_id, title, content, image}`;

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

    const externalProduct: ExternalProduct = {
        _id: product._id,
        title: product.title,
        content: product.content,
        image: product.image ? getUrlForImage(product.image) : undefined,
    };

    return NextResponse.json({
        message: 'Product from dataset',
        product: externalProduct,
    });
}
