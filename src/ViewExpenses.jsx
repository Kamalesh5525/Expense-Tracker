import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExpensesChart from './ExpensesChart';

const ViewExpenses = ({ expenses, updateExpenses }) => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleEdit = (expense, index) => {
    navigate('/edit-expense', { state: { expense, index } });
  };

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    updateExpenses(updatedExpenses);
    toast.success('Expense deleted successfully!');
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = categoryFilter ? expense.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true;
    const matchesPaymentMethod = paymentMethodFilter ? expense.paymentMethod === paymentMethodFilter : true;
    const matchesDateRange =
      (!dateFrom || new Date(expense.date) >= new Date(dateFrom)) &&
      (!dateTo || new Date(expense.date) <= new Date(dateTo));
    const matchesSearchTerm =
      searchTerm ? expense.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) : true;

    return matchesCategory && matchesPaymentMethod && matchesDateRange && matchesSearchTerm;
  });

  // Filter expenses for the chart based on selected month and category
  const chartFilteredExpenses = filteredExpenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const matchesMonth = selectedMonth ? expenseDate.getMonth() === parseInt(selectedMonth) : true;
    const matchesCategory = selectedCategory ? expense.category.toLowerCase() === selectedCategory.toLowerCase() : true;

    return matchesMonth && matchesCategory;
  });

  return (
    <div className="container">
      <div className="text-center mb-4">
        <Link to="/" className="btn btn-success">Add New Expense</Link>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            placeholder="Search expenses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={paymentMethodFilter}
            onChange={(e) => setPaymentMethodFilter(e.target.value)}
          >
            <option value="">All Payment Methods</option>
            <option value="cash">Cash</option>
            <option value="creditCard">Credit Card</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            placeholder="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 mb-2">
          <input
            type="text"
            placeholder="Filter by category (for chart)"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
 
      <h2 className="text-center mb-4 " style={{fontWeight:"900",fontSize:"39px",color:"black"}}>Expenses List</h2>
      {filteredExpenses.length === 0 ? (
        <p className="text-center text-danger">No expenses found with the selected filters.</p>
      ) : (
        <table className="table table-striped my-5">
          <thead className="table-light">
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Category</th>
              <th>Payment Method</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td>Rs.{expense.amount.toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.paymentMethod}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(expense, index)}>Edit</button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {chartFilteredExpenses.length > 0 && <ExpensesChart expenses={chartFilteredExpenses} />}
    </div>
  );
};

export default ViewExpenses;
