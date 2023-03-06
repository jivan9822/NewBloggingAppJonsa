import blogCss from './Blogs.module.css';
import { useState } from 'react';
import axios from 'axios';

const SubReplyPost = (props) => {
  //   console.log(props.id);
  const [reply, setReply] = useState('');
  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };
  const handleReplySubmit = (e) => {
    // console.log(reply);
    props.getReply({ id: props.id, reply, userName: props.user });
    axios
      .post('/addSubReply', { id: props.id, reply })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          alert('Session timeout! Please login again!');
          window.location.reload();
        }
      });
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
