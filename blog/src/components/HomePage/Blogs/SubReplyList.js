import classes from './Display.module.css';
import SubReplyPost from './SubReplyPost';
import { useState } from 'react';
import ShowSubReplyList from './ShowSubReplyList';
import EditForm from '../../UI/EditForm';

const SubReplyList = ({
  each,
  color,
  user,
  userId,
  replyUser,
  setIsUpdate,
}) => {
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
          {/* console.log(user._id); console.log(each.userId); */}
          <EditForm
            text={each.reply}
            id={each._id}
            user={user}
            userId={userId}
            replyUser={replyUser}
            setIsUpdate={setIsUpdate}
          />
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
          setIsUpdate={setIsUpdate}
          setShowReplyList={setShowReplyList}
        />
      )}
      {showReplyList && (
        <ShowSubReplyList
          setShowReplyList={setShowReplyList}
          subReplyList={each.nestReply ?? []}
          setIsUpdate={setIsUpdate}
          id={each._id}
          color={color}
          user={each.userName}
          userId={userId}
          onToggleReplyList={onToggleReplyList}
        />
      )}
    </div>
  );
};
export default SubReplyList;
