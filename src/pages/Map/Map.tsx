import MapSpline from '../../components/MapSpline/MapSpline';
import styles from './Map.module.css';

export function Map() {
    return (
        <>
            <div className={styles.main}>

                <div className={styles.container}>
                    <h1 className={styles.title}>Mapa de Curitiba</h1>

                    <div className={styles.map}>
                        <MapSpline />
                    </div>

                    <h1 className={styles.captitle}>Legenda</h1>
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