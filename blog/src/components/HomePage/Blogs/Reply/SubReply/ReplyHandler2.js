import Button from '../../../../UI/Button';
import MainReplyHandler from '../MainReply/MainReplyHandler';
import { useState, useContext } from 'react';
import ReplyInputForm from '../../../../UI/ReplyInputForm';
import axios from 'axios';
import BlogContext from '../../../../../context/blog-context';
import SubReplyHelper from './subReplyHelper';
import classes from './ReplyHandler2.module.css';

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
        if (err.response.status === 401) {
          window.location.reload();
        }
      });
  };
  return (
    <li className={classes.liDiv}>
      <div className={classes.liDiv2}>
        <div className={classes.userName}>{each.userName.slice(0, 1)}</div>
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
    </li>
  );
};

export default ReplyHandler;
