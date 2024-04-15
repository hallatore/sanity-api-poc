import { Card, Select, Spinner, Text } from '@sanity/ui';
import groq from 'groq';
import { FormEvent, useCallback } from 'react';
import {
    FormDocumentValue,
    PatchEvent,
    set,
    StringInputProps,
    unset,
    useDocumentOperation,
    useFormValue,
} from 'sanity';
import useSWRImmutable from 'swr';

import { SOME_PRODUCT } from './schemaNames';
import { client } from './utils/sanityClient';

type Product = {
    id: string;
    title: string;
};

function ProductSelector(props: StringInputProps, context: any) {
    const { onChange, value, path } = props;
    const url = '/api/products';

    const parent = useFormValue(path.slice(0, -1)) as FormDocumentValue;
    const { patch } = useDocumentOperation(
        parent._id.replace('drafts.', ''),
        parent._type
    );

    const { data, isLoading, error } = useSWRImmutable(
        url + value,
        async () => {
            const response = await fetch(url);
            const jsonResponse = await response.json();
            const result = jsonResponse as Product[];

            if (!result) {
                return [];
            }

            const existingProducts = await client.fetch<
                { productReference: string }[]
            >(
                groq`*[_type == '${SOME_PRODUCT}']{ productReference }`,
                {},
                { perspective: 'raw', cache: 'no-cache' }
            );
            const existingProductsIds = existingProducts.map(
                (product) => product.productReference
            );

            return result.filter(
                (product) =>
                    product.id.toString() === value ||
                    !existingProductsIds.includes(product.id.toString())
            );
        }
    );

    const handleChange = useCallback(
        (event: FormEvent<HTMLSelectElement> | undefined) => {
            const value = event?.currentTarget.value;
            if (value) {
                const product = data?.find((item) => item.id === value);

                patch.execute([
                    { set: { name: product?.title, productReference: value } },
                ]);
            } else {
                patch.execute([
                    { set: { name: undefined, productReference: undefined } },
                ]);
            }
            //onChange(value ? set(value) : unset());
        },
        [onChange, data]
    );

    if (error)
        return (
            <Card tone="critical">
                <Text>Failed to fetch products</Text>
            </Card>
        );

    if (!data)
        return (
            <Card tone="default">
                <Spinner />
            </Card>
        );

    return (
        <Select onChange={handleChange} value={value}>
            <option value=""></option>
            {data.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.title}
                </option>
            ))}
        </Select>
    );
}

export default ProductSelector;
