import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import FetchExchangeRateService from "./js/fetchExchangeRateService";

// Business Logic
function getConversion(amount, currency) {
  FetchExchangeRateService.fetchConversion(amount, currency).then(function (response) {
    if (response.ok) {
      console.log(`Index.js getConversion OK: ${response}`);
      showTargetCurrencyValue(response);
    } else {
      console.log(`Index.js getConversion NOT: ${response}`);
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
  const userTargetCurrency = "KRW";
  document.getElementById("dollar-amount").value = null;
  getConversion(userEnteredAmount, userTargetCurrency);
}

function formLoader() {
  let userForm = document.getElementById("user-input-form");
  userForm.addEventListener("submit", handleFormSubmission);
}

window.addEventListener("load", formLoader);
