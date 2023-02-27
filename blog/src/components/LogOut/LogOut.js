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
    });
};
export default UserLogOut;
