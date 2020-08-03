//
// *****************Project 4- Vanilla JS Expense Tracker******************************//
//
//
// displays the table on start
document.addEventListener("DOMContentLoaded", function () {
    displayExpensesOnTable();
});

// event listener for remove all expenses button
document.getElementById("remove-all").addEventListener("click", function () {
    const expenses = [];

    document.getElementById("table").innerHTML = "";

    window.localStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpensesOnTable();
});

// function to add expences
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    addNewExpense();
});

// for loop to loop through inputs with the class name "input" to add enter key functionality
for (let i = 0; i < document.getElementsByClassName('input').length; i++) {
    const input = document.getElementsByClassName('input')[i];
    input.addEventListener('keypress', function (e) {
        if (e.key === "Enter") {
            addNewExpense();
        }
    })
};

function addNewExpense() {
    let expenses = getSavedExpenses();

    const newExpense = {
        id: new Date().getTime() * Math.random(),
        amount: parseFloat(document.getElementById("amount").value).toFixed(2),
        place: document.getElementById("place").value,
        type: "",
        date: document.getElementById("date").value,
    };


    const paymentTypes = document.getElementsByName("payment-type")
    for (let i = 0; i < paymentTypes.length; i++) {
        if (paymentTypes[i].checked) {
            newExpense.type = paymentTypes[i].value;
        };
    };


    if ((newExpense.place === "" || newExpense.date === "") && isNaN(newExpense.amount) === true) {
        alert("Please fill out all fields & amount must be a number");
        return;
    } else if (newExpense.place === "" || newExpense.date === "") {
        alert("Please fill out all fields");
        return;
    } else if (isNaN(newExpense.amount) === true) {
        alert("Amount must be a number");
        return;
    };

    newExpense.amount = `$${newExpense.amount}`

    expenses.push(newExpense);
    document.getElementById("table").innerHTML = "";
    window.localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpensesOnTable();
};

// funciton to clear the form
document.getElementById("clear").addEventListener("click", function (e) {
    document.getElementById("form").reset();
});


// function to get saved expenses from local storage
function getSavedExpenses() {
    let savedExpenses = JSON.parse(window.localStorage.getItem('expenses'));
    if (savedExpenses === null) {
        savedExpenses = [];
    };
    return savedExpenses;
};


// function to display all expenses on the table from local storage
function displayExpensesOnTable() {
    let expenses = getSavedExpenses();
    const htmlTable = document.getElementById("table");
    const thRow = document.createElement("tr");
    const typeTh = document.createElement("th");
    const dateTh = document.createElement("th");
    const amountTh = document.createElement("th");
    const placeTh = document.createElement("th");
    const removeTh = document.createElement("th");
    typeTh.textContent = "Type";
    dateTh.textContent = "Date";
    amountTh.textContent = "Amount";
    placeTh.textContent = "Place";
    removeTh.textContent = "Remove";
    thRow.appendChild(typeTh);
    thRow.appendChild(dateTh);
    thRow.appendChild(amountTh);
    thRow.appendChild(placeTh);
    thRow.appendChild(removeTh);
    htmlTable.appendChild(thRow);
    document.getElementById("form").reset();

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        if (expense !== null) {
            const tableRow = document.createElement("tr");
            const typeTd = document.createElement("td");
            const dateTd = document.createElement("td");
            const amountTd = document.createElement("td");
            const placeTd = document.createElement("td");
            const removeTd = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.id = expense.id;
            removeButton.className = "delete";
            removeButton.innerHTML = "X";
            removeTd.appendChild(removeButton);
            typeTd.textContent = expense.type;
            dateTd.textContent = expense.date;
            amountTd.textContent = expense.amount;
            placeTd.textContent = expense.place;
            tableRow.appendChild(typeTd);
            tableRow.appendChild(dateTd);
            tableRow.appendChild(amountTd);
            tableRow.appendChild(placeTd);
            tableRow.appendChild(removeTd);
            htmlTable.appendChild(tableRow);
        };
    };
};

// function to delete a expense
const table = document.getElementById("table");
table.addEventListener("click", function (e) {
    let expenses = getSavedExpenses();

    const item = e.target;

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        if (expense.id == item.id) {
            expenses.splice(i, 1);
        };
    };

    if (item.className === "delete") {
        table.removeChild(item.parentNode.parentNode);
    };

    window.localStorage.setItem('expenses', JSON.stringify(expenses));
});