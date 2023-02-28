import { React, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/Home';
import LoginPage from './components/LoginPage/Login';
import SignupPage from './components/SignUpPage/SignUp';
import isValidUser from './components/Validation/isValidUser';
import UserLogOut from './components/LogOut/LogOut';
import axios from 'axios';

const App = () => {
  const [userData, getUserData] = useState(null);
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    isValidUser(getUserData);
    axios
      .get('/getblogs')
      .then((res) => {
        const blogs = res.data.data.blogs;
        setFacts(blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <HomePage userData={userData} facts={facts} setFacts={setFacts} />
        }
      >
        <Route path='login' element={<LoginPage getUserData={getUserData} />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='logout' element={<UserLogOut />} />
      </Route>
    </Routes>
  );
};

export default App;
