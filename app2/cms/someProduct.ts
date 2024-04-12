import groq from 'groq';
import { defineField, defineType, Reference, ValidationContext } from 'sanity';

import ProductSelector from './ProductSelector';
import { client, sanityApiVersion } from './utils/sanityClient';

export const SOME_PRODUCT = 'someProduct';

export default defineType({
    name: SOME_PRODUCT,
    title: 'Some product',
    type: 'document',
    fields: [
        defineField({
            name: 'productReference',
            title: 'Produktkatalog produkt',
            type: 'string',
            validation: (Rule) =>
                Rule.required().custom(
                    async (
                        value: string | undefined,
                        context: ValidationContext
                    ) => {
                        const client = context.getClient({
                            apiVersion: sanityApiVersion,
                        });
                        const docs = await client.fetch(
                            groq`*[_type == '${SOME_PRODUCT}' && _id != $id && _id != 'drafts.' + $id && productReference == $value]`,
                            {
                                id: context.document?._id.replace(
                                    'drafts.',
                                    ''
                                ),
                                value,
                            },
                            { perspective: 'raw' }
                        );
                        return docs.length > 0 ? 'Value is not unique' : true;
                    }
                ),
            components: {
                input: ProductSelector,
            },
        }),
        defineField({
            name: 'metadata',
            title: 'Metadata',
            type: 'string',
        }),
    ],
});
