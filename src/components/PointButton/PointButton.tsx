import React from 'react';
import styles from "./PointButton.module.css"

interface PointButtonProps {
  onClick: () => void;
  title: string;
  percentage: string;
  points: number;
  filledText: string;
  pointsText: string;
  containerClass: string;
  titleClass: string;
  percentageClass: string;
  pointsClass: string;
}

const PointButton: React.FC<PointButtonProps> = ({
  onClick,
  title,
  percentage,
  points,
  filledText,
  pointsText,
  containerClass,
  titleClass,
  percentageClass,
  pointsClass,
}) => {
  return (
    <button onClick={onClick} className={containerClass}>
      <div className={titleClass}>
        <p className={styles.title_data}>{title}</p>
      </div>
      <div className={styles.percentage_and_points}>
        <div className={percentageClass}>
          <p className={styles.percentage}>{percentage}</p>
          <p className={styles.complement}>{filledText}</p>
        </div>
        <div className={pointsClass}>
          <p className={styles.points}>{points}</p>
          <p className={styles.complement}>{pointsText}</p>
        </div>
      </div>
    </button>
  );
};

export default PointButton;
