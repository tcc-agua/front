import React from "react";
import styles from "./Dashboards.module.css"

export function Dashboards(){
    return(
        <>
            <main className={styles.container}>
                <section className={styles.left_side}>
                    <div className={styles.updates}>
                        <div className={styles.title}>
                           <h1>Atualizações</h1> 
                        </div>
                        <div className={styles.content_updates}> {/* Corrigido para content_updates */}
                            <div className={styles.first_update}>
                                <p className={styles.point}>Poço PM 36</p>
                                <p className={styles.main_information}>PH menos ácido</p>
                                <p className={styles.extra_information}><span>↘ 13%</span> menor que na última semana</p>
                            </div>
                            <div className={styles.second_update}>
                                <p className={styles.point}>CD 24</p>
                                <p className={styles.main_information}>Volume superior</p>
                                <p className={styles.extra_information}><span>↗ 03%</span> maior que o esperado</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.weekly_weather}>
                        
                    </div>
                </section>
                <section className={styles.right_side}>

                </section>
            </main>
        </>
    )
}
