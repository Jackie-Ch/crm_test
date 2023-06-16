import { SearchIcon } from '../../IconsSVG/SearchIcon';
import s from './Search.module.css';

export const Search = () => {
  return (
    <div className={s.system_search}>
      <input type="text" className={s.system_search_input} />
      <span className={s.system_search_icon}>
        <SearchIcon />
      </span>
    </div>
  );
};
