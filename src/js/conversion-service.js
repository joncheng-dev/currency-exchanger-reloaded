export default class ConversionService {
  static getConversion(usdAmount, targetCurrency) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, usdAmount, targetCurrency]);
        } else {
          reject([this, response, usdAmount, targetCurrency]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}