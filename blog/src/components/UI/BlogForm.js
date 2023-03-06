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
// BLOG FORM FOR SHARE AND EDIT
const InputForm = (props) => {
  const id = props.editFact ? props.editFact._id : null;
  const [text, setText] = useState(props.editFact ? props.editFact.text : '');
  const [source, setSource] = useState(
    props.editFact ? props.editFact.source : ''
  );
  const [category, setCategory] = useState(
    props.editFact ? props.editFact.category : ''
  );
  const textLength = text.length;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.editFact
      ? props.getData({ text, source, category, id })
      : props.getData({ text, source, category });
    props.editFact && props.setEditMode(false);
    setText('');
    setSource('');
    setCategory('');
    if (!props.editFact) {
      props.setAddBlog(false);
      props.setName('AddBlog');
    }
  };
  const onCancelHandler = (e) => {
    e.preventDefault();
    props.setEditMode(false);
  };
  return (
    <form className={classes.factForm} onSubmit={handleSubmit}>
      <textarea
        type='text'
        placeholder='Share a fact with the world... min 50 max 300'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{300 - textLength}</span>
      <input
        value={source}
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
      <button
        className={
          textLength > 300 || textLength < 50 ? classes.hide : classes.btn
        }
      >
        {props.editFact ? 'Update' : 'post'}
      </button>
      {props.editFact && (
        <button className={classes.btn} onClick={onCancelHandler}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default InputForm;
