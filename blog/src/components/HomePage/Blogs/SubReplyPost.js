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
        />
        <div className={blogCss.replySubmitDiv}>
          <input
            type='submit'
            name='submit'
            className={blogCss.replySubmit}
            onClick={handleReplySubmit}
          />
          <button
            className={blogCss.replyCancel}
            type='button'
            onClick={() => props.onToggleFormHandler()}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
export default SubReplyPost;