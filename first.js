const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const amountInput = document.querySelector(".amount input");
const resultDisplay = document.querySelector(".final_amount");


for(let select of dropdown)
    {
        for(currCode in countryList)
            {
                let newOption = document.createElement("option");
                    newOption.innerText = currCode;
                    newOption.value = currCode;
                    if(select.name === "from" && currCode === "USD")
                        {
                            newOption.selected = "selected";
                        }
                        else if(select.name === "to" && currCode === "INR")
                            {
                                newOption.selected = "selected";
                            }
                    select.append(newOption);
            }
            select.addEventListener("change", (evt) => {
                updateFlag(evt.target);
            });
    }   

const updateFlag = (element) =>
    {
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    };
    btn.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let amount = amountInput.value.trim(); // Trim whitespace around the input
        if (amount === "" || isNaN(amount)) {
            amount = "0.0"; // Default to "0.0" if amount is empty or not a number
            amountInput.value = amount;
        }
    
        const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${fromCurr.value}&to=${toCurr.value}&amount=${amount}`;
    
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'eda486aed0msh57c4716342658b5p11b98ejsna08dd3bcce13',
                'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch(url, options);
            const data = await response.json(); // Parse response as JSON
            console.log(data);
    
            if (data.success) {
                const conversionResult = parseFloat(data.result).toFixed(2); // Convert to float and limit to 2 decimal places
                resultDisplay.textContent = conversionResult;
            } else {
                console.error("Conversion failed:", data.error.message);
                resultDisplay.textContent = "0.0";
            }
        } catch (error) {
            console.error("Error fetching conversion data:", error);
            resultDisplay.textContent = "Error fetching conversion data. Please try again later.";
        }
    });