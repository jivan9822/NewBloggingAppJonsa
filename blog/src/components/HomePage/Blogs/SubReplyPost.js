import blogCss from './Blogs.module.css';
import { useState } from 'react';
import AxiosRequest from '../../UI/AxiosRequest';

const SubReplyPost = (props) => {
  //   console.log(props.id);
  const [reply, setReply] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
    if (e.target.value.length > 0) {
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
      props.onToggleFormHandler();
    } else if (event.key === 'Escape') {
      props.onToggleFormHandler();
    }
  }
  const handleReplySubmit = (e) => {
    // console.log(reply);
    props.getReply({ id: props.id, reply, userName: props.user.username });
    AxiosRequest('/addSubReply', { id: props.id, reply });
    setReply('');
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
          autoFocus
        />
        <div className={blogCss.replySubmitDiv}>
          {isSubmit && (
            <button
              type='button'
              className={blogCss.replyCancel}
              onClick={handleReplySubmit}
            >
              Reply
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default SubReplyPost;
