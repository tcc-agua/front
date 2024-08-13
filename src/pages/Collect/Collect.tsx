import { Outlet } from "react-router-dom";
import styles from  './Collect.module.css'

export function Collect(){
    return(
        <main className={styles.container_all}>
        <section className={styles.up_side}>
            <div>
                <p>Insira os <span className={styles.data_color}>dados</span> atualizados do ponto que acabou de coletar!</p>
            </div>
            <div>
                <input
                    className={styles.search_bar}
                    type="text"
                    // value={}
                    // onChange={}
                    placeholder="Procure o ponto que deseja adicionar novos dados aqui!"
                />
            </div>
            <div>
                <p>Selecione:</p>
            </div>
        </section>

        <section className={styles.down_side}>
            <div className={styles.side_left}>
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

            <div className={styles.side_right}>
                <div>
                    <p>Pontos Recentes</p>
                </div>

                <div>
                    <p>AG - 02</p>
                </div>
                <div>
                    <p>TQ - 01</p>
                </div>
                <div>
                    <p>PM - 21</p>
                </div>
                <div>
                    <p>PM - 56</p>
                </div>
                <div>
                    <p>PT - 09</p>
                </div>
            </div>
        </section>
            
        
        <Outlet/>
        </main>
    )
}