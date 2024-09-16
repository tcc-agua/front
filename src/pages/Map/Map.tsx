import { useState, useEffect } from 'react';
import MapSpline from '../../components/MapSpline/MapSpline';
import Loading from '../../components/LoadingMap/LoadingMap';
import styles from './Map.module.css';

export function Map() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para a categoria selecionada

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category) => {
    // Se já está selecionada, deseleciona; caso contrário, seleciona
    setSelectedCategory(selectedCategory === category ? null : category);
  };

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
          <MapSpline selectedCategory={selectedCategory} />
        </div>

        <div className={styles.caption}>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <div className={styles.points}>
              <div className={styles.pointsContent} onClick={() => handleCategoryClick('CD')}>
                <div className={styles.azulclaro}></div>
                <p className={styles.subtitle}>Caixas D’água (CD)</p>
              </div>
              <div className={styles.pointsContent} onClick={() => handleCategoryClick('PB')}>
                <div className={styles.azulescuro}></div>
                <p className={styles.subtitle}>Poços de Bombeamento (PB)</p>
              </div>
              <div className={styles.pointsContent} onClick={() => handleCategoryClick('PM')}>
                <div className={styles.verdeagua}></div>
                <p className={styles.subtitle}>Poços de Monitoramento (PM)</p>
              </div>
              <div className={styles.pointsContent} onClick={() => handleCategoryClick('PT')}>
                <div className={styles.roxo}></div>
                <p className={styles.subtitle}>Poços de Tratamento (PT)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
