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
  const [data, setData] = useState({
    text: props.editFact ? props.editFact.text : '',
    source: props.editFact ? props.editFact.source : '',
    category: props.editFact ? props.editFact.category : 'others',
  });

  const textLength = data.text.length;
  const styles = {
    backgroundColor: isSubmit ? '#3e003c' : '#3e003c4a',
    cursor: isSubmit ? 'pointer' : 'not-allowed',
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
    if (data.text.length > 19) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.editFact ? props.getData({ data, id }) : props.getData({ data });
    props.editFact && props.setEditMode(false);

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
        value={data.text}
        onChange={onChangeHandler}
      />
      <span className={classes.count}>{500 - textLength}</span>
      <input
        value={data.source}
        name='source'
        type='text'
        placeholder='Trustworthy source...'
        onChange={onChangeHandler}
      />
      {/* <select value={category} onChange={(e) => setCategory(e.target.value)}> */}
      <select value={data.category} name='category' onChange={onChangeHandler}>
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
