import blogCss from './Blogs.module.css';
import { useState } from 'react';
import EditBlog from '../ShareBlog/EditBlog';
import DeleteBlog from '../ShareBlog/DeleteBlog';
import axios from 'axios';
import BlogDisplay from './DisplayBlog';

const Blogs = (props) => {
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
              <BlogDisplay
                key={each._id}
                each={each}
                userData={props.userData}
                setEditMode={setEditMode}
                setEditFact={setEditFact}
                setDeleteId={setDeleteId}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Blogs;
