import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import FetchExchangeRateService from "./js/fetchExchangeRateService";

// Business Logic
function getConversion(amount, currency) {
  FetchExchangeRateService.fetchConversion(amount, currency).then(function (response) {
    // console.log(`Response in getConversion: ${response}`);
    if (response.result) {
      console.log(`Index.js getConversion OK: ${response.result}`);
      showTargetCurrencyValue(response);
    } else {
      // console.log(`Index.js Reject: response.ok: ${response.ok} response.status ${response.status}`);
      // console.log(`Index.js getConversion NOT: ${response.result} ${response["error-type"]}`);
      showError(response);
    }
  });
}

// UI Logic
function showTargetCurrencyValue(apiResponse) {
  document.getElementById("results").innerText = apiResponse.conversion_result;
}

function showError(request) {
  document.getElementById("results").innerText = request.status;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const userEnteredAmount = document.getElementById("dollar-amount").value;
  const userTargetCurrency = document.getElementById("target-currency").value;
  document.getElementById("dollar-amount").value = null;
  document.getElementById("target-currency").value = null;
  getConversion(userEnteredAmount, userTargetCurrency);
}

function formLoader() {
  let userForm = document.getElementById("user-input-form");
  userForm.addEventListener("submit", handleFormSubmission);
}

window.addEventListener("load", formLoader);
