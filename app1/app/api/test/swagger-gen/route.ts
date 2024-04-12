import { createSwaggerSpec } from 'next-swagger-doc';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const spec: Record<string, any> = createSwaggerSpec({
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Endepunkter for å hente data fra Sanity',
                version: '2.0',
            },
        },
    });

    return NextResponse.json({
        props: {
            spec,
        },
    });
}
