import { IceCreamIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const PRODUCT = 'product';

export default defineType({
    name: PRODUCT,
    title: 'Product',
    type: 'document',
    icon: IceCreamIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Product image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
});
