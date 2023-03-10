import { useState } from 'react';

const ReplyInputForm = (props) => {
  // props (isReply={isReply} setIsReply={setIsReply} getData={getData})
  const [disabled, setDisable] = useState(true);
  const [text, setText] = useState();
  const onChangeHandler = (e) => {
    if (e.target.value.length > 2) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setText(e.target.value);
  };
  const onKeyHandler = (e) => {
    if (e.key === 'Escape') {
      props.setIsReply(false);
    }
    if (e.key === 'Enter') {
      submitHandler(e);
    }
  };
  const submitHandler = (e) => {
    props.getData(text);
    props.setIsReply(false);
  };
  const styles = {
    backgroundColor: disabled ? '#334155' : '#A21CAF',
    width: '10%',
    marginLeft: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: '10px',
    color: 'white',
  };
  const styles2 = {
    display: 'flex',
  };
  return (
    <div>
      {props.isReply && (
        <div style={styles2}>
          <input
            type='text'
            autoFocus
            onChange={onChangeHandler}
            onKeyDown={onKeyHandler}
          />
          <button disabled={disabled} style={styles} onClick={submitHandler}>
            Reply
          </button>
        </div>
      )}
    </div>
  );
};
export default ReplyInputForm;
