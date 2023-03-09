import blogCss from './Blogs.module.css';
import Button from '../../../UI/Button';
import { useState, useContext } from 'react';
import UserContext from '../../../../context/user-context';
import VoteHandler from './VoteHandler';

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

const BlogDisplay = ({ each, setEditMode, setEditFact, setDeleteId }) => {
  const userData = useContext(UserContext);
  const id = userData.user ? userData.user._id : null;
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
          <VoteHandler user={userData.user} each={each} />
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
    </li>
  );
};
export default BlogDisplay;
