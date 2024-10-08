import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const ExpensesChart = ({ expenses }) => {
  const monthlyData = Array(12).fill(0);
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const month = date.getMonth();
    monthlyData[month] += expense.amount;
  });

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: { 
        type: 'category', 
      },
    },
  };

  return (
    <div className="my-5 bg-white">
      <h3 className="text-center">Expenses Overview by Month</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default ExpensesChart;
