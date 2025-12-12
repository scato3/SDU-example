import { ListComponent as ListType } from '../types/component.types';
import styles from './components.module.scss';

type ListComponentProps = {
  component: ListType;
};

export const ListComponent = ({ component }: ListComponentProps) => {
  const { data } = component;

  return (
    <div className={styles.list}>
      <h3 className={styles.listTitle}>{data.title}</h3>
      <ul className={styles.listItems}>
        {data.items.map((item) => (
          <li key={item.id} className={styles.listItem}>
            {item.icon && <span className={styles.listIcon}>{item.icon}</span>}
            <span className={styles.listText}>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
