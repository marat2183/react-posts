import s from './index.module.scss';
const Loader = () => {
  return (
    <div className={s['loader']}>
      <ul className={s['loader__dots-list']}>
        <li className={s['loader__dots-list-item']}></li>
        <li className={s['loader__dots-list-item']}></li>
        <li className={s['loader__dots-list-item']}></li>
      </ul>
    </div>
  );
};

export default Loader;
