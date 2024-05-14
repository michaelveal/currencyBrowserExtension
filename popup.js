// Listen for a click event on the 'convert' button.
document.getElementById('convert').addEventListener('click', function() {
    // Retrieve the amount entered by the user in the 'amount' input field.
    var amount = document.getElementById('amount').value;
    
    // Retrieve the currency code from the 'fromCurrency' input field and convert it to uppercase.
    var fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
    
    // Retrieve the currency code from the 'toCurrency' input field and convert it to uppercase.
    var toCurrency = document.getElementById('toCurrency').value.toUpperCase();

    // Use the fetch API to get the current exchange rates for the 'fromCurrency' using your API key.
    fetch(`https://v6.exchangerate-api.com/v6/25ccd77a4117d6ead8af3750/latest/${fromCurrency}`)
        .then(response => response.json()) // Parse the JSON response.
        .then(data => {
            // Check if the API request was successful.
            if (data.result === 'success') {
                // Extract the exchange rate for the 'toCurrency' from the conversion rates.
                var rate = data.conversion_rates[toCurrency];
                
                // Calculate the result of the currency conversion.
                var result = amount * rate;
                
                // Display the conversion result in the 'result' element on the webpage.
                document.getElementById('result').innerText = `${amount} ${fromCurrency} is ${result.toFixed(2)} ${toCurrency}`;
            } else {
                // Handle errors like unsupported currency codes or invalid API key.
                console.error('Error:', data['error-type']);
                document.getElementById('result').innerText = `Error: ${data['error-type']}`;
            }
        })
        .catch(error => {
            // Log any errors that occur during the fetch operation.
            console.error('Error:', error);
            document.getElementById('result').innerText = `Error: ${error.message}`;
        });
});
