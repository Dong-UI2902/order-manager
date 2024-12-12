import { User } from "../Auth";

export interface Order {
    _id?: string;
    name: string;
    address: string;
    phoneNumber: string;
    cod: number;
    products: string[];
    page?: string;
    type: string;
    deliveredBy: string | null;
    status: string;
    createdBy?: User;
    createdAt?: Date;
};

export interface OderProviderState {
    loading: boolean;
    error?: string;
    order: Order;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
    orders: Order[];
    // setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
};

export interface OrderRespone {
    success: boolean;
    message: string;
    data?: any;
};

export interface OrderContextAPI extends OderProviderState {
    getOrders: () => void;
    // addNewOrder: (order: Order) => void;
    updateOrder: (newOrder: Order) => void;
    arrToString: (products: string[]) => string;
    stringToArr: (products: string) => string[];
    addNewOrder: (newOrder: Order) => void;
    findById: (id: string) => void;
    // findByPhoneNumber: (phoneNumber: string) => void;
};