import React, { useState } from 'react';
import AxiosRequest from './AxiosRequest';
import axios from 'axios';

const EditForm = (props) => {
  const [content, setContent] = useState(props.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    if (window.confirm('Are u Sure!')) {
      AxiosRequest('/deleteMainReply', {
        id: e.target.id,
        reply: content,
        index: props.index,
      });
      window.location.reload();
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleContentSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/editMainReply', {
        id: e.target.id,
        reply: content,
        index: props.index,
      })
      .then((res) => {
        const data = res.data.data.reply;
        e.target.id = data._id;
        setContent(data.reply);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsEditing(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleContentSubmit(e);
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setContent(props.text);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type='text'
            value={content}
            id={props.id}
            onChange={handleContentChange}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        </div>
      ) : (
        <div>
          <span onClick={handleEditClick} style={{ cursor: 'pointer' }}>
            ✏️{content}
          </span>
          <span
            onClick={handleDeleteClick}
            id={props.id}
            style={{ cursor: 'pointer' }}
          >
            ❌
          </span>
        </div>
      )}
    </div>
  );
};

export default EditForm;
