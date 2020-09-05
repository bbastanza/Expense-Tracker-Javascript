document.addEventListener("DOMContentLoaded", function () {
    displayExpensesOnTable();

    const inputs = document.getElementsByClassName("input");
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.addEventListener("keypress", function (e) {
            switch (e.key) {
                case "Enter":
                    addNewExpense();
                default:
                    break;
            }
        });
    }
});

const removeAll = document.getElementById("remove-all");
const submitButton = document.getElementById("submit");
const clearButton = document.getElementById("clear");
const table = document.getElementById("table");

removeAll.addEventListener("click", function () {
    document.getElementById("table").innerHTML = "";

    window.localStorage.setItem("expenses", JSON.stringify([]));

    displayExpensesOnTable();
});

submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    addNewExpense();
});

clearButton.addEventListener("click", function () {
    document.getElementById("form").reset();
});

table.addEventListener("click", function (e) {
    const item = e.target;

    let expenses = getSavedExpenses();
    if (item.className === "delete") {
        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];

            if (expense.id == item.id) {
                expenses.splice(i, 1);
            }
        }
        table.removeChild(item.parentNode.parentNode);
    }

    window.localStorage.setItem("expenses", JSON.stringify(expenses));
});

function addNewExpense() {
    const newExpense = {
        id: new Date().getTime() * Math.random(),
        amount: parseFloat(document.getElementById("amount").value).toFixed(2),
        place: document.getElementById("place").value,
        type: "",
        date: document.getElementById("date").value,
    };

    const paymentTypes = document.getElementsByName("payment-type");
    for (let i = 0; i < paymentTypes.length; i++) {
        if (paymentTypes[i].checked) {
            newExpense.type = paymentTypes[i].value;
        }
    }

    if ((newExpense.place === "" || newExpense.date === "") && isNaN(newExpense.amount) === true) {
        alert("Please fill out all fields & amount must be a number");
        return;
    } else if (newExpense.place === "" || newExpense.date === "") {
        alert("Please fill out all fields");
        return;
    } else if (isNaN(newExpense.amount) === true) {
        alert("Amount must be a number");
        return;
    }

    newExpense.amount = `$${newExpense.amount}`;

    let expenses = getSavedExpenses();
    expenses.push(newExpense);
    document.getElementById("table").innerHTML = "";
    window.localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpensesOnTable();
}

function getSavedExpenses() {
    return JSON.parse(window.localStorage.getItem("expenses")) || [];
}

function displayExpensesOnTable() {
    const htmlTable = document.getElementById("table");

    const thRow = createTableHeader();
    htmlTable.appendChild(thRow);
    document.getElementById("form").reset();

    let expenses = getSavedExpenses();
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        if (expense !== null) {
            tableRow = createDataRow(expense);
            htmlTable.appendChild(tableRow);
        }
    }
}

function createTableHeader() {
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
    return thRow;
}

function createDataRow(expense) {
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
    return tableRow;
}
