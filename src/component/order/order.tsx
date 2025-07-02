import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [order] = useState({
    customerName: 'John Doe',
    orderDate: new Date().toISOString(),
    items: [{ product: 'Book', quantity: 1, price: 10 }]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit triggered");

    try {
      const response = await axios.post("https://starsoft.azurewebsites.net/api/CreateOrderFunction", order);
      alert('Order submitted successfully!');
      console.log(response.data);
    } catch (error) {
      alert('Error submitting order');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
};

export default OrderForm;
