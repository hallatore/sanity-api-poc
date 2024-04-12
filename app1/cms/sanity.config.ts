import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { CubeIcon } from '@sanity/icons'
import {visionTool} from '@sanity/vision'

import product from './product';

export default defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    basePath: '/studio',
    plugins: [structureTool(), visionTool()],
    schema: {
        types: [product],
    },
    title: 'Produktkatalog',
    icon: CubeIcon,
    
});
