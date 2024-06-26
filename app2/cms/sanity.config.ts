import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { BulbOutlineIcon } from '@sanity/icons'

import someProduct from './someProduct';

export default defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    basePath: '/studio',
    plugins: [structureTool()],
    schema: {
        types: [someProduct],
    },
    title: 'Demo app',
    icon: BulbOutlineIcon,
});
