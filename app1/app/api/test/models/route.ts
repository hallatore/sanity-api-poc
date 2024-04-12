import { sanityFetch } from 'cms/utils/sanityFetch';
import groq from 'groq';
import { NextRequest, NextResponse } from 'next/server'

interface Product {
    _id: string
};

const query = groq`*[_type == 'someProduct']`;

/**
 * @swagger
 * /api/test/models:
 *   get:
 *     description: Returns some products
 *     responses:
 *       200:
 *         description: prods
 */

export async function GET(request: NextRequest)
{
    const modelList = await sanityFetch<Product[]>({
        query: query,
    });

    if (! modelList) {
        return NextResponse.error();
    }

  return NextResponse.json({
    message: 'someProducts from dataset',
    modelList
  });
}