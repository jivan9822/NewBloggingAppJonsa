import Button from '../../UI/Button';
import blogCss from './Blogs.module.css';
import { useState } from 'react';
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
  const [actionData, getActionData] = useState({
    blogId: '',
    field: '',
    userId: '',
  });
  // const [cursor, setCursor] = useState('pointer');

  const onChangeHandler = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    const element = document.getElementById(e.target.id);
    element.style.cursor = 'not-allowed';

    const textVal = element.innerText.split(' ');
    textVal[1] = +textVal[1] + 1;
    // console.log(textVal);
    element.innerText = textVal;
    const { name, value } = e.target;
    getActionData({
      blogId: value,
      field: name,
      userId: props.userData._id,
    });
  };
  console.log(actionData);
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
          {fact.map((each, index) => {
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
                    {/* <button className={blogCss.reply}>Reply 0</button> */}
                    <div className={blogCss.thumb}>
                      <button
                        name='like'
                        id={`${each._id} like`}
                        value={each._id}
                        onClick={onChangeHandler}
                        disabled={false}
                      >
                        👍 {each.votesInteresting}
                      </button>
                      <button
                        name='mindBlowing'
                        id={`${each._id} mindBlowing`}
                        value={each._id}
                        onClick={onChangeHandler}
                        disabled={false}
                      >
                        🤠 {each.votesMindblowing}
                      </button>
                      <button
                        name='disLike'
                        id={`${each._id} disLike`}
                        value={each._id}
                        onClick={onChangeHandler}
                        disabled={false}
                      >
                        ⛔️ {each.votesFalse}
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
