import Button from '../../UI/Button';
import blogCss from './Blogs.module.css';
import { useState, useEffect } from 'react';
import EditBlog from '../ShareBlog/EditBlog';
import DeleteBlog from '../ShareBlog/DeleteBlog';

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

const Blogs = (props) => {
  const id = props.userData ? props.userData._id : null;
  const [editMode, setEditMode] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editFact, setEditFact] = useState(null);
  const fact = props.facts;

  return (
    <div>
      {deleteId && (
        <DeleteBlog
          setFacts={props.setFacts}
          id={deleteId}
          setDeleteId={setDeleteId}
        />
      )}
      {editMode ? (
        <EditBlog
          setEditMode={setEditMode}
          editFact={editFact}
          setFacts={props.setFacts}
        />
      ) : (
        <ul className={blogCss.ulBlogs}>
          {fact.map((each) => {
            return (
              <li key={each._id} className={blogCss.blogLi}>
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
                      <button>👍 {each.votesInteresting}</button>
                      <button>🤠 {each.votesMindblowing}</button>
                      <button>⛔️ {each.votesFalse}</button>
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
                          if (window.confirm('Are you sure?'))
                            setDeleteId(each._id);
                        }}
                      />
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Blogs;
