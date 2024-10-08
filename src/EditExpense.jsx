// src/EditExpense.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditExpense = ({ updateExpense }) => {
  const { state } = useLocation();
  const { expense, index } = state || {};
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setDescription(expense.description);
      setDate(expense.date);
      setCategory(expense.category);
      setPaymentMethod(expense.paymentMethod);
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedExpense = {
      amount: parseFloat(amount),
      description,
      date,
      category,
      paymentMethod,
    };

    updateExpense(index, updatedExpense);
    toast.success('Expense updated successfully!');
    navigate('/view-expenses');
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow">
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount:</label>
            <input type="text" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date:</label>
            <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">Payment Method:</label>
            <select className="form-select" id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="cash">Cash</option>
              <option value="creditCard">Credit Card</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Update Expense</button>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
