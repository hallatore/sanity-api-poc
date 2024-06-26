import { SOME_PRODUCT } from 'cms/schemaNames';
import { client } from 'cms/utils/sanityClient';
import groq from 'groq';
import NextImage from 'next/image';

import { ExternalProduct, getExternalProducts } from './api/products/route';

import styles from './page.module.css';

type SanityProduct = {
    productReference: string | undefined;
    metadata: string | undefined;
    isPromoted: boolean;
};
type Product = ExternalProduct & Omit<SanityProduct, 'productReference'>;

async function getProducts(): Promise<Product[] | undefined> {
    const products = await getExternalProducts();
    const productMetadata = await client.fetch<SanityProduct[]>(
        groq`*[_type == '${SOME_PRODUCT}']{ productReference, metadata, isPromoted }`,
        {},
        {
            cache: 'no-cache',
        }
    );

    return products.map((product) => {
        const metadata = productMetadata.find(
            (meta) => meta.productReference === product._id
        );
        return {
            ...product,
            metadata: metadata?.metadata,
            isPromoted: metadata?.isPromoted ?? false,
        };
    });
}

async function Page() {
    const products = await getProducts();

    if (!products) {
        return <div>Loading...</div>;
    }

    console.log('page.tsx, products: ', products);

    return (
        <div style={{ margin: '20px' }}>
            <h1>Produkter</h1>
            <ul className={styles.productList}>
                {products.map((product) => (
                    <li
                        key={product._id}
                        className={`${product.isPromoted ? styles.promoted : ''}`}
                    >
                        <h2>{product.title}</h2>
                        <p>{product.content}</p>
                        {product.metadata && (
                            <p className={styles.metadata}>
                                {product.metadata}
                            </p>
                        )}
                        {product.image && (
                            <NextImage
                                src={product.image}
                                alt=""
                                width={250}
                                height={160}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Page;
