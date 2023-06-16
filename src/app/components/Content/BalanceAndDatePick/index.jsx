import { Balance } from '../Balance';
import { DatePicker } from '../DatePicker';
import s from './BalanceAndDatePick.module.css';

export const BalanceAndDatePick = () => {
  return (
    <div className={s.BalanceAndDatePick}>
      <Balance />
      <DatePicker />
    </div>
  );
};
