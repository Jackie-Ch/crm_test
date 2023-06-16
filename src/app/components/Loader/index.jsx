import s from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={s.loader}>
      <span className={s.spinner}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7"
            stroke="#002CFB"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className={s.loader_text}>Загружаем</span>
    </div>
  );
};
