import { useEffect, useState } from 'react'
import axios from 'axios'
import ForecastDisplay from '../ForecastDisplay/ForecastDisplay'

function SearchWeather() {
    const [city, setCity] = useState('São Paulo')
    const [forecast, setForecast] = useState([])
    const [timer, setTimer] = useState(null)

    useEffect(() => {
        if (city.length < 3) return

        if (timer) clearTimeout(timer)

        const newTimer = setTimeout(() => {
            axios.get(`http://localhost:3000/previsao?city=${city}`)
                .then(response => {
                    setForecast(response.data)
                })
                .catch(error => {
                    console.error('Erro ao buscar previsões:', error)
                    setForecast([])
                })
        }, 2000)

        setTimer(newTimer)

        return () => clearTimeout(newTimer)
    }, [city])

    return (
        <div className="flex flex-column align-items-center justify-content-center p-4 min-h-screen">
            <h2 className="mb-2">Buscar Previsão do Tempo</h2>

            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Digite o nome da cidade"
                className="text-center p-2 text-base w-full max-w-20rem border-round-lg border-none mb-3"
            />

            <ForecastDisplay forecast={forecast} />
        </div>
    )
}

export default SearchWeather