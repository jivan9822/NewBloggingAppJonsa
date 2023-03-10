import blogCss from './DisplayBlogs/Blogs.module.css';
import { useState } from 'react';
import UpdateBlog from './EditBlog/EditBlog';
import DeleteBlog from './DeleteBlog/DeleteBlog';
import BlogDisplay from './DisplayBlogs/DisplayBlog';

const Blogs = (props) => {
  const [deleteId, setDeleteId] = useState(null);
  const [editFact, setEditFact] = useState(null);

  return (
    <div>
      {deleteId && <DeleteBlog id={deleteId} setDeleteId={setDeleteId} />}
      {props.editMode ? (
        <UpdateBlog setEditMode={props.setEditMode} editFact={editFact} />
      ) : (
        <ul className={blogCss.ulBlogs}>
          {props.newArr.map((each, index) => {
            return (
              <BlogDisplay
                key={each._id}
                each={each}
                setEditMode={props.setEditMode}
                setEditFact={setEditFact}
                setDeleteId={setDeleteId}
                setAddBlog={props.setAddBlog}
                setName={props.setName}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Blogs;
