import { useState, useContext } from 'react';
import axios from 'axios';
import ConfirmAlert from '../../../../AlertMsg/ConfirmAlert';
import BlogContext from '../../../../../context/blog-context';

const col = [
  'white',
  '#3b82f6',
  '#16a34a',
  '#ef4444',
  '#eab308',
  '#db2777',
  '#14b8a6',
  '#f97316',
  '#8b5cf6',
  '#881337',
];
const styles = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};
const style2 = {
  cursor: 'pointer',
};

const SubReplyHelper = ({ each, userId, mainReplyId, ind }) => {
  const blog = useContext(BlogContext);
  const [text, setText] = useState(each.text);
  const [isEdit, setEdit] = useState(false);

  const onChangeHandler = (e) => {
    setText(e.target.value);
    console.log(text);
  };
  const onEditHandler = (e) => {
    setEdit((old) => !old);
  };
  const onKeyPress = (e) => {
    if (e.key === 'Escape') {
      setEdit(false);
    }
    if (e.key === 'Enter') {
      setEdit(false);
      submitHandler(e);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('/updateSubReply', { mainReplyId, id: each._id, text })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDeleteHandler = (e) => {
    e.preventDefault();
    axios
      .post('/deleteSubReply', { mainReplyId, id: each._id })
      .then((res) => {
        console.log(res);
        blog.setFetchBlogs((old) => !old);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return each.userId === userId ? (
    <div style={styles}>
      <p>{each.userName}</p>
      <p onClick={onEditHandler} style={style2}>
        ✏️{' '}
      </p>

      {isEdit ? (
        <input
          type='text'
          value={text}
          onChange={onChangeHandler}
          onKeyDown={onKeyPress}
          autoFocus
        />
      ) : (
        <p
          style={{
            backgroundColor: col[ind % 10],
            padding: '3px',
          }}
          onClick={onEditHandler}
        >
          {text}
        </p>
      )}
      <ConfirmAlert name='❌' onClick={onDeleteHandler} />
    </div>
  ) : (
    <div style={styles}>
      <p>{each.userName}</p>
      <p>{each.text}</p>
    </div>
  );
};
export default SubReplyHelper;
