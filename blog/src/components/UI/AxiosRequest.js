import axios from 'axios';

const AxiosRequest = async (route, data) => {
  // console.log(method, route, data);
  await axios
    .post(route, data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        alert('Session timeout! Please login again!');
        window.location.reload();
      }
    });
};
export default AxiosRequest;
