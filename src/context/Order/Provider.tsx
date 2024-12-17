import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Order, OrderContextAPI } from "./types";
import OrderSerive from "./services";
import { ORDER } from "./Constain";
import { useLocation } from "react-router-dom";

const OrderContext = createContext<OrderContextAPI>({} as OrderContextAPI);

const OrderProvider: React.FC<{ children: any }> = ({ children }) => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order>(ORDER);
  const location = useLocation();

  useEffect(() => {
    if (error) setError(undefined);
  }, [location.pathname]);

  const getOrders = () => {
    setLoading(true);

    OrderSerive.getOrders()
      .then((res) => setOrders(res.data))
      .catch()
      .finally(() => setLoading(false));
  };

  const updateOrder = (newOrder: Order) => {
    setLoading(true);

    OrderSerive.updateOrder(newOrder)
      .then((res) => {
        const index = orders.findIndex((item) => item._id === newOrder._id);
        orders[index] = newOrder;
        setError(undefined);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const stringToArr = (products: string) => {
    const arr: string[] = [];
    products.split("\n").forEach((product) => {
      if (product) {
        arr.push(product);
      }
    });

    return arr;
  };

  const arrToString = (products: string[]) => {
    let str = "";

    products.forEach((product: string) => {
      if (product) {
        str = str + product + "\n";
      } else {
        str = str + product + "\n";
      }
    });

    return str;
  };

  const addNewOrder = (newOrder: Order) => {
    setLoading(true);

    OrderSerive.addNewOrder(newOrder)
      .then((res) => {
        setOrder(ORDER);
        setError(undefined);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const findById = (id: string) => {
    setLoading(true);

    OrderSerive.findbyId(id)
      .then((res) => setOrder(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const memoValue = useMemo(
    () => ({
      loading,
      error,
      getOrders,
      orders,
      order,
      setOrder,
      updateOrder,
      stringToArr,
      arrToString,
      addNewOrder,
      findById,
    }),
    [order, orders, loading, error]
  );

  return (
    <OrderContext.Provider value={memoValue}>{children}</OrderContext.Provider>
  );
};
export const useOrder = (): OrderContextAPI => useContext(OrderContext);

export default OrderProvider;
