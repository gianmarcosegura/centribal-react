export type ArticleId = string;

export type Article = {
    id: ArticleId;
    name: string;
    description: string;
    priceWithoutTaxes: string;
    taxes: string;
};
