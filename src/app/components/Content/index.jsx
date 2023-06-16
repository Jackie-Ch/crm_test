import { Header } from '../Header';
import { BalanceAndDatePick } from './BalanceAndDatePick';
import { Filter } from './Filter';
import { Table } from './Table';
import s from './Content.module.css';

export const Content = () => {
  return (
    <div>
      <Header />
      <div className={s.content}>
        <BalanceAndDatePick />
        <Filter />
        <Table />
      </div>
    </div>
  );
};
