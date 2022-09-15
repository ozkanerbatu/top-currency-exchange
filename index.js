const axios = require("axios").default

const BASE_URL = "https://api.exchangerate.host"
const BASE_CURRENCY = "TRY"

const nowYear = new Date().getFullYear()
const mount = new Date().getMonth() + 1
const day = new Date().getDate()

const lastYear = 10

const getCurrencies = async (date) => {
    return await axios.get(`${BASE_URL}/${date}-${mount}-${day}?base=${BASE_CURRENCY.toUpperCase()}`)
        .then((response) => {
            return response.data.rates
        }).catch((error) => {
            console.log(error);
        })
}

(async function findMostIncreasedCurrencyBetweenTwoYears(date) {
    await getCurrencies(date)
        .then(async (data) => {
            await getCurrencies(date + 1)
                .then((data2) => {
                    let mostIncreasedCurrency = ""
                    let mostIncreasedCurrencyValue = -Infinity
                    for (const x in data) {
                        for (const y in data2) {
                            if (x === y) {
                                const increase = ((data2[y] - data[x]) / data[x]) * 100
                                if (increase > mostIncreasedCurrencyValue) {
                                    mostIncreasedCurrency = x
                                    mostIncreasedCurrencyValue = increase
                                }
                            }
                        }
                    }
                    console.log(`${date} - ${date + 1}  ${mostIncreasedCurrency} ${mostIncreasedCurrencyValue.toFixed(2)} ${BASE_CURRENCY} `)
                })
        })
    if (nowYear - 1 !== date) {
        findMostIncreasedCurrencyBetweenTwoYears(date + 1)
    }
})(nowYear - lastYear)
