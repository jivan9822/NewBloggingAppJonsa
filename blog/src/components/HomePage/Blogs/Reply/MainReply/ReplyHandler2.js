import Button from '../../../../UI/Button';
import MainReplyHandler from './MainReplyHandler';
import { useState } from 'react';
import ReplyInputForm from '../../../../UI/ReplyInputForm';

const styles = {
  display: 'flex',
  gap: '20px',
  boxSizing: 'border-box',
  alignItems: 'center',
};
const ReplyHandler = ({ each, userId, ind }) => {
  const [isReply, setIsReply] = useState(false);
  const getData = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div key={each._id} style={styles}>
        <div style={{ color: 'orangered' }}>{each.userName}</div>
        {each.userId === userId ? (
          <MainReplyHandler
            text={each.text}
            ind={ind}
            id={each._id}
            setIsReply={setIsReply}
            subReplies={each.subReplies ? each.subReplies : []}
          />
        ) : (
          <p>{each.text}</p>
        )}
        <Button
          name='💬'
          setIsReply={setIsReply}
          name2={each.subReplies.length}
          id={each._id}
          style={{}}
        />
      </div>
      {isReply && (
        <ReplyInputForm
          isReply={true}
          setIsReply={setIsReply}
          getData={getData}
        />
      )}
    </div>
  );
};

export default ReplyHandler;
