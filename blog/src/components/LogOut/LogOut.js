import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserLogOut = (props) => {
  const navigate = useNavigate();
  axios
    .get('/logout')
    .then((res) => {
      console.log(res);
      navigate('/');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        alert('Session timeout! Please login again!');
        window.location.reload();
      }
    });
};
export default UserLogOut;
