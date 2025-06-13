const axios = require('axios')

const weatherClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
})

module.exports = weatherClient