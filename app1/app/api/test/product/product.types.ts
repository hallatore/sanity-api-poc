import { Image } from 'sanity';

export type Product = {
    _id: string;
    title: string;
    content: string;
    image?: Image;
};

export type ExternalProduct = {
    _id: string;
    title: string;
    content: string;
    image?: string;
};
