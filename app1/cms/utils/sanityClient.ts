import { createClient } from 'next-sanity';

export const sanityApiVersion = '2022-03-25';

const getClient = () => {
    const token = process.env.SANITY_READ_TOKEN;

    return createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
        apiVersion: sanityApiVersion,
        perspective: 'published',
        token: token,
        useCdn: false,
    });
};

export const client = getClient();
