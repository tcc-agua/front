import MapSpline from '../../components/MapSpline/MapSpline';
import styles from './Map.module.css';

export function Map() {
    return (
        <>
            <div className={styles.main}>

                <div className={styles.container}>
                    <p className={styles.title}>Mapa de Curitiba</p>

                    <div className={styles.map}>
                        <MapSpline />
                    </div>

                    <p className={styles.captitle}>Legenda</p>
                    <div className={styles.caption}>

                        <div className={styles.points}>

                            <div className={styles.pointsContent}>
                                <div className={styles.azulclaro}></div>
                                <p className={styles.subtitle}>Caixas D’água (CD)</p>
                            </div>

                            <div className={styles.pointsContent}>
                                <div className={styles.azulescuro}></div>
                                <p className={styles.subtitle}>Poços de Bombeamento (PB)</p>
                            </div>

                            <div className={styles.pointsContent}>
                                <div className={styles.verdeagua}></div>
                                <p className={styles.subtitle}>Poços de Monitoramento (PM)</p>
                            </div>

                            <div className={styles.pointsContent}>
                                <div className={styles.verde}></div>
                                <p className={styles.subtitle}>Poços de Tratamento (PT)</p>
                            </div>

                            <div className={styles.pointsContent}>
                                <div className={styles.roxo}></div>
                                <p className={styles.subtitle}>Tanque (TQ)</p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}