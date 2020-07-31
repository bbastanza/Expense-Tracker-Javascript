//
// *****************Project 4- Vanilla JS Expense Tracker******************************//
//
//
// displays the table on start
document.addEventListener("DOMContentLoaded", function () {
    displayExpencesOnTable();
})

// event listener for remove all expenses button
document.getElementById("remove-all").addEventListener("click", function () {
    const expenses = [];

    document.getElementById("table").innerHTML = "";

    window.localStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpencesOnTable();
})

// function to add expences
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    let expenses = getSavedExpenses();

    let newExpense = {
        id: new Date().getTime() * Math.random(),
        amount: document.getElementById("amount").value,
        place: document.getElementById("place").value,
        type: "",
        date: document.getElementById("date").value,
    }

    let paymentTypes = document.getElementsByName("payment-type")
    for (let i = 0; i < paymentTypes.length; i++) {
        if (paymentTypes[i].checked) {
            newExpense.type = paymentTypes[i].value;
        }
    }

    if (newExpense.amount === "") return;
    if (newExpense.place === "") return;
    if (newExpense.date === "") return;

    expenses.push(newExpense)
    document.getElementById("table").innerHTML = ""
    window.localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpencesOnTable();
})


// funciton to clear the form
document.getElementById("clear").addEventListener("click", function (e) {
    e.preventDefault()
    document.getElementById("form").reset();
})


// function to get saved expenses from local storage
function getSavedExpenses() {
    let savedExpenses = JSON.parse(window.localStorage.getItem('expenses'));
    if (savedExpenses === null) {
        savedExpenses = [];
    }
    return savedExpenses;
}


// function to display all expenses on the table from local storage
function displayExpencesOnTable() {
    let expenses = getSavedExpenses();
    const htmlTable = document.getElementById("table")
    const thRow = document.createElement("tr")
    const typeTh = document.createElement("th")
    const dateTh = document.createElement("th")
    const amountTh = document.createElement("th")
    const placeTh = document.createElement("th")
    const removeTh = document.createElement("th")
    typeTh.innerHTML = "Type"
    dateTh.innerHTML = "Date"
    amountTh.innerHTML = "Amount"
    placeTh.innerHTML = "Place"
    removeTh.innerHTML = "Remove"
    thRow.appendChild(typeTh)
    thRow.appendChild(dateTh)
    thRow.appendChild(amountTh)
    thRow.appendChild(placeTh)
    thRow.appendChild(removeTh)
    htmlTable.appendChild(thRow)

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        console.log(expense)
        const tableRow = document.createElement("tr")
        const typeTd = document.createElement("td")
        const dateTd = document.createElement("td")
        const amountTd = document.createElement("td")
        const placeTd = document.createElement("td")
        const removeTd = document.createElement("td")
        const removeButton = document.createElement("button")
        removeButton.innerHTML = "X"
        removeTd.appendChild(removeButton)
        typeTd.innerHTML = expense.type
        dateTd.innerHTML = expense.date
        amountTd.innerHTML = expense.amount
        placeTd.innerHTML = expense.place
        tableRow.appendChild(typeTd)
        tableRow.appendChild(dateTd)
        tableRow.appendChild(amountTd)
        tableRow.appendChild(placeTd)
        tableRow.appendChild(removeTd)
        htmlTable.appendChild(tableRow)
    }
}


