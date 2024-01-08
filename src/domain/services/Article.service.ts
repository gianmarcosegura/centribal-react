import { articleRepository } from "../../infrastructure/repositories/articles.repository";
import { Article, ArticleId } from "../models/Article";

export const articleService = {
    getArticles: () => {
        return articleRepository.getArticles();
    },
    postArticle: (article: Article) => {
        return articleRepository.postArticle(article);
    },
    putArticle: (id: ArticleId, article: Article) => {
        return articleRepository.putArticle(id, article);
    },
};
