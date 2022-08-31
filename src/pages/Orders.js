import React, { useEffect, useState } from "react";
import { Order } from "../components/ui/Order";
import { db, collection, where, onSnapshot, query } from "../firebase";

export const Orders = () => {
  //state orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), where("complete", "==", false));
    const getOrders = () => {
      onSnapshot(q, (querySnapshot) => {
        const snapshotData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setOrders(snapshotData);
      });
    };

    getOrders();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Orders</h1>
      <div className="sm:flex sm:flex-wrap -mx-3">
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};
