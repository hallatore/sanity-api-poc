import 'server-only';

import { draftMode } from 'next/headers';
import { QueryParams } from 'sanity';

import { client } from './sanityClient';

export const token = process.env.SANITY_READ_TOKEN;

const getDraftsMode = () => {
    try {
        return draftMode().isEnabled;
    } catch (e) {
        return false;
    }
};

export const sanityFetch = async <QueryResponse>({
    query,
    params = {},
}: {
    query: string;
    params?: QueryParams;
}): Promise<QueryResponse> => {
    const isDraftMode = getDraftsMode();

    if (client.config().token === undefined) {
        throw new Error('Sanity token missing! Is environment variable SANITY_READ_TOKEN set?');
    }

    return await client.withConfig({ useCdn: false }).fetch<QueryResponse>(query, params, {
        ...(isDraftMode && {
            perspective: 'previewDrafts',
        }),
        next: {
            revalidate: 10,
        },
    });
};
