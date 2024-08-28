import styles from './Forecast.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Forecast = () => {
  const [forecastData, setForecastData] = useState(null);

  const weatherDescriptions = {
    "clear sky": "céu limpo",
    "few clouds": "poucas nuvens",
    "scattered clouds": "nuvens dispersas",
    "broken clouds": "nuvens quebradas",
    "shower rain": "chuva de banho",
    "rain": "chuva",
    "thunderstorm": "tempestade",
    "snow": "neve",
    "mist": "névoa",
  };

  async function searchCity() {
    const city = "Curitiba";
    const key = "43690f4d63e7b31353de8212c8f43283";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;

    try {
      const { data } = await axios.get(url);
      const dailyForecasts = [];
      const usedDays = new Set();

      data.list.forEach((forecast) => {
        const date = new Date(forecast.dt_txt);
        const dayOfWeek = date.getDay();

        if (!usedDays.has(dayOfWeek)) {
          dailyForecasts.push(forecast);
          usedDays.add(dayOfWeek);
        }
      });

      setForecastData(dailyForecasts);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }

  useEffect(() => {
    searchCity();
  }, []);

  const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  };

  const getDayClass = (dayOfWeek) => {
    switch (dayOfWeek) {
      case 1: return styles.seg;
      case 2: return styles.ter;
      case 3: return styles.qua;
      case 4: return styles.qui;
      case 5: return styles.seg;
      case 6: return styles.qua;
      case 0: return styles.ter;
      default: return '';
    }
  };

  return (
    <div>
      {forecastData ? (
        <>
          <div className={styles.title}>
            <h2>Clima Semanal</h2>
          </div>
          <div className={styles.content_weather}>
            {forecastData.map((forecast, index) => {
              const dayOfWeek = new Date(forecast.dt_txt).getDay();
              const dayClass = getDayClass(dayOfWeek);
              return (
                <div className={`${styles.weekday} ${dayClass}`} key={index}>
                  <div>
                    <p className={styles.title_weekday}>
                      {getDayOfWeek(forecast.dt_txt)}
                    </p>
                    <p className={styles.temperature}>
                      {Math.floor((forecast.main.temp - 273.15))}°C
                    </p>
                    <p className={styles.climate}>
                      {weatherDescriptions[forecast.weather[0].description] ||
                        forecast.weather[0].description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Forecast;
