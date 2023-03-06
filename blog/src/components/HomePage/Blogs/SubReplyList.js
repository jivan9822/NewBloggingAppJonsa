import classes from './Display.module.css';
import SubReplyPost from './SubReplyPost';
import { useState } from 'react';
import ShowSubReplyList from './ShowSubReplyList';
import EditForm from '../../UI/EditForm';

const SubReplyList = ({ each, color, user }) => {
  // //
  // const [content, setContent] = useState('Click to edit');
  // const [isEditing, setIsEditing] = useState(false);

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };

  // const handleContentSubmit = (e) => {
  //   e.preventDefault();
  //   setIsEditing(false);
  // };
  // //

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplyList, setShowReplyList] = useState(false);
  const onToggleFormHandler = (e) => {
    setShowReplyForm(!showReplyForm);
  };
  const onToggleReplyList = (e) => {
    setShowReplyList(!showReplyList);
  };
  const getReply = (reply) => {
    each.nestReply.push(reply);
  };
  return (
    <div>
      <div className={classes.nestReplyDis}>
        <div className={classes.namePDiv}>
          <p className={classes.ptag} style={{ backgroundColor: color }}>
            {each.userName.toUpperCase().slice(0, 1)}
          </p>
          <p style={{ color: 'orangered' }}>{each.userName}</p>
        </div>
        <div className={classes.headName}>
          <EditForm text={each.reply} id={each._id} />
        </div>
        <button className={classes.btn}>
          <span id={each._id}>
            <span className={classes.replyIcon} onClick={onToggleFormHandler}>
              Reply ✍
            </span>{' '}
            <span>{each.nestReply ? each.nestReply.length : 0}</span>
          </span>
          <span id={each._id} onClick={onToggleReplyList}>
            🔽
          </span>
        </button>
      </div>
      {showReplyForm && (
        <SubReplyPost
          onToggleFormHandler={onToggleFormHandler}
          id={each._id}
          user={user}
          getReply={getReply}
        />
      )}
      {showReplyList && (
        <ShowSubReplyList
          subReplyList={each.nestReply ?? []}
          id={each._id}
          color={color}
          user={each.userName}
        />
      )}
    </div>
  );
};
export default SubReplyList;
