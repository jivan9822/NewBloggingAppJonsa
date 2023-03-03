import axios from 'axios';

const DeleteBlog = (props) => {
  axios
    .post('/deleteBlog', { id: props.id })
    .then((res) => {
      props.setDeleteId(null);
      props.setFacts((old) => old.filter((each) => each._id !== props.id));
    })
    .catch((err) => {
      console.log(err);
    });
};

export default DeleteBlog;
