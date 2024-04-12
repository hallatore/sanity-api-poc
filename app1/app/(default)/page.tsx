
import { articlePageName } from '../../cms/articlePage';
import { sanityFetch } from '../../cms/utils/sanityFetch';
import groq from 'groq';
import { Slug } from 'sanity';

const allArticlesQuery = groq`*[_type == '${articlePageName}']{_id, title, slug}`;

type ArticlesResponse = {
    _id: string;
    title: string;
    slug: Slug;
};

async function Page() {
    const articles = await sanityFetch<ArticlesResponse[]>({
        query: allArticlesQuery,
    });

    return (
        <div>
            <h1>Articles</h1>
            <ul>
                {articles.map((article) => (
                    <li key={article._id}>
                        <a href={`/${article.slug.current}`}>{article.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Page;
