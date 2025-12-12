/**
 * Hero Component
 *
 * CLAUDE.md 규칙:
 * - UI 렌더링 + 이벤트 처리에만 집중
 * - 비즈니스/가공 로직 금지
 * - props 타입 필수
 */

import { HeroComponent as HeroType } from '../types/component.types';
import styles from './components.module.scss';

type HeroComponentProps = {
  component: HeroType;
};

export const HeroComponent = ({ component }: HeroComponentProps) => {
  const { data } = component;

  return (
    <div className={styles.hero}>
      <img src={data.imageUrl} alt={data.title} className={styles.heroImage} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{data.title}</h1>
        <p className={styles.heroSubtitle}>{data.subtitle}</p>
        {data.ctaText && data.ctaUrl && (
          <a href={data.ctaUrl} className={styles.heroCta}>
            {data.ctaText}
          </a>
        )}
      </div>
    </div>
  );
};
