export default class FetchExchangeRateService {
  static fetchConversion(usdAmount, targetCurrency) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`)
      .then(function (response) {
        console.log(response);
        if (!response.ok) {
          const errorMsg = `${response.status} ${response.statusText}`;
          console.log(`Error: ${response.status} ${response.statusText}`);
          throw new Error(errorMsg);
        } else {
          console.log(`Success: ${response.status} ${response.statusText}`);
          return response.json();
        }
      })
      .catch(function (error) {
        console.log(`Error - Catch: ${error}`);
        return error;
      });
  }
}
