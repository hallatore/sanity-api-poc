import { IceCreamIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const PRODUCT = 'product';

export default defineType({
    name: PRODUCT,
    title: 'Product',
    type: 'document',
    icon: IceCreamIcon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'text',
            rows: 5,
        },
    ],
});
