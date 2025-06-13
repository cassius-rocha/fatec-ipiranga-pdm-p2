import { Card } from 'primereact/card'
import striptags from 'striptags'

function ForecastDisplay({ forecast }) {
    if (!forecast || forecast.length === 0) {
        return <p>Nenhuma previsão disponível.</p>
    }

    return (
        <div className="flex flex-wrap justify-content-center gap-3 mt-3">
            {forecast.map((item, index) => {
                const iconUrl = `https://openweathermap.org/img/wn/${item.icon}@2x.png`
                return (
                    <Card
                        key={index}
                        title=""
                        className="w-15rem text-center"
                    >
                        <div className="mt-3 font-bold">
                            <p className="m-0 mb-2">{item.formattedDate}</p>
                        </div>

                        <div className="bg-blue-100 p-2 border-round-lg flex flex-column align-items-center mt-3">
                            <img
                                src={iconUrl}
                                alt={striptags(item.description)}
                                className="w-6rem"
                            />
                            <p className="mt-2 mb-0">{striptags(item.description)}</p>
                        </div>

                        <div className="mt-3 font-medium">
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