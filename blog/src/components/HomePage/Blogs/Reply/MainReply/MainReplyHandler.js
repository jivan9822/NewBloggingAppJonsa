import { useState } from 'react';
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
const MainReplyHandler = (props) => {
  console.log(props.id);
  const [text, setText] = useState(props.text);
  const [isEdit, setEdit] = useState(false);
  const onChangeHandler = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
  };
  const onKeyPress = (e) => {
    e.preventDefault();
    console.log(e.key);
    if (e.key === 'Escape') {
      setEdit(false);
    }
    if (e.key === 'Enter') {
    }
  };
  return (
    <div style={styles}>
      <p onClick={() => setEdit((old) => !old)}>✏️ </p>
      {isEdit ? (
        <input
          type='text'
          value={text}
          onChange={onChangeHandler}
          onKeyDown={onKeyPress}
        />
      ) : (
        <p
          style={{
            backgroundColor: col[props.ind % 10],
            padding: '3px',
          }}
        >
          {props.text}
        </p>
      )}
      <p> ❌</p>
    </div>
  );
};
export default MainReplyHandler;
