import classes from './Display.module.css';

const DisplayReplyList = ({ showReplyList, replies }) => {
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
          {replies.map((each, index) => (
            <div key={each._id} className={classes.nestReplyDis}>
              <p
                className={classes.ptag}
                style={{ backgroundColor: CATEGORIES[index % 8] }}
              >
                {each.userName.toUpperCase().slice(0, 1)}
              </p>
              <div className={classes.headName}>
                <h4>{each.reply}</h4>
              </div>
              <button className={classes.btn}>
                <span id={each._id}>
                  <span>Reply</span> <span>{each.nestReply.length}</span>
                </span>
                <span id={each._id}>🔽</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default DisplayReplyList;
