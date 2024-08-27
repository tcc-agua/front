import styles from "./Dashboards.module.css"
import icon_correct from "../../assets/images/correct.svg"
import icon_export from "../../assets/images/export_activity.svg"
import Graphic from "../../components/Graphic/Graphic"
import MapSpline from "../../components/MapSpline/MapSpline"
import { useState, useEffect } from 'react';
import axios from 'axios';

const mockData = {
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    expense: [500, 700, 300, 800, 600],
    income: [1000, 1200, 900, 1400, 1300]
  };

export function Dashboards(){
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
  
        data.list.forEach(forecast => {
          const date = new Date(forecast.dt_txt);
          const dayOfWeek = date.getDay();
  
          if (dayOfWeek >= 1 && dayOfWeek <= 5 && !usedDays.has(dayOfWeek)) {
            dailyForecasts.push(forecast);
            usedDays.add(dayOfWeek);
            console.log(dayOfWeek)
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
      console.log(date);
      return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    };

    const getDayClass = (dayOfWeek) => {
        switch (dayOfWeek) {
            case 1: return styles.seg;
            case 2: return styles.ter;
            case 3: return styles.qua;
            case 4: return styles.qui;
            case 5: return styles.sex;
            default: return '';
        }
    };

    return(
        <>
            <div className={styles.container}>
                <div className={styles.left_side}>
                    <div className={styles.updates}>
                        <p className={styles.title}>Atualizações</p>
                        <div className={styles.content_updates}>
                            <div className={styles.first_update}>
                                <p className={styles.point}>Poço PM 36</p> 
                                <p className={styles.main_information}>PH menos ácido</p> 
                                <p className={styles.extra_information}><pre><span className={styles.extra}>↘ 13%</span>  menor que na última semana</pre></p>
                            </div>
                            <div className={styles.second_update}>
                                <p className={styles.point}>CD 24</p>
                                <p className={styles.main_information}>Volume superior</p>
                                <p className={styles.extra_information}><pre><span className={styles.extra}>↗ 03%</span>  maior que o esperado</pre></p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.weekly_weather}>
                        {forecastData ? (
                        <>
                            <div className={styles.title}>
                            <p>Clima Semanal</p>
                            </div>
                            <div className={styles.content_weather}>
                            {forecastData.map((forecast, index) => (
                                <div className={styles.weekday} key={index}>
                                <div>
                                    <p className={styles.title_weekday}>{getDayOfWeek(forecast.dt_txt)}</p>
                                    <p className={styles.temperature}>
                                    {(forecast.main.temp - 273.15).toFixed(2)}°C
                                    </p>
                                    <p className={styles.climate}>
                                    {weatherDescriptions[forecast.weather[0].description] || forecast.weather[0].description}
                                    </p>
                                </div>
                                </div>
                            ))}
                            </div>
                        </>
                        ) : (
                        <p>Carregando...</p>
                        )}
                    </div>

                    <div className={styles.graphic}>
                        <p className={styles.title}>Gráfico</p>
                        <div className={styles.grafico}>
                            <Graphic chartDataProp={mockData} />
                        </div>
                    </div>
                    
                </div>
                <div className={styles.right_side}>
                    <div className={styles.last_activities}>
                        <p className={styles.title}>Últimas atividades</p>
                        <div className={styles.content_last_activities}>
                            <div className={styles.activity}>
                                <div className={`${styles.icon_activity} ${styles.icon_correct}`}>
                                    <img className={styles.imgs_activity} src={icon_correct} alt="icon_correct" />
                                </div>
                                <div className={styles.text_activity}>
                                    <p>Dados “ETAS” <span className={styles.gray}>preenchidos com</span><span className={styles.green}> sucesso!</span></p>
                                    <p className={styles.days}>1 dia atrás</p>
                                </div>
                            </div>
                            <div className={styles.linha_hr}>
                              <hr />  
                            </div>
                            <div className={styles.activity}>
                                <div className={`${styles.icon_activity} ${styles.icon_correct}`}>
                                    <img className={styles.imgs_activity} src={icon_correct} alt="icon_correct" />
                                </div>
                                <div className={styles.text_activity}>
                                    <p>Dados “NA” <span className={styles.gray}>preenchidos com </span><span className={styles.green}>sucesso!</span></p>
                                    <p className={styles.days}>1 dia atrás</p>
                                </div>
                            </div>
                            <div className={styles.linha_hr}>
                              <hr />  
                            </div>
                            <div className={styles.activity}>
                                <div className={`${styles.icon_activity} ${styles.icon_export}`}>
                                    <img className={styles.imgs_activity} src={icon_export} alt="icon_export" />
                                </div>
                                <div className={styles.text_activity}>
                                    <p>Dados "NA" <span className={styles.gray}>exportados para Excel.</span></p>
                                    <p className={styles.days}>7 dias atrás</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mapview}>
                        <p className={styles.title}>Mapa de Curitiba</p>
                        <div className={styles.content_mapview}>
                            <MapSpline />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
