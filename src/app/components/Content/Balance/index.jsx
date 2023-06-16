import { PlusIcon } from '../../IconsSVG/PlusIcon';
import s from './Balance.module.css';

export const Balance = () => {
  const balance = 242;

  return (
    <div className={s.balance_button}>
      Баланс:<span className={s.balance_count}>{`${balance} `}&#8381;</span>
      <span className={s.plus}>
        <PlusIcon />
      </span>
    </div>
  );
};
