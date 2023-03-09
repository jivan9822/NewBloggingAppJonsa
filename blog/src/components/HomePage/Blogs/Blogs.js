import blogCss from './DisplayBlogs/Blogs.module.css';
import { useState } from 'react';
import UpdateBlog from './EditBlog/EditBlog';
import DeleteBlog from './DeleteBlog/DeleteBlog';
import BlogDisplay from './DisplayBlogs/DisplayBlog';

const Blogs = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editFact, setEditFact] = useState(null);

  return (
    <div>
      {deleteId && <DeleteBlog id={deleteId} setDeleteId={setDeleteId} />}
      {editMode ? (
        <UpdateBlog setEditMode={setEditMode} editFact={editFact} />
      ) : (
        <ul className={blogCss.ulBlogs}>
          {props.newArr.map((each, index) => {
            return (
              <BlogDisplay
                key={each._id}
                each={each}
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
