import s from './CurrentDate.module.css';

export const CurrentDate = () => {
  const currentDateStatic = 'Среда, 13 окт';
  const options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDate = new Date();
  const date = new Intl.DateTimeFormat('ru', options).format(currentDate);

  return <div className={s.currentDate}>{currentDateStatic}</div>;
};
