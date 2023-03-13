import axios from 'axios';
import InputForm from '../../../UI/BlogForm';
import BlogContext from '../../../../context/blog-context';
import { useContext } from 'react';

const ShareForm = (props) => {
  const blogs = useContext(BlogContext);

  const getData = (blog) => {
    axios
      .post('/addBlog', blog)
      .then((res) => {
        blogs.setFetchBlogs((old) => !old);
      })
      .catch((err) => {
        console.log(err);
         if (err.response.status === 401) {
           window.location.reload();
         }
      });
  };
  return (
    <InputForm
      getData={getData}
      setAddBlog={props.setAddBlog}
      setName={props.setName}
    />
  );
};

export default ShareForm;
