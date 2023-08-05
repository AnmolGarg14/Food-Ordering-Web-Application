import React from "react";
import { useEffect, useState } from "react";

const Subtotal = ({ item }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [item]);

  const totalAmount = () => {
    let cost = 0;
    item.map((items) => {
      cost += parseInt(items.price);
    });
    setPrice(cost);
  };

  return (
    <div className="text-right">
      <span className="text-lg font-bold">
        Total Amount ({item.length} items):
      </span>
      <span className="amount text-2xl font-bold ml-2 text-primary1">
        ₹{price}
      </span>
    </div>
  );
};

export default Subtotal;
