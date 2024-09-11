import styles from './Forecast.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Definir os tipos das previsões diárias
interface Forecast {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

// Definir o tipo do estado de forecastData
type ForecastData = Forecast[] | null;

const Forecast = () => {
  const [forecastData, setForecastData] = useState<ForecastData>(null);

  const weatherDescriptions: { [key: string]: string } = {
    "clear sky": "Céu limpo",
    "few clouds": "Poucas nuvens",
    "scattered clouds": "Nuvens dispersas",
    "broken clouds": "Nuvens quebradas",
    "shower rain": "Chuva de banho",
    "rain": "Chuva",
    "thunderstorm": "Tempestade",
    "snow": "Neve",
    "mist": "Névoa",
    "light rain": "Chuva fraca",
    "overcast clouds": "Nublado",
  };

  async function searchCity() {
    const city = "Curitiba";
    const key = "43690f4d63e7b31353de8212c8f43283";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;

    try {
      const { data } = await axios.get(url);
      const dailyForecasts: Forecast[] = [];
      const usedDays = new Set<number>();

      data.list.forEach((forecast: Forecast) => {
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

  const getDayOfWeek = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  };

  const getDayClass = (dayOfWeek: number): string => {
    switch (dayOfWeek) {
      case 1: return styles.seg;
      case 2: return styles.ter;
      case 3: return styles.qua;
      case 4: return styles.qui;
      case 5: return styles.sex;
      case 6: return styles.sab;
      case 0: return styles.dom;
      default: return '';
    }
  };

  return (
    <div>
      {forecastData ? (
        <div className={styles.content_weather}>
          {forecastData.map((forecast, index) => {
            const dayOfWeek = new Date(forecast.dt_txt).getDay();
            const dayClass = getDayClass(dayOfWeek);
            return (
              <div className={`${styles.weekday} ${dayClass}`} key={index}>
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
            );
          })}
        </div>
      ) : (
        <p className={styles.carregando}>Carregando...</p>
      )}
    </div>
  );
};

export default Forecast;
