import axios from 'axios';
import { useState } from 'react';
import Button from '../../../UI/Button';
import blogCss from './Blogs.module.css';

const x = 'rgb(77, 77, 77)';
const y = 'rgb(122, 122, 125)';

const VoteHandler = ({ user, each, setIsReply, setReplyDisplay }) => {
  const [actionData, getActionData] = useState({
    blogId: '',
    field: '',
    userId: '',
  });
  let dl, l, mb;
  if (user) {
    const { disLike, like, mindBlowing } = user.action;
    dl = disLike;
    l = like;
    mb = mindBlowing;
  }
  const onChangeHandler = (e) => {
    e.preventDefault();
    const element = document.getElementById(e.target.id);
    let action = false;
    const textVal = element.innerText.split(' ');
    if (element.style.backgroundColor === y) {
      action = true;
      textVal[1] = +textVal[1] + 1;
      element.style.backgroundColor = x;
    } else {
      action = false;
      textVal[1] = +textVal[1] - 1;
      element.style.backgroundColor = y;
    }
    element.innerText = textVal.join(' ');
    const { name, value } = e.target;
    getActionData({
      blogId: value,
      field: name,
      userId: user._id,
    });
    axios
      .post('/action', {
        blogId: value,
        field: name,
        userId: user._id,
        action,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={blogCss.thumb}>
      <button
        name='like'
        id={`${each._id} like`}
        value={each._id}
        onClick={onChangeHandler}
        //   style={{ backgroundColor: '#7a7a7d' }}
        style={{
          backgroundColor: l && l.includes(each._id) ? x : y,
        }}
      >
        👍 {each.like}
      </button>
      <button
        name='mindBlowing'
        id={`${each._id} mindBlowing`}
        value={each._id}
        onClick={onChangeHandler}
        //   style={{ backgroundColor: '#7a7a7d' }}
        style={{
          backgroundColor: mb && mb.includes(each._id) ? x : y,
        }}
      >
        🤠 {each.mindBlowing}
      </button>
      <button
        name='disLike'
        id={`${each._id} disLike`}
        value={each._id}
        onClick={onChangeHandler}
        //   style={{ backgroundColor: '#7a7a7d' }}
        style={{
          backgroundColor: dl && dl.includes(each._id) ? x : y,
        }}
      >
        ⛔️ {each.disLike}
      </button>
      <Button
        name='💬'
        setIsReply={setIsReply}
        name2={each.replies.length}
        id={each._id}
        onClickHandel={setReplyDisplay}
        style={{
          backgroundColor: y,
        }}
      />
    </div>
  );
};
export default VoteHandler;
