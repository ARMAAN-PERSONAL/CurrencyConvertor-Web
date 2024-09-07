// Define API endpoint
const apiEndpoint = "https://api.exchangerate-api.com/v4/latest/USD";

// DOM Elements
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const amountInput = document.getElementById("amount");
const resultText = document.getElementById("resultText");

// Fetch currencies and populate dropdowns
fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        populateCurrencyDropdown(currencies, fromCurrency);
        populateCurrencyDropdown(currencies, toCurrency);
    });

// Populate dropdown with currency options
function populateCurrencyDropdown(currencies, dropdown) {
    currencies.forEach(currency => {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        dropdown.appendChild(option);
    });
}

// Convert currency on button click
convertBtn.addEventListener("click", () => {
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        resultText.textContent = "Please enter a valid amount.";
        return;
    }

    fetch(`${apiEndpoint}?base=${fromCurrencyValue}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrencyValue];
            const convertedAmount = (amount * rate).toFixed(2);
            resultText.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
        })
        .catch(() => {
            resultText.textContent = "Error fetching conversion rate.";
        });
});
