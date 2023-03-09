import axios from 'axios';
import InputForm from '../../UI/BlogForm';
import BlogContext from '../../../context/blog-context';
import { useContext } from 'react';

const ShareForm = (props) => {
  const blogs = useContext(BlogContext);

  const getData = (blog) => {
    axios
      .post('/addBlog', blog)
      .then((res) => {
        const newBlog = res.data.data.blog;
        blogs.setFacts((old) => [newBlog, ...old]);
      })
      .catch((err) => {
        console.log(err);
        alert('Your Session expired! Please login!');
        window.location.reload();
      });
  };
  return <InputForm getData={getData} />;
};

export default ShareForm;
