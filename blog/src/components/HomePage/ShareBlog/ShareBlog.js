import axios from 'axios';
import InputForm from '../../UI/BlogForm';

const ShareForm = (props) => {
  const getData = (blog) => {
    axios
      .post('/addBlog', blog)
      .then((res) => {
        props.setIsUpdate((old) => !old);
      })
      .catch((err) => {
        console.log(err);
        alert('Your Session expired! Please login!');
        window.location.reload();
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
