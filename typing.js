let typindTest = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let spinner = document.getElementById("spinner");
let inputEl = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");

let url = "https://apis.ccbp.in/random-quote";
let options = {
    method: "GET"
};
let intervalId;
let timer;

function startTimer() {
    timer = -1;
    intervalId = setInterval(function() {
        timer = timer + 1;
        timerEl.textContent = timer;
    }, 1000);
}

function getQuote() {
    spinner.classList.remove("d-none");
    typindTest.classList.add("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let newQuote = jsonData.content;
            spinner.classList.add("d-none");
            typindTest.classList.remove("d-none");
            quoteEl.textContent = newQuote;
        });
    inputEl.value = "";
    resultEl.textContent = "";
    startTimer();
}

getQuote();
resetBtn.addEventListener("click", getQuote);

function checkResult() {
    if (quoteEl.textContent === inputEl.value) {
        clearInterval(intervalId);
        resultEl.textContent = "You typed in " + timer + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
}

submitBtn.addEventListener("click", checkResult)