import styles from "./Dashboards.module.css"
import icon_correct from "../../assets/images/correct.svg"
import icon_export from "../../assets/images/export_activity.svg"

export function Dashboards(){
    return(
        <>
            <div className={styles.container}>
                <div className={styles.left_side}>
                    <div className={styles.updates}>
                        <div className={styles.title}>
                           <h2>Atualizações</h2> 
                        </div>
                        <div className={styles.content_updates}> 
                            <div className={styles.first_update}>
                                <p className={styles.point}>Poço PM 36</p>
                                <p className={styles.main_information}>PH menos ácido</p>
                                <p className={styles.extra_information}><span className={styles.extra}>↘ 13%</span> menor que na última semana</p>
                            </div>
                            <div className={styles.second_update}>
                                <p className={styles.point}>CD 24</p>
                                <p className={styles.main_information}>Volume superior</p>
                                <p className={styles.extra_information}><span className={styles.extra}>↗ 03%</span> maior que o esperado</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.weekly_weather}>
                        <div className={styles.title}>
                            <h2>Clima Semanal</h2>
                        </div>
                        <div className={styles.content_weather}>
                            <div className={styles.weekday}>
                                <div className={styles.seg}>
                                    <p className={styles.title_weekday}>Seg</p>
                                    <p className={styles.temperature}>32°C</p>
                                    <p className={styles.climate}>Ensolarado</p>
                                </div>
                            </div>
                            <div className={styles.weekday}>
                                <div className={styles.ter}>
                                    <p className={styles.title_weekday}>Ter</p>
                                    <p className={styles.temperature}>26°C</p>
                                    <p className={styles.climate}>Ensolarado</p>
                                </div>
                            </div>
                            <div className={styles.weekday}>
                                <div className={styles.qua}>
                                    <p className={styles.title_weekday}>Qua</p>
                                    <p className={styles.temperature}>24°C</p>
                                    <p className={styles.climate}>Nublado</p>
                                </div>
                            </div>
                            <div className={styles.weekday}>
                                <div className={styles.qui}>
                                    <p className={styles.title_weekday}>Qui</p>
                                    <p className={styles.temperature}>28°C</p>
                                    <p className={styles.climate}>Nublado</p>
                                </div>
                            </div>
                            <div className={styles.weekday}>
                                <div className={styles.sex}>
                                    <p className={styles.title_weekday}>Sex</p>
                                    <p className={styles.temperature}>25°C</p>
                                    <p className={styles.climate}>Chuvoso</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.graphic}>
                        <div className={styles.title}>
                           <h2>Gráfico</h2> 
                        </div>
                    </div>
                    
                </div>
                <div className={styles.right_side}>
                    <div className={styles.last_activities}>
                        <div className={styles.title}>
                           <h2>Últimas atividades</h2> 
                        </div>
                        <div className={styles.content_last_activities}>
                            <div className={styles.activity}>
                                <div className={`${styles.icon_activity} ${styles.icon_correct}`}>
                                    <img className={styles.imgs_activity} src={icon_correct} alt="icon_correct" />
                                </div>
                                <div className={styles.text_activity}>
                                    <h4>Dados “ETAS” <span className={styles.gray}>preenchidos com</span><span className={styles.green}> sucesso!</span></h4>
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
                                    <h4>Dados “NA” <span className={styles.gray}>preenchidos com </span><span className={styles.green}>sucesso!</span></h4>
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
                                    <h4>Dados "NA" <span className={styles.gray}>exportados para Excel.</span></h4>
                                    <p className={styles.days}>7 dias atrás</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mapview}>
                        <div className={styles.title}>
                           <h2>Mapa de Curitiba</h2> 
                        </div>
                        <div className={styles.content_mapview}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
