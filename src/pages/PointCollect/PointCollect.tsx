import React from "react";
import styles from './PointCollect.module.css'


export function PointCollect(){
    return(
        <>
        <main className={styles.container}>
            <p className={styles.title}>Estações de Tratamento de Águas Subterrâneas</p>
            <div className={styles.main_information}>
                <div className={styles.left_side}>
                    <div className={styles.select_point_container}>
                        <p className={styles.select_point_title}>Selecione um ponto:</p>
                        <div className={styles.select_point_grid}>
                            <button className={styles.select_point}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>AG</span> - 02</p>
                                <pre className={styles.status_point}>Não preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>AG</span> - 04</p>
                                <pre className={styles.status_point}>Não preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>AG</span> - 05</p>
                                <pre className={styles.status_point}>Não preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>BC</span> - 01</p>
                                <pre className={styles.status_point}>preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>BH</span> - 02</p>
                                <pre className={styles.status_point}>Não preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>BS</span> - 01</p>
                                <pre className={styles.status_point}>preenchido    ⟶</pre>
                            </button>
                            <button className={styles.select_point}>
                                <p className={styles.name_point}><span className={styles.name_point_type}>BS</span> - 01</p>
                                <pre className={styles.status_point}>preenchido    ⟶</pre>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.right_side}>
                    <div className={styles.point_information}>
                        <p className={styles.point_information_text}>Ainda restam <span className={styles.point_information_number}>22</span> pontos para completar o arquivo ETAS</p>
                    </div>
                    <div className={styles.map_container}>
                        <p className={styles.map_title}>Localize seus pontos no mapa:</p>
                        <div className={styles.map}></div>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}