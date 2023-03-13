import { useState, useContext } from 'react';
import axios from 'axios';
import BlogContext from '../../../../../context/blog-context';
import ConfirmAlert from '../../../../AlertMsg/ConfirmAlert';

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
  gap: '20px',
  boxSizing: 'border-box',
  alignItems: 'center',
};
const style2 = {
  cursor: 'pointer',
};
const MainReplyHandler = (props) => {
  const blog = useContext(BlogContext);
  const [text, setText] = useState(props.text);
  const [isEdit, setEdit] = useState(false);
  const onChangeHandler = (e) => {
    setText(e.target.value);
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
      .post('/updateReply', { text, id: props.id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          window.location.reload();
        }
      });
  };

  const onDeleteHandler = (e) => {
    e.preventDefault();
    axios
      .post('/deleteReply', { id: props.id })
      .then((res) => {
        console.log(res);
        blog.setFetchBlogs((old) => !old);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          window.location.reload();
        }
      });
  };
  return (
    <div>
      <div style={styles}>
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
              backgroundColor: col[props.ind % 10],
              padding: '3px',
            }}
            onClick={onEditHandler}
          >
            {text}
          </p>
        )}
        <ConfirmAlert name='❌' onClick={onDeleteHandler} />
      </div>
    </div>
  );
};
export default MainReplyHandler;
