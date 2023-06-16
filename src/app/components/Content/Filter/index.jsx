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
          </div>
        ))}
      </div>
    </div>
  );
};
