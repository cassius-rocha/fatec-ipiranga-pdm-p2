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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '2rem',
                minHeight: '100vh',
            }}
        >
            <h2 style={{ marginBottom: '0.5rem' }}>Buscar Previsão do Tempo</h2>

            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Digite o nome da cidade"
                style={{
                    textAlign: 'center',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    marginBottom: '1rem'
                }}
            />

            <ForecastDisplay forecast={forecast} />
        </div>
    )
}

export default SearchWeather