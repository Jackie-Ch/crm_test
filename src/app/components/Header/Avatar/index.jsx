import { ArrowDownIcon } from '../../IconsSVG/ArrowDownIcon';
import s from './Avatar.module.css';

export const Avatar = () => {
  const avatar = <img src="../../../../avatar.png" alt="avatar" />;

  return (
    <div className={s.avatar}>
      <div> {avatar}</div>
      <div>
        <ArrowDownIcon />
      </div>
    </div>
  );
};
