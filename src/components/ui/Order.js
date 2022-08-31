import React, { useState } from "react";
import { db, doc, updateDoc } from "../../firebase";

export const Order = ({ order: orders }) => {
  const [timeDelivery, setTimeDelivery] = useState(0);
  const { order } = orders;

  // Define time to delivery
  const defineTime = async (id) => {
    try {
      const docRef = doc(db, "orders", id);
      await updateDoc(docRef, {
        timeDelivery,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // order state completed
  const completedOrder = async (id) => {
    try {
      const docRef = doc(db, "orders", id);
      await updateDoc(docRef, {
        complete: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-600 text-lg font-bold">{orders.id}</h1>
        {order.map((saucer) => (
          <p key={saucer.id} className="text-gray-600">
            {saucer.amount} {saucer.name}
          </p>
        ))}
        <p className="text-gray-700 font-bold">Total to pay: ${orders.total}</p>
        {orders.timeDelivery === 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time of delivery
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="20"
              placeholder="20"
              value={timeDelivery}
              onChange={(e) => setTimeDelivery(parseInt(e.target.value))}
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              onClick={() => defineTime(orders.id)}
            >
              Set Time
            </button>
          </div>
        )}
        {orders.timeDelivery > 0 && (
          <p className="text-gray-700">
            Time delivery{" "}
            <span className="font-bold">{orders.timeDelivery} minutes</span>
          </p>
        )}
        {!orders.complete && orders.timeDelivery > 0 && (
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
            onClick={() => completedOrder(orders.id)}
          >
            mark as done
          </button>
        )}
      </div>
    </div>
  );
};
