import s from "./CallAnalytics.module.css";

export const CallAnalytics = () => {
  const newCallsMax = 30;
  const newCallsCurrent = 20;
  let newCallsPercent = (newCallsCurrent / newCallsMax) * 100;
  const callsQuality = 40;
  const coversionPercent = 67;

  return (
    <div className={s.call_analytics}>
      <div className={s.new_calls}>
        Новые звонки
        <span
          className={s.new_calls_color}
        >{` ${newCallsCurrent} из ${newCallsMax} шт`}</span>
        <div className={s.bar}>
          <span
            className={`${s.bar_fill} ${s.bar_newCalls_color}`}
            style={{ width: `${newCallsPercent}%` }}
          ></span>
        </div>
      </div>
      <div className={s.calls_quality}>
        Качество разговоров
        <span className={s.calls_quality_color}>{` ${callsQuality}%`}</span>
        <div className={s.bar}>
          <span
            className={`${s.bar_fill} ${s.bar_quality_color}`}
            style={{ width: `${callsQuality}%` }}
          ></span>
        </div>
      </div>
      <div className={s.conversion}>
        Конверсия в заказ
        <span className={s.conversion_color}>{` ${coversionPercent}%`}</span>
        <div className={s.bar}>
          <span
            className={`${s.bar_fill} ${s.bar_conversion_color}`}
            style={{ width: `${coversionPercent}%` }}
          ></span>
        </div>
      </div>
    </div>
  );
};
