import { React, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/Home';
import LoginPage from './components/LoginPage/Login';
import SignupPage from './components/SignUpPage/SignUp';
import isValidUser from './components/Validation/isValidUser';
import UserLogOut from './components/LogOut/LogOut';
import axios from 'axios';

const App = () => {
  // STATE TO GET DATA OF USER FROM LOGIN PAGE
  const [userData, getUserData] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  // STATE TO GET DATA OF BLOGS/FACTS
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    // VERIFYING USER WHEN SERVER START
    isValidUser(getUserData);
    console.log('Hello!');
    // FETCHING BLOGS WHEN SERVER STARTS
    axios
      .get('/getblogs')
      .then((res) => {
        const blogs = res.data.data.blogs;
        // BLOGS SET TO FACTS
        setFacts(blogs.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isUpdate]);

  return (
    <Routes>
      {/* HOME ROUTE WHERE SENDING USER-DATA, BLOG-DATA, SET-FACTS TO AVOID MULTIPLE FETCH */}
      <Route
        exact
        path='/'
        element={
          <HomePage
            userData={userData}
            facts={facts}
            setIsUpdate={setIsUpdate}
          />
        }
      >
        {/* FETCHING USER DATA FROM LOGIN PAGE */}
        <Route path='login' element={<LoginPage getUserData={getUserData} />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='logout' element={<UserLogOut />} />
      </Route>
    </Routes>
  );
};

export default App;
