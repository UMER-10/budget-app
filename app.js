let monthlyBudget =  0;

let expenses = [];

function addBudget() {

  const budgetInput = document.getElementById("monthlyBudget");

  const budgetValue = parseInt(budgetInput.value);

  if (isNaN(budgetValue) || budgetValue <= 0) {
    alert("Please enter a valid monthly budget.");
    return;
  }

  monthlyBudget = budgetValue;

  budgetInput.value = "";
  updateBud();
  displayTotalBud();

}




  function displayTotalBud() {
      
      const totalBudgetElement = document.getElementById("totalBudget");

      totalBudgetElement.textContent = "Total Budget: " + monthlyBudget;

    }

function addExpense() {


     const descriptionInput = document.getElementById("expDescription");

     const amountInput = document.getElementById("expAmount");

     const dateInput = document.getElementById("expDate");

  const desVal = descriptionInput.value.trim();
  const amountVal = parseFloat(amountInput.value);
  const dateVal = dateInput.value;

  if (desVal === "" || isNaN(amountVal) || amountVal <= 0 || dateVal === "") {
    alert("Please enter valid expense details.");
    return;
  }

  const expense = {
    description: desVal,
    amount: amountVal,
    date: dateVal
  };

  expenses.push(expense);

  descriptionInput.value = "";
  amountInput.value = "";
  dateInput.value = "";

  displayExp();
  updateBud();
}

function displayExp() {
  const tableBody = document.getElementById("expenseTable");

  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }

  for (let i = 0; i < expenses.length; i++) {

       const expense = expenses[i];

       const row = tableBody.insertRow();

       const descriptionCell = row.insertCell();

       const amountCell = row.insertCell();
       const dateCell = row.insertCell();
       const actionsCell = row.insertCell();

    descriptionCell.textContent = expense.description;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
      editExp(i);
 });

     const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
      deleteExp(i);
    });

      actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  }
}

function editExp(index) {
  const expense = expenses[index];
  const descriptionInput = document.getElementById("expenseDescription");
  const amountInput = document.getElementById("expenseAmount");
  const dateInput = document.getElementById("expenseDate");

  descriptionInput.value = expense.description;
  amountInput.value = expense.amount;
  dateInput.value = expense.date;

  expenses.splice(index, 1);
  displayExpenseData();
  updateRemainingBud();
}

function deleteExp(index) {
  expenses.splice(index, 1);
  displayExp();
  updateBud();
}

function updateBud() {
  const remainingBud = monthlyBudget - getTotalExpenses();
  const remainingBudgetElement = document.getElementById("remainingBudget");
  remainingBudgetElement.textContent = "Remaining Budget: " + remainingBud;
}

function getTotalExpenses() {
  let totalExpenses = 0;
  for (const expense of expenses) {
    totalExpenses += expense.amount;
  }
  return totalExpenses;
}
