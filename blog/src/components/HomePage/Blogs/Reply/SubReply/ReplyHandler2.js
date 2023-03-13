import Button from '../../../../UI/Button';
import MainReplyHandler from '../MainReply/MainReplyHandler';
import { useState, useContext } from 'react';
import ReplyInputForm from '../../../../UI/ReplyInputForm';
import axios from 'axios';
import BlogContext from '../../../../../context/blog-context';
import SubReplyHelper from './subReplyHelper';

const styles = {
  display: 'flex',
  gap: '20px',
  boxSizing: 'border-box',
  alignItems: 'center',
};
const ReplyHandler = ({ each, userId, ind, subReplies, onClickHandel2 }) => {
  const blogs = useContext(BlogContext);
  const [isReply, setIsReply] = useState(false);
  const [isSubReplyDisplay, setIsSubReplyDisplay] = useState(false);
  // const [subReplies, setSubReplies] = useState([]);
  const getData = (data) => {
    const sendData = { text: data, id: each._id };
    axios
      .post('/addSubReply', { data: sendData })
      .then((res) => {
        // setSubReplies(res.data.data.data.subReplies);
        blogs.setFetchBlogs((old) => !old);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ marginLeft: '20px' }}>
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
          name='Reply'
          setIsReply={setIsReply}
          name2={each.subReplies.length}
          onClickHandel={setIsSubReplyDisplay}
          id={each._id}
        />
      </div>
      {isReply && (
        <ReplyInputForm
          isReply={true}
          setIsReply={setIsReply}
          getData={getData}
        />
      )}

      {isSubReplyDisplay &&
        subReplies.map((e, ind) => (
          <SubReplyHelper
            each={e}
            key={e._id}
            userId={userId}
            mainReplyId={each._id}
            ind={ind}
          />
        ))}
    </div>
  );
};

export default ReplyHandler;
