import { PortableText } from '@portabletext/react';
import { articlePageName } from 'cms/product';
import { sanityFetch } from 'cms/utils/sanityFetch';
import groq from 'groq';
import { Metadata } from 'next';
import { PortableTextBlock, Slug } from 'sanity';

const articleQuery = groq`*[_type == '${articlePageName}' && slug.current == $slug][0]`;

type ArticleResponse = {
    _id: string;
    title: string;
    slug: Slug;
    body: PortableTextBlock;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = await sanityFetch<ArticleResponse>({
        query: articleQuery,
        params: { slug: params.slug },
    });

    return {
        title: article.title,
    };
}

async function Page({ params }: { params: { slug: string } }) {
    const article = await sanityFetch<ArticleResponse>({
        query: articleQuery,
        params: { slug: params.slug },
    });

    return (
        <div>
            <h1>{article.title}</h1>
            <PortableText value={article.body} />
        </div>
    );
}

export default Page;
