import React, { useState } from 'react';
import blogCss from './Blogs.module.css';
import axios from 'axios';
import AxiosRequest from '../../UI/AxiosRequest';

const ReplyPost = ({
  setShowReplyForm,
  showReplyForm,
  handleReplyFormToggle,
  blogId,
  replies,
  userName,
}) => {
  const [reply, setReply] = useState('');

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      // Check if "Enter" key was pressed
      event.preventDefault(); // Prevent default form submit behavior
      handleReplySubmit(event); // Call your submit function
    }
  }
  const handleReplySubmit = (event) => {
    replies.push({ _id: Math.random().toString(), userName, reply, blogId });
    event.preventDefault();
    AxiosRequest('/addReply', { reply, blogId });
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
            onKeyDown={handleKeyPress}
          />
          <div className={blogCss.replySubmitDiv}>
            <button
              type='button'
              name='addReply'
              className={blogCss.replySubmit}
              onClick={handleReplySubmit}
            >
              Reply
            </button>
            <button
              className={blogCss.replyCancel}
              type='button'
              onClick={handleReplyFormToggle}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ReplyPost;
