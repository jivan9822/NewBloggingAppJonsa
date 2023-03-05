import blogCss from './Blogs.module.css';
import Button from '../../UI/Button';
import { useState } from 'react';
import axios from 'axios';
import ReplyPost from './ReplyPost';
import DisplayReplyList from './DisplayReplyList';

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

const BlogDisplay = ({
  each,
  userData,
  setEditMode,
  setEditFact,
  setDeleteId,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplyList, setShowReplyList] = useState(false);
  const id = userData ? userData._id : null;
  const handleReplyFormToggle = (e) => {
    setShowReplyForm(!showReplyForm);
  };
  const handleReplyListToggle = (e) => {
    setShowReplyList(!showReplyList);
  };
  const [actionData, getActionData] = useState({
    blogId: '',
    field: '',
    userId: '',
  });
  let dl, l, mb;
  if (userData) {
    const { disLike, like, mindBlowing } = userData.action;
    dl = disLike;
    l = like;
    mb = mindBlowing;
  }
  const onChangeHandler = (e) => {
    e.preventDefault();
    const element = document.getElementById(e.target.id);
    let action = false;
    const textVal = element.innerText.split(' ');
    if (element.style.backgroundColor === 'rgb(122, 122, 125)') {
      action = true;
      textVal[1] = +textVal[1] + 1;
      element.style.backgroundColor = 'rgb(77, 77, 77)';
    } else {
      action = false;
      textVal[1] = +textVal[1] - 1;
      element.style.backgroundColor = 'rgb(122, 122, 125)';
    }
    element.innerText = textVal.join(' ');
    const { name, value } = e.target;
    getActionData({
      blogId: value,
      field: name,
      userId: userData._id,
    });
    axios
      .post('/action', {
        blogId: value,
        field: name,
        userId: userData._id,
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
    <li className={blogCss.blogLi}>
      <p className={blogCss.txt}>
        {each.text}
        <a href={each.source} rel='noreferrer' target='_blank'>
          (Source)
        </a>
      </p>
      <div className={blogCss.secondDiv}>
        <div className={blogCss.secondDiv2}>
          <span
            className={blogCss.caTegory}
            style={{
              backgroundColor: CATEGORIES.find(
                (cat) => cat.name === each.category
              ).color,
            }}
          >
            {each.category}
          </span>
          <div className={blogCss.thumb}>
            <div>
              <button>
                <span
                  id={each._id}
                  className={blogCss.replyHover}
                  onClick={handleReplyFormToggle}
                >
                  ✍
                </span>
                <span id={each._id} onClick={handleReplyListToggle}>
                  <span>{each.reply ? each.reply.length : 0}</span> 🔽
                </span>
              </button>
            </div>
            <button
              name='like'
              id={`${each._id} like`}
              value={each._id}
              onClick={onChangeHandler}
              style={{
                backgroundColor:
                  l && l.includes(each._id)
                    ? 'rgb(77, 77, 77)'
                    : 'rgb(122, 122, 125)',
              }}
            >
              👍 {each.like}
            </button>
            <button
              name='mindBlowing'
              id={`${each._id} mindBlowing`}
              value={each._id}
              onClick={onChangeHandler}
              style={{
                backgroundColor:
                  mb && mb.includes(each._id)
                    ? 'rgb(77, 77, 77)'
                    : 'rgb(122, 122, 125)',
              }}
            >
              🤠 {each.mindBlowing}
            </button>
            <button
              name='disLike'
              id={`${each._id} disLike`}
              value={each._id}
              onClick={onChangeHandler}
              style={{
                backgroundColor:
                  dl && dl.includes(each._id)
                    ? 'rgb(77, 77, 77)'
                    : 'rgb(122, 122, 125)',
              }}
            >
              ⛔️ {each.disLike}
            </button>
          </div>
        </div>
        <div className={blogCss.editDeleteBtn}>
          {id === each.user && (
            <Button
              onClick={() => {
                setEditMode(true);
                setEditFact(each);
              }}
              name='✏️'
            />
          )}
          {id === each.user && (
            <Button
              name='❌'
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm('Are you sure?')) setDeleteId(each._id);
              }}
            />
          )}
        </div>
      </div>
      <ReplyPost
        setShowReplyForm={setShowReplyForm}
        showReplyForm={showReplyForm}
        handleReplyFormToggle={handleReplyFormToggle}
        blogId={each._id}
      />
      <DisplayReplyList
        showReplyList={showReplyList}
        blogId={each._id}
        replies={each.reply}
      />
    </li>
  );
};
export default BlogDisplay;
