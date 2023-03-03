import { useState } from 'react';
import classes from './BlogForm.module.css';

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

const InputForm = (props) => {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const textLength = text.length;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.getData({ text, source, category });
  };
  const onCancelHandler = (e) => {
    e.preventDefault();
    props.setEditMode(false);
  };
  return (
    <form className={classes.factForm} onSubmit={handleSubmit}>
      <textarea
        type='text'
        placeholder='Share a fact with the world...'
        value={(props.editFact && props.editFact.text) || props.text || text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        value={
          (props.editFact && props.editFact.source) || props.source || source
        }
        type='text'
        placeholder='Trustworthy source...'
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className={classes.btn}>Post</button>
      {props.editFact && (
        <button className={classes.btn} onClick={onCancelHandler}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default InputForm;
