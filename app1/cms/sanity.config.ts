import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import product from './product';

export default defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    basePath: '/studio',
    plugins: [structureTool()],
    schema: {
        types: [product],
    },
});
