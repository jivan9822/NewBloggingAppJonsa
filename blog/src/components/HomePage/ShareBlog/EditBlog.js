import InputForm from '../../UI/BlogForm';
import axios from 'axios';

const UpdateBlog = (props) => {
  const getData = (blog) => {
    axios
      .post('/editBlog', blog)
      .then((res) => {
        console.log(res);
        const newBlog = res.data.data.blog;
        props.setFacts((old) => [
          ...old.filter((each) => {
            return each._id !== newBlog._id;
          }),
          newBlog,
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
