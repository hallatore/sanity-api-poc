import { Card, Select, Spinner, Text } from '@sanity/ui';
import { ExternalProduct } from 'app/api/products/route';
import groq from 'groq';
import { FormEvent, useCallback, useEffect, useState } from 'react';
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

function ProductSelector(props: StringInputProps, context: any) {
    const [selectedProduct, setSelectedProduct] = useState<
        ExternalProduct | undefined
    >(undefined);
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
            const externalProducts = jsonResponse as ExternalProduct[];

            if (!externalProducts) {
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

            const preSelectedProduct = externalProducts.find(
                (p) => p._id === value
            );
            if (preSelectedProduct) {
                setSelectedProduct(preSelectedProduct);
            }

            return externalProducts.filter(
                (product) =>
                    product._id.toString() === value ||
                    !existingProductsIds.includes(product._id.toString())
            );
        }
    );

    const handleChange = useCallback(
        (event: FormEvent<HTMLSelectElement> | undefined) => {
            const value = event?.currentTarget.value;
            if (value) {
                const product = data?.find((item) => item._id === value);
                setSelectedProduct(product);

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
        <>
            <Select onChange={handleChange} value={value}>
                <option value=""></option>
                {data.map((item) => (
                    <option key={item._id} value={item._id}>
                        {item.title}
                    </option>
                ))}
            </Select>
            {selectedProduct && (
                <div>
                    <h2>External product data</h2>
                    <h3>Title: {selectedProduct.title}</h3>
                    <p>Content: {selectedProduct.content}</p>
                    <p>Image: </p>
                    <img src={selectedProduct.image} />
                </div>
            )}
        </>
    );
}

export default ProductSelector;
