import { Card } from 'primereact/card'
import striptags from 'striptags'

function ForecastDisplay({ forecast }) {
    if (!forecast || forecast.length === 0) {
        return <p>Nenhuma previsão disponível.</p>
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1rem'
        }}>
            {forecast.map((item, index) => {
                const iconUrl = `https://openweathermap.org/img/wn/${item.icon}@2x.png`
                return (
                    <Card
                        key={index}
                        title=""
                        style={{ width: '200px', textAlign: 'center' }}
                    >
                        <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                            <p style={{ margin: '0 0 0.5rem 0' }}>{item.formattedDate}</p>
                        </div>                    

                        <div style={{
                            backgroundColor: '#dbeafe',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '1rem'
                        }}>
                            <img src={iconUrl} alt={striptags(item.description)} style={{ width: '80px' }} />
                            <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{striptags(item.description)}</p>
                        </div>

                        <div style={{ marginTop: '1rem', fontWeight: 500 }}>
                            <p>Temp. Mín: {item.temp_min}°C</p>
                            <p>Temp. Máx: {item.temp_max}°C</p>
                            <p>Umidade: {item.humidity}%</p>
                        </div>

                    </Card>
                )
            })}
        </div>
    )
}

export default ForecastDisplay