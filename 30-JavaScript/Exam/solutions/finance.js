const expenses = new Map([
    [1, { description: 'Groceries', amount: 100, category: 'Food' }],
    [2, { description: 'Electricity Bill', amount: 50, category: 'Utilities' }],
    [3, { description: 'Movie Tickets', amount: 30, category: 'Entertainment' }]
  ]);
  
  let nextId = 4;
  
  const addExpense = (description, amount, category) => {
    expenses.set(nextId, { description, amount, category });
    console.log(`Expense "${description}" added successfully.`);
    nextId++;
  };
  
  const removeExpense = (id) => {
    if (expenses.delete(id)) {
      console.log(`Expense with ID ${id} removed successfully.`);
    } else {
      console.log(`No expense found with ID: ${id}`);
    }
  };
  
  const viewAllExpenses = () => {
    if (expenses.size === 0) {
      console.log('No expenses recorded.');
    } else {
      console.log('All Expenses:');
      for (let [id, expense] of expenses) {
        console.log(`ID: ${id}, Description: ${expense.description}, Amount: $${expense.amount}, Category: ${expense.category}`);
      }
    }
  };
  
  const calculateTotalExpenses = () => {
    let total = 0;
    for (let expense of expenses.values()) {
      total += expense.amount;
    }
    console.log(`Total Expenses: $${total}`);
  };
  
  const generateReportByCategory = () => {
    const report = {};
    for (let expense of expenses.values()) {
      if (!report[expense.category]) {
        report[expense.category] = 0;
      }
      report[expense.category] += expense.amount;
    }
    
    console.log('Expense Summary by Category:');
    for (let category in report) {
      console.log(`${category}: $${report[category]}`);
    }
  };
  
  // Hardcoded operations
  console.log("Initial Expenses:");
  viewAllExpenses();
  
  // Add a new expense
  addExpense('Dinner at restaurant', 60, 'Food');
  viewAllExpenses();
  
  // Remove an expense
  removeExpense(2);
  viewAllExpenses();
  
  // Calculate total expenses
  calculateTotalExpenses();
  
  // Generate report by category
  generateReportByCategory();
  