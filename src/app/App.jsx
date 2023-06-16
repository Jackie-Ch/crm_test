import { Content } from './components/Content';
import { NavBar } from './components/NavBar';

import s from './App.module.css';

export const App = () => {
  return (
    <div className={s.wrapper}>
      <NavBar />
      <Content />
    </div>
  );
};
