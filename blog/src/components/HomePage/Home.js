import { React, useState, useContext } from 'react';
import homeCss from './Home.module.css';
import { Link, Outlet } from 'react-router-dom';
import FilterListDisplay from './FilterList/FilterListDisplay';
import Blogs from './Blogs/Blogs';
import ShareForm from './ShareBlog/ShareBlog';
import UserProfile from './UserProfile/UserProfile';
import UserContext from '../../context/user-context';
import BlogContext from '../../context/blog-context';
import NavPage from './NavBar';

const HomePage = (props) => {
  // PROPS RECEIVING userblogs.fact, setFacts(fn) FROM APP.JS
  const blogs = useContext(BlogContext);
  const userData = useContext(UserContext);
  const [addBlog, setAddBlog] = useState(false);
  const [DisplayUser, setDisplayUser] = useState(false);
  const [displayBlogs, setDisplayBlogs] = useState(true);
  const [filterName, getFilterName] = useState('All');
  let newArr;
  // FILTRATION OF BLOGS
  if (filterName === 'All') {
    newArr = blogs.fact;
  } else if (filterName === 'MyBlog') {
    newArr = blogs.fact.filter((each) => each.user === userData.user._id);
  } else {
    newArr = blogs.fact.filter((each) => each.category === filterName);
  }

  return (
    <div className={homeCss.topDiv}>
      <div>
        <div className={homeCss.mainDivHome}>
          <Link className={homeCss.headLink} to='/'>
            <h3
              className={homeCss.h3Head}
              onClick={() => {
                setDisplayBlogs(true);
                setDisplayUser(false);
              }}
            >
              Welcome to the Blogging App
            </h3>
          </Link>
          <NavPage
            user={userData.user}
            setAddBlog={setAddBlog}
            addBlog={addBlog}
            setDisplayUser={setDisplayUser}
            getFilterName={getFilterName}
          />
        </div>
        {addBlog && <ShareForm />}
      </div>
      {/* STILL PENDING TO DISPLAY USER PROFILE */}
      {DisplayUser ? (
        <UserProfile user={userData.user} />
      ) : (
        <main>
          <div className={homeCss.catDiv}>
            {/* LIST ELEMENT FOR FILTRATION OF BLOGS */}
            {displayBlogs && (
              <FilterListDisplay getFilterName={getFilterName} />
            )}
          </div>
          {/* DISPLAY BLOGS */}
          {displayBlogs && <Blogs newArr={newArr} />}
        </main>
      )}
      <Outlet />
    </div>
  );
};

export default HomePage;
