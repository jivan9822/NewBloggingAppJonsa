import AxiosRequest from '../../UI/AxiosRequest';
import { useEffect } from 'react';

const DeleteBlog = (props) => {
  AxiosRequest('/deleteBlog', { id: props.id });
  useEffect(() => {
    props.setDeleteId(null);
    props.setIsUpdate((old) => !old);
  }, []);
};

export default DeleteBlog;
