import { Link } from "react-router-dom"
import styles from "./Dashboards.module.css"
import icon_correct from "../../assets/images/correct.svg"
import icon_export from "../../assets/images/export_activity.svg"
import Graphic from "../../components/Graphic/Graphic"
import Map from "../../assets/images/mapa-panorama.svg"
import Forecast from "../../components/Forecast/Forecast"

const mockData = {
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    expense: [500, 700, 300, 800, 600],
    income: [1000, 1200, 900, 1400, 1300]
  };

export function Dashboards(){

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
                        <p className={styles.title}>Clima Semanal</p>
                        <Forecast />
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
                        <div className={styles.title_more}>
                          <p className={styles.title}>Últimas atividades</p>
                          <Link to={'/inicial/ultimas_atividades'} className={styles.more}>Mais</Link>
                        </div>
                        <div className={styles.content_last_activities}>
                            <div className={styles.activity}>
                                <div className={`${styles.icon_activity} ${styles.icon_correct}`}>
                                    <img className={styles.imgs_activity} src={icon_correct} alt="icon_correct" />
                                </div>
                                <div className={styles.text_activity}>
                                    <p className={styles.data_activity}>Dados “ETAS” <span className={styles.gray}>preenchidos com</span><span className={styles.green}> sucesso!</span></p>
                                    <p className={styles.days}>1 dia atrás</p>
                                </div>
                            </div>
                            <div className={styles.linha_hr}>
                              <hr className={styles.hr_dash} />  
                            </div>
                            <div className={styles.activity}>
                                <div className={`${styles.icon_activity} ${styles.icon_correct}`}>
                                    <img className={styles.imgs_activity} src={icon_correct} alt="icon_correct" />
                                </div>
                                <div className={styles.text_activity}>
                                    <p className={styles.data_activity}>Dados “NA” <span className={styles.gray}>preenchidos com </span><span className={styles.green}>sucesso!</span></p>
                                    <p className={styles.days}>1 dia atrás</p>
                                </div>
                            </div>
                            <div className={styles.linha_hr}>
                              <hr className={styles.hr_dash}/>  
                            </div>
                            <div className={styles.activity}>
                                <div className={`${styles.icon_activity} ${styles.icon_export}`}>
                                    <img className={styles.imgs_activity} src={icon_export} alt="icon_export" />
                                </div>
                                <div className={styles.text_activity}>
                                    <p className={styles.data_activity}>Dados "NA" <span className={styles.gray}>exportados para Excel.</span></p>
                                    <p className={styles.days}>7 dias atrás</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mapview}>
                        <p className={styles.title}>Mapa de Curitiba</p>
                        <div className={styles.content_mapview}>
                            <Link to={"/inicial/mapa"}><img src={Map}></img></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
