const cors = require('cors')
const daysOfWeek = require('./utils/daysOfWeek');
const express = require('express')
const app = express()
const weatherClient = require('./utils/weatherClient')

require('dotenv').config()

app.use(cors())

app.get('/previsao', async (req, res) => {
  const city = req.query.city

  const result = await weatherClient.get('forecast', {
    params: {
      q: city,
      appid: process.env.OPENWEATHER_API_KEY,
      lang: 'pt_br',
      units: 'metric'
    }
  })

  const forecasts = result.data.list.map(item => {
    const date = new Date(item.dt * 1000)
    const weekDay = daysOfWeek[date.getDay()]
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')

    return {
      date: item.dt,
      formattedDate: `${weekDay}, ${hour}:${minute}`,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
      humidity: item.main.humidity,
      icon: item.weather[0].icon,
      description: item.weather[0].description
    }
  })

  res.json(forecasts)
})

const port = 3000
app.listen(port, () => console.log(`Back End OK! Porta ${port}.`))