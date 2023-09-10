export default class ConversionService {
  static getConversion(usdAmount, targetCurrency) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v7/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`;
      request.addEventListener("loadend", function () {
        try {
          let response = JSON.parse(this.responseText);
          if (this.status === 200) {
            resolve([this, response, usdAmount, targetCurrency]);
          } else {
            reject([this, response, usdAmount, targetCurrency]);
          }
        } catch (errorMessage) {
          console.log(`Catch block`, errorMessage);
          console.log(`Catch block`, this);
          reject([this]);
        }

      });
      request.open("GET", url, true);
      request.send();
    });
  }
}


// export default class ConversionService {
//   static getConversion(usdAmount, targetCurrency) {
//     return new Promise(function (resolve, reject) {
//       let request = new XMLHttpRequest();
//       const url = `https://v6.exchangerate-api.com/v7/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`;
//       request.addEventListener("loadend", function () {
//         let response = JSON.parse(this.responseText);
//         if (this.status === 200) {
//           resolve([this, response, usdAmount, targetCurrency]);
//         } else if (this.status === 0) {
//           reject([this]);
//         } else {
//           reject([this, response, usdAmount, targetCurrency]);
//         }
//       });
//       request.open("GET", url, true);
//       request.send();
//     });
//   }
// }

// This one works:
// export default class ConversionService {
//   static getConversion(usdAmount, targetCurrency) {
//     return new Promise(function (resolve, reject) {
//       let request = new XMLHttpRequest();
//       const url = `https://v6.exchangerate-api.com/v7/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`;
//       request.addEventListener("loadend", function () {
//         if (this.status === 0) {
//           console.log(`Rejected before JSON.parse: `, this);
//           reject(this);
//         }
//         let response = JSON.parse(this.responseText);
//         if (this.status === 200) {
//           resolve([this, response, usdAmount, targetCurrency]);
//         } else if (this.status === 0) {
//           reject([this]);
//         } else {
//           reject([this, response, usdAmount, targetCurrency]);
//         }
//       });
//       request.open("GET", url, true);
//       request.send();
//     });
//   }
// }

// Before Edits
// export default class ConversionService {
//   static getConversion(usdAmount, targetCurrency) {
//     return new Promise(function (resolve, reject) {
//       let request = new XMLHttpRequest();
//       const url = `https://v6.exchangerate-api.com/v7/${process.env.API_KEY}/pair/USD/${targetCurrency}/${usdAmount}`;
//       request.addEventListener("loadend", function () {
//         console.log(this);
//         console.log(this.status);
//         if (this.status === 0) {
//           console.log(`Rejected before JSON.parse: `, this);
//           reject(this);
//         }
//         let response = JSON.parse(this.responseText);
//         if (this.status === 200) {
//           // console.log([this, response, usdAmount, targetCurrency]);
//           resolve([this, response, usdAmount, targetCurrency]);
//         } else if (this.status === 0) { 
//           console.log(`Rejected at conversion-service: `, this);
//           reject([this]);
//         } else {
//           // console.log([this, response, usdAmount, targetCurrency]);
//           reject([this, response, usdAmount, targetCurrency]);
//         }
//         // try {
//         //   response = JSON.parse(this.responseText);
//         // }
//         // catch {
//         //   response.status
//         // }
//       });
//       request.open("GET", url, true);
//       request.send();
//     });
//   }
// }