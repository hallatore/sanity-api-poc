import { NextRequest, NextResponse } from 'next/server'
import { createSwaggerSpec } from 'next-swagger-doc';
 
export async function GET(request: NextRequest)
{
    const spec: Record<string, any> = createSwaggerSpec({
        definition: {
          openapi: '3.0.0',
          info: {
            title: 'Next Swagger API Example',
            version: '1.0',
          },
        },
      });
    
      return NextResponse.json({
        props: {
          spec,
        },
      });
}