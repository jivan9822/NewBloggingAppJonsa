import axios from 'axios';
import AxiosRequest from '../../UI/AxiosRequest';
import { useEffect } from 'react';

const DeleteBlog = (props) => {
  AxiosRequest('/deleteBlog', { id: props.id });
  useEffect(() => {
    props.setDeleteId(null);
    props.setFacts((old) => old.filter((each) => each._id !== props.id));
  }, []);
};

export default DeleteBlog;
