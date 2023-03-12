import Button from '../../../../UI/Button';
import MainReplyHandler from '../MainReply/MainReplyHandler';
import { useState, useContext } from 'react';
import ReplyInputForm from '../../../../UI/ReplyInputForm';
import axios from 'axios';
import BlogContext from '../../../../../context/blog-context';

const styles = {
  display: 'flex',
  gap: '20px',
  boxSizing: 'border-box',
  alignItems: 'center',
};
const ReplyHandler = ({ each, userId, ind, subReplies, onClickHandel2 }) => {
  const blogs = useContext(BlogContext);
  const [isReply, setIsReply] = useState(false);
  const [isSubReplyDisplay, setIsSubReplyDisplay] = useState(true);
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
          onClickHandel={setIsSubReplyDisplay}
          id={each._id}
          style={{
            backgroundColor: 'rgb(122, 122, 125)',
            borderRadius: '30px',
          }}
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
        subReplies.map((each) => {
          return each.userId === userId ? (
            <div
              key={each._id}
              style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              <span>✏️ </span>
              <p>{each.text}</p>
              <span> ❌</span>
            </div>
          ) : (
            <div key={each._id}>
              <p>{each.text}</p>
            </div>
          );
        })}
    </div>
  );
};

export default ReplyHandler;
