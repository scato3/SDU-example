import { CardComponent as CardType } from '../types/component.types';
import styles from './components.module.scss';

type CardComponentProps = {
  component: CardType;
};

export const CardComponent = ({ component }: CardComponentProps) => {
  const { data } = component;

  return (
    <div className={styles.card}>
      {data.imageUrl && (
        <img src={data.imageUrl} alt={data.title} className={styles.cardImage} />
      )}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{data.title}</h3>
        <p className={styles.cardDescription}>{data.description}</p>
        {data.badges && data.badges.length > 0 && (
          <div className={styles.cardBadges}>
            {data.badges.map((badge) => (
              <span key={badge} className={styles.badge}>
                {badge}
              </span>
            ))}
          </div>
        )}
        {data.link && (
          <a href={data.link} className={styles.cardLink}>
            Learn more →
          </a>
        )}
      </div>
    </div>
  );
};
