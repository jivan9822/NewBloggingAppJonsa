import blogCss from './Blogs.module.css';
import axios from 'axios';
import Button from '../../../UI/Button';
import { useContext, useState } from 'react';
import UserContext from '../../../../context/user-context';
import VoteHandler from './VoteHandler';
import ReplyInputForm from '../../../UI/ReplyInputForm';
import BlogContext from '../../../../context/blog-context';
import DisplayMainReply from '../Reply/MainReply/MainReplyDisplay';

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
  { name: 'others', color: '#881337' },
];

const BlogDisplay = ({
  each,
  setEditMode,
  setEditFact,
  setDeleteId,
  setAddBlog,
  setName,
}) => {
  const blog = useContext(BlogContext);
  const userData = useContext(UserContext);
  // console.log(blog);
  const [isReply, setIsReply] = useState(false);
  const [isDisplayReply, setReplyDisplay] = useState(false);
  const getData = (data) => {
    console.log(data, each._id);
    // console.log(blog.fact.find((e) => e._id === each._id));
    axios
      .post('/addReply', {
        text: data,
        blogId: each._id,
        userId: userData.user._id,
        userName: userData.user.username,
      })
      .then((res) => {
        console.log(res);
        blog.setFetchBlogs((old) => !old);
      })
      .catch((err) => {
        console.log(err);
        window.alert('Session timeout Please Login');
        window.location.reload();
      });
  };
  const id = userData.user ? userData.user._id : null;
  return (
    <li className={blogCss.blogLi}>
      <p className={blogCss.txt}>
        {each.text}
        <a href={each.source} rel='noreferrer' target='_blank'>
          <span style={{ color: 'blueviolet' }}>(Source)</span>
          <span>{each.pubLishedAt.substring(0, 10)}</span>
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
          <VoteHandler
            user={userData.user}
            each={each}
            setIsReply={setIsReply}
            setReplyDisplay={setReplyDisplay}
          />
        </div>
        <div className={blogCss.editDeleteBtn}>
          {id === each.user && (
            <Button
              onClick={() => {
                setEditMode(true);
                setEditFact(each);
                setAddBlog(false);
                setName('AddBlog');
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
      <div className={blogCss.replyInput}>
        <ReplyInputForm
          isReply={isReply}
          setIsReply={setIsReply}
          getData={getData}
        />
        {isDisplayReply && <DisplayMainReply id={each._id} userId={id} />}
      </div>
    </li>
  );
};
export default BlogDisplay;
