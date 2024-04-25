import createImageUrlBuilder from '@sanity/image-url';
import { Image } from 'sanity';

export const imageBuilder = createImageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
});

export const getUrlForImage = (image: Image) => {
    return imageBuilder
        .image(image)
        .auto('format')
        .fit('max')
        .quality(85)
        .url();
};
