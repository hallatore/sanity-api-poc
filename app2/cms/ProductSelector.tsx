import { Card, Select, Spinner, Text } from '@sanity/ui';
import groq from 'groq';
import { FormEvent, useCallback } from 'react';
import { set, StringInputProps, unset } from 'sanity';
import useSWRImmutable from 'swr';

import { SOME_PRODUCT } from './someProduct';
import { client } from './utils/sanityClient';

const data = [
    { id: '1', title: 'Product 1', price: 100 },
    { id: '2', title: 'Product 2', price: 200 },
    { id: '3', title: 'Product 3', price: 300 },
];

type Product = {
    id: string;
    title: string;
    body: string;
};

function ProductSelector(props: StringInputProps) {
    const { onChange, value } = props;
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const { data, isLoading, error } = useSWRImmutable(url, async () => {
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
            { perspective: 'raw' }
        );
        const existingProductsIds = existingProducts.map(
            (product) => product.productReference
        );

        return result.filter(
            (product) =>
                product.id.toString() === value ||
                !existingProductsIds.includes(product.id.toString())
        );
    });

    const handleChange = useCallback(
        (event: FormEvent<HTMLSelectElement> | undefined) => {
            const value = event?.currentTarget.value;
            onChange(value ? set(value) : unset());
        },
        [onChange]
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
                    {item.id} {item.title}
                </option>
            ))}
        </Select>
    );
}

export default ProductSelector;
