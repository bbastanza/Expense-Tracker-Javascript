document.addEventListener("DOMContentLoaded", function () {
    console.log("Hi Brian")
})

// function to add expences
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    let expenses = getSavedExpenses();
    let newExpense = {
        id: "",
        amount: document.getElementById("amount").value,
        place: document.getElementById("place").value,
        type: "",
        date: document.getElementById("date").value
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
    console.log(expenses)
    window.localStorage.setItem('expenses', JSON.stringify(expenses));
})


// funciton to clear an expense
document.getElementById("clear").addEventListener("click", function (e) {
    e.preventDefault()
    document.getElementById("form").reset();
})


function getSavedExpenses() {
    let savedExpenses = JSON.parse(window.localStorage.getItem('expenses'));
    if (savedExpenses === null) {
        savedExpenses = [];
    }
    return savedExpenses;
}



