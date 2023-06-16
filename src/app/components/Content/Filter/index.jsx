import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleOpenFilter,
  handleActiveFilterMenu,
  handleResetFilters,
  handleFilterList,
} from '../../../../redux/features/sliceCallList';
import { SearchIcon } from '../../IconsSVG/SearchIcon';
import { CrossIcon } from '../../IconsSVG/CrossIcon';
import { ArrowDownIcon } from '../../IconsSVG/ArrowDownIcon';

export const Filter = () => {
  const dispatch = useDispatch();
  const { filterList } = useSelector((state) => state.callList);
  const filterIsActive = filterList.filter(
    (filterItem) => filterItem.activeMenu
  );

  return (
    <div className={s.filter_panel}>
      <div className={s.filter_search}>
        <span className={s.filter_search_icon}>
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Поиск по звонкам"
          className={s.filter_search_input}
        />
      </div>
      {filterIsActive.length ? (
        <div
          className={s.reset_filters}
          onClick={() => dispatch(handleResetFilters())}
        >
          Сбросить фильтры
          <span className={s.reset_filters_icon}>
            <CrossIcon />
          </span>
        </div>
      ) : (
        ''
      )}
      <div className={s.filter_list}>
        {filterList.map(({ id, isOpen, activeMenu, menuList }) => (
          <div
            className={`${s.filter_list_item} ${
              activeMenu !== 0 ? s.active : ''
            }`}
            key={id}
            onClick={() => {
              dispatch(handleOpenFilter(id));
            }}
          >
            {menuList[activeMenu]}
            {isOpen && (
              <ul className={s.filter_menu}>
                {menuList.map((item, index) => (
                  <li
                    className={s.filter_menu_item}
                    key={index}
                    onClick={() => {
                      dispatch(handleFilterList({ index, id }));
                      dispatch(handleActiveFilterMenu({ index, id }));
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <span className={s.filter_icon}>
              <ArrowDownIcon />
            </span>
            <svg
              className={s.filter_icon}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.90008 0.601167L9.39911 0.100235C9.33236 0.0333416 9.25546 0 9.16853 0C9.08181 0 9.00494 0.0333416 8.93819 0.100235L5.00005 4.03816L1.06209 0.100341C0.995301 0.033447 0.918439 0.000105232 0.831611 0.000105232C0.744747 0.000105232 0.667886 0.033447 0.601132 0.100341L0.100235 0.601308C0.0333416 0.668061 0 0.744922 0 0.831786C0 0.91858 0.0334469 0.995441 0.100235 1.06219L4.76957 5.73164C4.83633 5.79843 4.91322 5.8318 5.00005 5.8318C5.08688 5.8318 5.16364 5.79843 5.23036 5.73164L9.90008 1.06219C9.96683 0.995406 10 0.918545 10 0.831786C10 0.744922 9.96683 0.668061 9.90008 0.601167Z"
                fill="#ADBFDF"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};
