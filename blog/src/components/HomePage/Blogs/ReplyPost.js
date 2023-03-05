import React, { useState } from 'react';
import blogCss from './Blogs.module.css';
import axios from 'axios';

const ReplyPost = ({
  setShowReplyForm,
  showReplyForm,
  handleReplyFormToggle,
  blogId,
}) => {
  const [reply, setReply] = useState('');
  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    axios
      .post('/addReply', { reply, blogId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setReply('');
    setShowReplyForm(false);
  };

  return (
    <>
      {showReplyForm && (
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
              onClick={handleReplyFormToggle}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ReplyPost;
