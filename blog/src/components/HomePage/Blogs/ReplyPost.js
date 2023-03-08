import React, { useState } from 'react';
import blogCss from './Blogs.module.css';
import axios from 'axios';

const ReplyPost = ({
  setShowReplyForm,
  showReplyForm,
  handleReplyFormToggle,
  blogId,
  setShowReplyList,
  setIsUpdate,
}) => {
  const [reply, setReply] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const handleReplyChange = (event) => {
    setReply(event.target.value);
    if (event.target.value.length > 0) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      // Check if "Enter" key was pressed
      event.preventDefault(); // Prevent default form submit behavior
      handleReplySubmit(event); // Call your submit function
    } else if (event.key === 'Escape') {
      handleReplyFormToggle();
    }
  }
  const handleReplySubmit = (event) => {
    event.preventDefault();
    // AxiosRequest('/addReply', { reply, blogId });
    axios
      .post('/addReply', { reply, blogId })
      .then((res) => {
        setIsUpdate((old) => !old);
      })
      .catch((err) => {
        console.log(err);
      });
    setReply('');
    setShowReplyForm(false);
    setShowReplyList(false);
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
            autoFocus
          />
          <div className={blogCss.replySubmitDiv}>
            {isSubmit && (
              <button
                type='button'
                name='addReply'
                className={blogCss.replySubmit}
                onClick={handleReplySubmit}
              >
                Reply
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ReplyPost;
