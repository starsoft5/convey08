import React, { useState } from 'react';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

interface Items {
  product: string;
  quantity: number;
  price: number;
}

interface Order {
  customerName: string;
  orderDate: string;
  items: Items[];
}

const OrderForm: React.FC = () => {
  const [order, setOrder] = useState<Order>({
    customerName: '',
    orderDate: '',
    items: [
      { product: '', quantity: 1, price: 0 }
    ]
  });

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleDetailChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDetails = [...order.items];
    newDetails[index] = {
      ...newDetails[index],
      [e.target.name]: e.target.name === 'quantity' || e.target.name === 'price'
        ? parseFloat(e.target.value) || 0
        : e.target.value
    };
    setOrder({ ...order, items: newDetails });
  };

  const addItem = () => {
    setOrder({
      ...order,
      items: [...order.items, { product: '', quantity: 1, price: 0 }]
    });
  };

  const deleteItem = (index: number) => {
    const newDetails = order.items.filter((_, i) => i !== index);
    setOrder({ ...order, items: newDetails });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/CreateOrderFunction`, order);
      alert('Order submitted successfully!');
      console.log(response.data);
    } catch (error) {
      alert('Error submitting order');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            name="customerName"
            value={order.customerName}
            onChange={handleOrderChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Order Date</label>
          <input
            type="date"
            className="form-control"
            name="orderDate"
            value={order.orderDate}
            onChange={handleOrderChange}
            required
          />
        </div>

        <h5>Order Details</h5>
        {order.items.map((detail, index) => (
          <div className="row mb-3" key={index}>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="product"
                placeholder="Product"
                value={detail.product}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                name="quantity"
                placeholder="Quantity"
                min="1"
                value={detail.quantity}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Price"
                min="0"
                step="0.01"
                value={detail.price}
                onChange={(e) => handleDetailChange(index, e)}
                required
              />
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteItem(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-secondary me-2" onClick={addItem}>
          Add Item
        </button>

        <button type="submit" className="btn btn-primary">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
