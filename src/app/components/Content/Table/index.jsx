import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCallList,
  getRecord,
  handleSortByDate,
} from '../../../../redux/features/sliceCallList';
import s from './Table.module.css';
import { AudioPlayer } from '../../AudioPlayer';
import _ from 'lodash';
import { IncomingCallIcon } from '../../IconsSVG/IncomingCallIcon';
import { OutgoingCallIcon } from '../../IconsSVG/OutgoingCallIcon';
import { MissedCallIcon } from '../../IconsSVG/MissedCallIcon';
import { Loader } from '../../Loader';

export const Table = () => {
  const [order, setOrder] = useState({
    desc: true,
  });
  const dispatch = useDispatch();
  const { callList, error, status } = useSelector((store) => store.callList);

  useEffect(() => {
    dispatch(getCallList());
    dispatch(getRecord());
  }, [dispatch]);

  if (status !== 'resolve') return <Loader />;

  const tableHeadings = [
    'Тип',
    'Время',
    'Сотрудник',
    'Звонок',
    'Источник',
    'Оценка',
    'Длительность',
  ];
  const callIcons = [
    {
      id: 1,
      name: 'incoming',
      icon: <IncomingCallIcon />,
    },
    {
      id: 0,
      name: 'outgoing',
      icon: <OutgoingCallIcon />,
    },
    {
      id: 2,
      name: 'missed',
      icon: <MissedCallIcon />,
    },
  ];

  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  const changeFormatDate = (callList, order) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    if (order) {
      return callList.map((call) => {
        return { ...call, date: new Date(call.date).getTime() };
      });
    }
    return callList.map((sortCall) => {
      return {
        ...sortCall,
        date: new Intl.DateTimeFormat('ru', options)
          .format(sortCall.date)
          .replace(
            /(\d{2})\.(\d{2})\.(\d{4}), (\d{2}:\d{2}:\d{2})/,
            '$3-$2-$1 $4'
          ),
      };
    });
  };

  const handleSort = (columnName) => {
    if (columnName === 'Время') {
      setOrder((prevState) => ({ ...prevState, desc: !prevState.desc }));
      const callListWithNumDate = changeFormatDate(callList, true);
      callListWithNumDate.sort(
        (a, b) => `${order.desc ? a.date - b.date : b.date - a.date}`
      );
      const sortedCallList = changeFormatDate(callListWithNumDate, false);
      dispatch(handleSortByDate(sortedCallList));
    } else if (columnName === 'Длительность') {
      setOrder((prevState) => ({ ...prevState, desc: !prevState.desc }));
      const callListCopy = [...callList];
      callListCopy.sort(
        (a, b) => `${order.desc ? a.time - b.time : b.time - a.time}`
      );
      dispatch(handleSortByDate(callListCopy));
    }
  };

  if (error) return <h2>Sorry, server occured! {error}</h2>;

  return (
    <table className={s.table}>
      <thead>
        <tr>
          {tableHeadings.map((tableHead, index) => (
            <th
              className={s.table_head}
              key={index}
              onClick={() => handleSort(tableHead)}
            >
              {tableHead}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {callList.map((item) => (
          <tr key={item.id}>
            <td className={s.table_data}>
              {callIcons.map((callIcons) => {
                if (callIcons.id === item.in_out)
                  return <span key={callIcons.id}>{callIcons.icon}</span>;
              })}
            </td>
            <td className={s.table_data}>{item.date.slice(11, 16)}</td>
            <td className={s.table_data}>
              {item.person_avatar ? (
                <img src={item.person_avatar} alt="avatar" />
              ) : (
                'нет аватара'
              )}
            </td>
            <td className={s.table_data}>{item.to_number}</td>
            <td className={s.table_data}>{item.source}</td>
            <td className={s.table_data}>{item.errors[0]}</td>
            <td className={s.table_data}>
              {item.time !== 0 ? (
                <>
                  <span className={s.audioplayer}>
                    <AudioPlayer />
                  </span>
                  <span className={s.time_records}>
                    {item.time === 0 ? '0:00' : getTime(item.time)}
                  </span>
                </>
              ) : (
                ''
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
