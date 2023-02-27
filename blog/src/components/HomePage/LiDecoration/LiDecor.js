import dec from './Dec.module.css';

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

const LeDeco = (props) => {
  return (
    <div className={dec.catMainDiv}>
      {CATEGORIES.map((each, ind) => {
        return (
          <p
            key={ind}
            className={dec.catEle}
            style={{ backgroundColor: each.color }}
          >
            {each.name}
          </p>
        );
      })}
    </div>
  );
};
export default LeDeco;
