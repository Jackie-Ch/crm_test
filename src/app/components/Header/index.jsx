import { CurrentDate } from './CurrentDate';
import { CallAnalytics } from './CallAnalytics';
import { Search } from './Search';
import { Profile } from './Profile';
import { Avatar } from './Avatar';
import s from './Header.module.css';

export const Header = () => {
  return (
    <header className={s.header}>
      <CurrentDate />
      <CallAnalytics />
      <Search />
      <Profile />
      <Avatar />
    </header>
  );
};
