export default class FetchExchangeRateService {
  static fetchConversion(usdAmount, targetCurrency) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`);
  }
}
