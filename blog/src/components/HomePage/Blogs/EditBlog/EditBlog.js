import InputForm from '../../../UI/BlogForm';
import axios from 'axios';
import BlogContext from '../../../../context/blog-context';
import { useContext } from 'react';

const UpdateBlog = (props) => {
  const Blogs = useContext(BlogContext);
  const getData = (blog) => {
    axios
      .post('/editBlog', blog)
      .then((res) => {
        console.log(res);
        const newBlog = res.data.data.blog;
        Blogs.setFacts((old) => [
          newBlog,
          ...old.filter((each) => {
            return each._id !== newBlog._id;
          }),
        ]);
      })
      .catch((err) => {
        console.log(err);
        alert('Your Session expired! Please login!');
        window.location.reload();
      });
  };

  return (
    <InputForm
      setEditMode={props.setEditMode}
      editFact={props.editFact}
      getData={getData}
    />
  );
};
export default UpdateBlog;
