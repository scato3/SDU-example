import { BannerComponent as BannerType } from '../types/component.types';
import styles from './components.module.scss';

type BannerComponentProps = {
  component: BannerType;
};

export const BannerComponent = ({ component }: BannerComponentProps) => {
  const { data } = component;

  return (
    <div
      className={`${styles.banner} ${styles[`banner-${data.variant}`]}`}
      role="alert"
    >
      <p className={styles.bannerMessage}>{data.message}</p>
      {data.dismissible && (
        <button className={styles.bannerClose} aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  );
};
