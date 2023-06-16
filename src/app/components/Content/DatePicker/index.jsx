import s from './DatePicker.module.css';
import { ArrowLeftIcon } from '../../IconsSVG/ArrowLeftIcon';
import { ArrowRightIcon } from '../../IconsSVG/ArrowRightIcon';
import { CalendarIcon } from '../../IconsSVG/CalendarIcon';

export const DatePicker = () => {
  return (
    <div className={s.date_picker}>
      <span className={s.left_arrow}>
        <ArrowLeftIcon />
      </span>

      <CalendarIcon />

      <span className={s.date}>3 дня</span>
      <span className={s.right_arrow}>
        <ArrowRightIcon />
      </span>
    </div>
  );
};
