import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import MapSpline from '../../components/MapSpline/MapSpline';
import Loading from '../../components/LoadingMap/LoadingMap'; // Certifique-se de que este componente está importado corretamente
import styles from './Map.module.css';

export function Map() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulando o tempo de carregamento
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000); // Duração do loading em milissegundos (5 segundos)

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <p className={styles.title}>Mapa de Curitiba</p>

                <div className={styles.map}>
                    {isLoading && (
                        <div className={styles.loadingContainer}>
                            <Loading duration={5} /> {/* O círculo de carregamento */}
                        </div>
                    )}
                    <MapSpline />
                </div>

                <p className={styles.captitle}>
                    {isLoading ? <Skeleton width="40%" /> : 'Legenda'}
                </p>

                <div className={styles.caption}>
                    {isLoading ? (
                        <>
                            <Skeleton width="100%" height={20} style={{ marginBottom: '10px' }} />
                            <Skeleton width="100%" height={20} style={{ marginBottom: '10px' }} />
                            <Skeleton width="100%" height={20} style={{ marginBottom: '10px' }} />
                            <Skeleton width="100%" height={20} style={{ marginBottom: '10px' }} />
                            <Skeleton width="100%" height={20} />
                        </>
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    );
}
