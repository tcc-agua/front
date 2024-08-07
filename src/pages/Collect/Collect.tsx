import { Outlet } from "react-router-dom";
import styles from  './Collect.module.css'

export function Collect(){
    return(
        <>
        <div>
            <div>
                <p>Insira os <span>dados</span> atualizados do ponto que acabou de coletar!</p>
            </div>
            <div className={styles.search_navbar}>

            </div>
            <div>
                <p>Selecione:</p>
            </div>

            <div>
                <div className={styles.card_um}>
                    <div>
                        <p className={styles.detail1}>Estações de Tratamento de Água S.</p>
                        <div></div>
                    </div>
                    <div>
                        <p><span className={styles.detail1}>40%</span> Preenchido</p>
                    </div>
                    <div>
                        <p><span className={styles.detail1}>24</span> Pontos</p>
                    </div>
                </div>

                <div className={styles.card_dois}>
                    <div>
                        <p className={styles.detail2}>Nível D'água</p>
                    </div>
                    <div>
                        <p><span className={styles.detail2}>10%</span> Preenchido</p>
                    </div>
                    <div>
                        <p><span className={styles.detail2}>22</span> Pontos</p>
                    </div>
                </div>

                <div className={styles.card_tres}>
                    <div>
                        <p className={styles.detail3}>Poços de Bombeamento</p>
                    </div>
                    <div>
                        <p><span className={styles.detail3}>75%</span> Preenchido</p>
                    </div>
                    <div>
                        <p><span className={styles.detail3}>09</span> Pontos</p>
                    </div>
                </div>
            </div>
        </div>
        <Outlet/>
        </>
    )
}