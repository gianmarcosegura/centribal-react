import { ArticleId } from "./../../domain/models/Article";
import { Article } from "../../domain/models/Article";
import { http } from "../http/http";

export const articleRepository = {
    getArticles: async () => {
        const articles = await http.get<Article[]>(
            "http://localhost:4000/articles",
        );
        return articles.map(
            (articleDto): Article => ({
                id: articleDto.id,
                name: articleDto.name,
                description: articleDto.description,
                priceWithoutTaxes: articleDto.priceWithoutTaxes,
                taxes: articleDto.taxes,
            }),
        );
    },
    postArticle: async (article: Article) => {
        return await http.post(
            "http://localhost:4000/articles",
            JSON.stringify(article),
        );
    },
    putArticle: async (id: ArticleId, article: Article) => {
        return await http.put(
            `http://localhost:4000/articles/${id}`,
            JSON.stringify(article),
        );
    },
};
