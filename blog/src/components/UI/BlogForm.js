import { useState } from 'react';
import classes from './BlogForm.module.css';
import Button from './Button';

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
  const [isSubmit, setIsSubmit] = useState(false);
  const [text, setText] = useState(props.editFact ? props.editFact.text : '');
  const [source, setSource] = useState(
    props.editFact ? props.editFact.source : ''
  );
  const [category, setCategory] = useState(
    props.editFact ? props.editFact.category : ''
  );
  const textLength = text.length;

  const styles = {
    backgroundColor: isSubmit ? '#3e003c' : '#3e003c4a',
    cursor: isSubmit ? 'pointer' : 'not-allowed',
  };
  const onChangeHandler = (e) => {
    console.log(e.target.name);
    e.target.name === 'text' && setText(e.target.value);
    e.target.name === 'source' && setSource(e.target.value);
    e.target.name === 'category' && setCategory(e.target.value);
    if (props.editFact) {
      setIsSubmit(true);
    } else {
      if (
        text.length > 19 &&
        source.length > 2 &&
        e.target.name === 'category'
      ) {
        setIsSubmit(true);
      } else {
        setIsSubmit(false);
      }
    }
  };
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
      props.setAddBlog((old) => !old);
      props.setName((old) => (old === 'Cancel' ? 'AddBlog' : 'Cancel'));
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
        name='text'
        placeholder='Share a fact with the world...Min Char 20'
        value={text}
        onChange={onChangeHandler}
      />
      <span className={classes.count}>{500 - textLength}</span>
      <input
        value={source}
        name='source'
        type='text'
        placeholder='Trustworthy source...'
        onChange={onChangeHandler}
      />
      {/* <select value={category} onChange={(e) => setCategory(e.target.value)}> */}
      <select value={category} name='category' onChange={onChangeHandler}>
        <option value=''>Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <Button
        className={props.editFact ? classes.btn2 : classes.btn}
        disable={!isSubmit}
        style={styles}
        name={props.editFact ? 'Update' : 'post'}
      />
      {props.editFact && (
        <Button
          className={classes.btn2}
          name='Cancel'
          onClick={onCancelHandler}
        />
      )}
    </form>
  );
};

export default InputForm;
