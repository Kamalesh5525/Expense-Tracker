// src/ExpenseForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ExpenseForm = ({ addExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid number greater than zero for the amount.');
      return;
    }
    if (!description) {
      setError('Please enter a description.');
      return;
    }
    if (!date) {
      setError('Please enter a valid date.');
      return;
    }
    if (!category) {
      setError('Please enter a category.');
      return;
    }

    const newExpense = {
      amount: parseFloat(amount),
      description,
      date,
      category,
      paymentMethod,
    };

    addExpense(newExpense);
    toast.success('Expense added successfully!');

    setAmount('');
    setDescription('');
    setDate('');
    setCategory('');
    setPaymentMethod('cash');
    navigate('/view-expenses');
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Add Expense</h2>
        <div className="text-center mb-3">
          <Link to="/view-expenses" className="btn btn-success">
            View Expenses List
          </Link>
        </div>
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
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-success w-100">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
