import blogCss from './Blogs.module.css';
import { useState } from 'react';
import axios from 'axios';
import AxiosRequest from '../../UI/AxiosRequest';

const SubReplyPost = (props) => {
  //   console.log(props.id);
  const [reply, setReply] = useState('');
  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      // Check if "Enter" key was pressed
      event.preventDefault(); // Prevent default form submit behavior
      handleReplySubmit(event); // Call your submit function
    }
  }
  const handleReplySubmit = (e) => {
    // console.log(reply);
    props.getReply({ id: props.id, reply, userName: props.user });
    AxiosRequest('/addSubReply', { id: props.id, reply });
    setReply('');
    props.onToggleFormHandler();
  };
  return (
    <>
      <div className={blogCss.replyDiv}>
        <input
          type='text'
          id='reply-input'
          name='reply'
          placeholder='Enter your reply:'
          value={reply}
          onChange={handleReplyChange}
          onKeyDown={handleKeyPress}
        />
        <div className={blogCss.replySubmitDiv}>
          <button
            type='button'
            className={blogCss.replyCancel}
            onClick={handleReplySubmit}
          >
            Reply
          </button>
          <button
            className={blogCss.replyCancel}
            type='button'
            onClick={() => props.onToggleFormHandler()}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
export default SubReplyPost;
