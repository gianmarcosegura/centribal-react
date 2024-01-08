import { http } from "../http/http";
import { Order, OrderId } from "../../domain/models/Order";

export const orderRepository = {
    getOrders: async () => {
        const orders = await http.get<Order[]>("http://localhost:4000/orders");
        return orders.map(
            (orderDto): Order => ({
                id: orderDto.id,
                list: orderDto.list,
                totalPriceWithoutTaxes: orderDto.totalPriceWithoutTaxes,
                totalPriceWithTaxes: orderDto.totalPriceWithTaxes,
            }),
        );
    },
    postOrder: async (order: Order) => {
        return await http.post(
            "http://localhost:4000/orders",
            JSON.stringify(order),
        );
    },
    putOrder: async (id: OrderId, order: Order) => {
        return await http.put(
            `http://localhost:4000/orders/${id}`,
            JSON.stringify(order),
        );
    },
};
