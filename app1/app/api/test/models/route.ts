import { sanityFetch } from 'cms/utils/sanityFetch';
import groq from 'groq';
import { NextRequest, NextResponse } from 'next/server'
import { PRODUCT } from 'cms/product';

type Product =  {
    _id: string;
    title: string;
    content: string;
};

const query = groq`*[_type == '${PRODUCT}'] 
{_id, title, content}`;

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
    const products : Product[] = await sanityFetch<Product[]>({
        query: query,
    });

    if (!products) {
        return NextResponse.error();
    }

  return NextResponse.json({
    message: 'Products from dataset',
    products
  });
}

/**
 * @swagger
 * /api/test/models:
 *   post:
 *     description: does nothing. amazing
 *     responses:
 *       200:
 *         description: you did it
 */

export async function POST(request: NextRequest) {
    console.log("hei");

    return NextResponse.json({
        message: 'congrats'
      });
}