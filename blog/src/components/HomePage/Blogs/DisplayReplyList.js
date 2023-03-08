import classes from './Display.module.css';
import SubReplyList from './SubReplyList';

const DisplayReplyList = ({
  showReplyList,
  replies,
  user,
  setIsUpdate,
  setShowReplyList,
}) => {
  const CATEGORIES = [
    '#3b82f6',
    '#16a34a',
    '#ef4444',
    '#eab308',
    '#db2777',
    '#14b8a6',
    '#f97316',
    '#8b5cf6',
    '#16a34a',
    '#ef4444',
  ];
  return (
    <>
      {showReplyList && (
        <div className={classes.ulReply}>
          {replies.reverse().map((each, index) => (
            <div key={index}>
              <SubReplyList
                each={each}
                color={CATEGORIES[index % 8]}
                user={user}
                userId={user._id}
                replyUser={each.userId}
                setIsUpdate={setIsUpdate}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default DisplayReplyList;
