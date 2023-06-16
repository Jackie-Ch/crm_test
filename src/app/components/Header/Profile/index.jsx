import { ArrowDownIcon } from '../../IconsSVG/ArrowDownIcon';
import s from './Profile.module.css';

export const Profile = () => {
  const profileName = 'ИП Сидорова Александра Михайловна';

  return (
    <div className={s.profile}>
      <div className={s.profile_name}>{profileName}</div>
      <div>
        <ArrowDownIcon />
      </div>
    </div>
  );
};
