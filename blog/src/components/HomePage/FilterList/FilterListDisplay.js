import classes from './FilterList.module.css';
// CATEGORIES ARRAY WITH RESPECTIVE COLOR
const CATEGORIES = [
  { name: 'All', color: 'white' },
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
  { name: 'others', color: '#881337' },
];

const FilterListDisplay = (props) => {
  const onClickHandler = (e) => {
    // SENDING FILTER NAME TO HOME.JS
    props.getFilterName(e.target.id);
    e.preventDefault();
  };
  return (
    <div className={classes.catMainDiv}>
      {CATEGORIES.map((each, ind) => {
        return (
          <p
            key={ind}
            className={classes.catEle}
            id={each.name}
            onClick={onClickHandler}
            style={{ backgroundColor: each.color }}
          >
            {each.name}
          </p>
        );
      })}
    </div>
  );
};
export default FilterListDisplay;
