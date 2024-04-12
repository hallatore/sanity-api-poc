import { Metadata } from 'next';
import { PortableTextBlock, Slug } from 'sanity';

type ArticleResponse = {
    _id: string;
    title: string;
    slug: Slug;
    body: PortableTextBlock;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {

    return {
        title: "hello",
    };
}

async function Page({ params }: { params: { slug: string } }) {

    return (
        <div>
            <h1>hei heifsdfsdf</h1>
        </div>
    );
}

export default Page;
