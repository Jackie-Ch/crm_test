import { LogoIcon } from '../IconsSVG/LogoIcon';
import s from './Logo.module.css';

export const Logo = () => {
  return (
    <div className={s.logo}>
      <LogoIcon />
    </div>
  );
};
