import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ConversionService from "./js/conversion-service";

// Business Logic
function getConversionResults(amount, currency) {
  let promise = ConversionService.getConversion(amount, currency);
  promise.then(function (currencyArray) {
    showTargetCurrencyValue(currencyArray);
  }, function (errorArray) {
    showError(errorArray);
  });
}

// UI Logic
function showTargetCurrencyValue(data) {
  document.getElementById("results").innerText = `Conversion Result: ${data[1]} USD = ${data[0].conversion_result} ${data[0].target_code}`;
}

function showError(error) {
  let outputToHtml = "";
  let customErrorMessage;
  if (error[0].status === 400) {
    customErrorMessage = "Request does not follow the accepted structure. Please refer to the three character country codes.";
  } else if (error[0].status === 404) {
    customErrorMessage = "Supplied currency code not supported. Please see supported currencies.";
  } else if (error[0].status === 403) {
    if (error[1]["error-type"] === "invalid-key") {
      customErrorMessage = "Please check that the API key in the .env file is inputted correctly and accurately.";
    } else if (error[1]["error-type"] === "inactive-account") {
      customErrorMessage = "Please check that your API key is active and functioning. Your email address may not have been confirmed.";
    }
  }
  outputToHtml += `Error. Status: ${error[0].status}. Type: ${error[1]["error-type"]} Message: ${customErrorMessage}`;
  
  let ulElement = document.createElement("ul");
  let liElement = document.createElement("li");
  ulElement.append(liElement);
  liElement.append(`Status: ${error[0].status}`);
  
  document.getElementById("results").innerText = outputToHtml;
  document.getElementById("results").append(ulElement);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const userEnteredAmount = document.getElementById("dollar-amount").value;
  const userTargetCurrency = document.getElementById("target-currency").value;
  document.getElementById("dollar-amount").value = null;
  document.getElementById("target-currency").value = null;
  getConversionResults(userEnteredAmount, userTargetCurrency);
}

function formLoader() {
  let userForm = document.getElementById("user-input-form");
  userForm.addEventListener("submit", handleFormSubmission);
}

window.addEventListener("load", formLoader);
