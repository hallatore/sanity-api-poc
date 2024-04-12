import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: 'app/api/',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Endepunker for å henge greier fra Sanity',
                version: '1.0',
            },
            components: {},
            security: [],
        },
    });
    return spec;
};
