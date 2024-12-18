import Api from '../../config/Api';
import { OrderRespone, Order } from './types';

async function getOrders(): Promise<OrderRespone> {
    const response = await Api.get('order');
  
    return response.data;
};

async function getOrdersWithFilter(filter: any): Promise<OrderRespone> {
    const response = await Api.post('order/filter', filter);
  
    return response.data;
};

async function findbyId(id: string): Promise<OrderRespone> {
    const response = await Api.get(`order/${id}`);
  
    return response.data;
};

async function addNewOrder(newOrder: Order): Promise<OrderRespone> {
    const response = await Api.post(`order`, newOrder);

    return response.data;
}

async function updateOrder(newOrder: Order): Promise<OrderRespone> {
    const response = await Api.put(`order/${newOrder._id}`, newOrder);

    return response.data;
}

export default {
    getOrders,
    getOrdersWithFilter,
    updateOrder,
    addNewOrder,
    findbyId
};