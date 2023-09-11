import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ConversionService from "./js/conversion-service";

// Business Logic
function getConversionResults(amount, currency) {
  let promise = ConversionService.getConversion(amount, currency);
  promise.then(
    function (currencyArray) {
      showTargetCurrencyValue(currencyArray);
    },
    function (errorArray) {
      showError(errorArray);
    }
  );
}

// UI Logic
function showTargetCurrencyValue(data) {
  document.getElementById(
    "results"
  ).innerHTML = `<u>Conversion Result:</u><br/> ${data[2]} USD = ${data[1].conversion_result} ${data[1].target_code}`;
}

function showError(error) {
  let outputToHtml = "";
  let customErrorMessage;
  if (error[0].status === 0) {
    customErrorMessage = "Bad URL request.";
  } else if (error[0].status === 400) {
    customErrorMessage = "Request does not follow the accepted structure. Please refer to the three character country codes.";
  } else if (error[0].status === 404) {
    customErrorMessage = "Supplied currency code not supported. Please use a supported currency. Refer to the table on the left.";
  } else if (error[0].status === 403) {
    if (error[1]["error-type"] === "invalid-key") {
      customErrorMessage = "Invalid API key. Please check that the API key in the .env file is inputted correctly and accurately.";
    } else if (error[1]["error-type"] === "inactive-account") {
      customErrorMessage =
        "Inactive API account. Please check that your API key is active and functioning. Your email address may not have been confirmed.";
    }
  }
  outputToHtml += `<u>Error Status:</u><br/> ${error[0].status}<br/><br/><u>Message:</u><br/> ${customErrorMessage}`;
  document.getElementById("results").innerHTML = outputToHtml;
}

function handleFormSubmission(event) {
  event.preventDefault();
  document.getElementById("results").innerHTML = null;
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
