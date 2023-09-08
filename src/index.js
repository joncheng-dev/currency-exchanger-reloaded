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
    console.log(`Errors here: ${errorArray}`);
    showError(errorArray);
  });
}

// UI Logic
function showTargetCurrencyValue(data) {
  console.log(data);
  document.getElementById("results").innerText = `Conversion Result: ${data[0].conversion_result} ${data[0].target_code}`;
}

function showError(error) {
  console.log(error);
  document.getElementById("results").innerText = `Error. Status: ${error[0].status}. Type: ${error[1]["error-type"]}`;
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
