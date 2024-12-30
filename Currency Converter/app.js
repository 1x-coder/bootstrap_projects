// const axios = require("axios");
// import axios from "axios";
const form = document.querySelector("#form");
const showMessege = document.querySelector(".show-messege");

const fixer_api_key = "e2224f988ead83597e30e315435ec264";
const fixer_api = `http://data.fixer.io/api/latest?access_key=${fixer_api_key}`;
const rest_countries_api = `https://restcountries.eu/rest/v2/currency`;

// Display data to dom

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = document.querySelector(".amount").value;
  const from = document.querySelector(".from").value;
  const to = document.querySelector(".to").value;
  const data = convertCurrency(from, to, amount);
  console.log("submitr");
  data.then(
    (val) => (showMessege.innerHTML = `<h4 class="text-white">${val}</h4>`)
  );
});

// Fetch data about currencies

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const {
    data: { rates },
  } = await axios.get(fixer_api);

  const euro = 1 / rates[fromCurrency];
  const exchangeRate = euro * rates[toCurrency];
  return exchangeRate;
};

getExchangeRate("USD", "AUD");

// Fetch data about country

const getCountries = async (countryCode) => {
  const { data } = await axios.get(`${rest_countries_api}/${countryCode}`);

  return data.map(({ name }) => name);
};

// getCountries("AUD");

// Output

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  fromCurrency = fromCurrency.toUpperCase();
  toCurrency = toCurrency.toUpperCase();

  const [exchangeRate, countries] = await Promise.all([
    getExchangeRate(fromCurrency, toCurrency),
    getCountries(toCurrency),
  ]);

  //   const countries = await getCountries(toCurrency); 2s delay await just resolve the promise
  //   const exchangeRate = await getExchangeRate(fromCurrency, toCurrency) 2s delay so 2s is waste

  const convertedAmount = (amount * exchangeRate).toFixed(2);
  return `${amount} ${fromCurrency} is worth of ${convertedAmount} ${toCurrency}.`;
};

// convertCurrency("aud", "usd", 20).then((data) => console.log(data));

//  new style
// const result = await convertCurrency("inr", "usd", 10000);
// console.log(result);
