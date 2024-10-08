// src/ExpenseTracker.jsx
import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import { useNavigate } from 'react-router-dom';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleViewExpenses = () => {
    navigate('/view-expenses', { state: { expenses } });
  };

  return (
    <div>
      <ExpenseForm addExpense={addExpense} />
      <button className="btn btn-primary mt-3" onClick={handleViewExpenses}>
        View Expenses
      </button>
    </div>
  );
};

export default ExpenseTracker;
