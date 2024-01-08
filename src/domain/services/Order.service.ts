import { orderRepository } from "../../infrastructure/repositories/orders.repository";
import { Order, OrderId } from "../models/Order";

export const orderService = {
    getOrders: () => {
        return orderRepository.getOrders();
    },
    postOrder: (order: Order) => {
        return orderRepository.postOrder(order);
    },
    putOrder: (id: OrderId, order: Order) => {
        return orderRepository.putOrder(id, order);
    },
};
