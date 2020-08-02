//
// *****************Project 4- Vanilla JS Expense Tracker******************************//
//
//
// displays the table on start
document.addEventListener("DOMContentLoaded", function () {
    displayExpencesOnTable();
});

// event listener for remove all expenses button
document.getElementById("remove-all").addEventListener("click", function () {
    const expenses = [];

    document.getElementById("table").innerHTML = "";

    window.localStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpencesOnTable();
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

    let newExpense = {
        id: new Date().getTime() * Math.random(),
        amount: "$" + document.getElementById("amount").value,
        place: document.getElementById("place").value,
        type: "",
        date: document.getElementById("date").value,
    };


    let paymentTypes = document.getElementsByName("payment-type")
    for (let i = 0; i < paymentTypes.length; i++) {
        if (paymentTypes[i].checked) {
            newExpense.type = paymentTypes[i].value;
        };
    };

    if (newExpense.amount === "") return;
    if (newExpense.place === "") return;
    if (newExpense.date === "") return;

    expenses.push(newExpense);
    document.getElementById("table").innerHTML = "";
    window.localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpencesOnTable();
    document.getElementById("form").reset();
};

// funciton to clear the form
document.getElementById("clear").addEventListener("click", function (e) {
    e.preventDefault();
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
function displayExpencesOnTable() {
    let expenses = getSavedExpenses();
    console.log(expenses)
    const htmlTable = document.getElementById("table");
    const thRow = document.createElement("tr");
    const typeTh = document.createElement("th");
    const dateTh = document.createElement("th");
    const amountTh = document.createElement("th");
    const placeTh = document.createElement("th");
    const removeTh = document.createElement("th");
    typeTh.innerHTML = "Type";
    dateTh.innerHTML = "Date";
    amountTh.innerHTML = "Amount";
    placeTh.innerHTML = "Place";
    removeTh.innerHTML = "Remove";
    thRow.appendChild(typeTh);
    thRow.appendChild(dateTh);
    thRow.appendChild(amountTh);
    thRow.appendChild(placeTh);
    thRow.appendChild(removeTh);
    htmlTable.appendChild(thRow);

    for (let i = 0; i < expenses.length; i++) {
        let expense = expenses[i];

        if (expense !== null) {
            const tableRow = document.createElement("tr");
            const typeTd = document.createElement("td");
            const dateTd = document.createElement("td");
            const amountTd = document.createElement("td");
            const placeTd = document.createElement("td");
            const removeTd = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.id = expense.id;
            removeButton.className = "delete"
            removeButton.innerHTML = "X";
            removeTd.appendChild(removeButton);
            typeTd.innerHTML = expense.type;
            dateTd.innerHTML = expense.date;
            amountTd.innerHTML = expense.amount;
            placeTd.innerHTML = expense.place;
            tableRow.appendChild(typeTd);
            tableRow.appendChild(dateTd);
            tableRow.appendChild(amountTd);
            tableRow.appendChild(placeTd);
            tableRow.appendChild(removeTd);
            htmlTable.appendChild(tableRow);
        }
    };
};

// function to delete a expense
let table = document.getElementById("table")
table.addEventListener("click", function (e) {
    let expenses = getSavedExpenses();

    let item = e.target;

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        if (item.id == expense.id) {
            expenses.splice(expense[i], 1)
        }
    }

    if (item.className === "delete"); {
        table.removeChild(item.parentNode.parentNode);
    }

    window.localStorage.setItem('expenses', JSON.stringify(expenses));
});