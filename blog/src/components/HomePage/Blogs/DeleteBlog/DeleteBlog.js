import axios from 'axios';
import BlogContext from '../../../../context/blog-context';
import { useContext } from 'react';

const DeleteBlog = (props) => {
  const blogCtx = useContext(BlogContext);
  axios
    .post('/deleteBlog', { id: props.id })
    .then((res) => {
      props.setDeleteId(null);
      blogCtx.setFacts((old) => old.filter((each) => each._id !== props.id));
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        window.location.reload();
      }
    });
};

export default DeleteBlog;
