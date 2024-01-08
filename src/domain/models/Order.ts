import { Article } from "./Article";

export type OrderId = string;

export type OrderList = Pick<Article, "id"> & {
    amount: number;
};

export type Order = {
    id: OrderId;
    list?: OrderList[];
    totalPriceWithoutTaxes: string;
    totalPriceWithTaxes: string;
};
