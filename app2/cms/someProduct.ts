import { defineType } from 'sanity';

export const SOME_PRODUCT = 'someProduct';

export default defineType({
    name: SOME_PRODUCT,
    title: 'Some product',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        }
    ],
});
