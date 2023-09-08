// export default class FetchExchangeRateService {
//   static fetchConversion(usdAmount, targetCurrency) {
//     return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`)
//       .then(function (response) {
//         console.log(response);
//         if (!response.ok) {
//           // const errorMsg = `${response.ok} ${response.status}`;
//           const jsonResponse = response.json();
//           // console.log(`Error: ${response.ok} ${response.status}`);
//           throw new Error(jsonResponse);
//         } else {
//           console.log(`Success: ${response.status} ${response.statusText}`);
//           return response.json();
//         }
//       })
//       .catch(function (error) {
//         // console.log(`Error - Catch: ${error}`);
//         return error;
//       });
//   }
// }
