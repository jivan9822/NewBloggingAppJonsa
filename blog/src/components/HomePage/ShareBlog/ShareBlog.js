import axios from 'axios';
import InputForm from '../../UI/BlogForm';

const ShareForm = (props) => {
  const getData = (blog) => {
    axios
      .post('/addBlog', blog)
      .then((res) => {
        const newBlog = res.data.data.blog;
        props.setFacts((old) => [newBlog, ...old]);
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
