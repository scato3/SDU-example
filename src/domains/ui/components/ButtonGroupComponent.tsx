import { ButtonGroupComponent as ButtonGroupType } from '../types/component.types';
import styles from './components.module.scss';

type ButtonGroupComponentProps = {
  component: ButtonGroupType;
};

export const ButtonGroupComponent = ({
  component,
}: ButtonGroupComponentProps) => {
  const { data } = component;

  return (
    <div className={styles.buttonGroup}>
      {data.buttons.map((button) => (
        <a
          key={button.id}
          href={button.url}
          className={`${styles.button} ${styles[`button-${button.variant}`]}`}
        >
          {button.label}
        </a>
      ))}
    </div>
  );
};
