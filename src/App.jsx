// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpenseForm from './ExpenseForm';
import ViewExpenses from './ViewExpenses';
import EditExpense from './EditExpense';
import ExpensesChart from './ExpensesChart';
import './app.css'


const App = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const updateExpense = (index, updatedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = updatedExpense;
    setExpenses(updatedExpenses);
  };

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Routes>
        <Route path="/" element={<ExpenseForm addExpense={addExpense} />} />
        <Route path="/view-expenses" element={<ViewExpenses expenses={expenses} updateExpenses={setExpenses} />} />
        <Route path="/edit-expense" element={<EditExpense updateExpense={updateExpense} />} />
         <Route path="/chart" element={<ExpensesChart />} />
      </Routes>
    </Router>
  );
};

export default App;
