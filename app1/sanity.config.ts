import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import articlePage from './cms/articlePage';

export default defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    basePath: '/studio',
    plugins: [structureTool()],
    schema: {
        types: [articlePage],
    },
});
