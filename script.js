const API_KEY = 'b6bc4088c4bed23020e8789e'; 
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

document.addEventListener('DOMContentLoaded', () => {
    populateCurrencyOptions();
    document.getElementById('converterForm').addEventListener('submit', convertCurrency);
});

function populateCurrencyOptions() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            const fromCurrencySelect = document.getElementById('fromCurrency');
            const toCurrencySelect = document.getElementById('toCurrency');
            
            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                fromCurrencySelect.appendChild(option);
                toCurrencySelect.appendChild(option.cloneNode(true));
            });
        })
        .catch(error => console.error('Error fetching currency data:', error));
}

function convertCurrency(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const fromRate = data.rates[fromCurrency];
            const toRate = data.rates[toCurrency];
            const convertedAmount = (amount / fromRate) * toRate;
            
            document.getElementById('conversionResult').textContent = 
                `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => console.error('Error converting currency:', error));
}
