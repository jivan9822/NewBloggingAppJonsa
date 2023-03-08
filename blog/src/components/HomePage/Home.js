import { React, useState } from 'react';
import homeCss from './Home.module.css';
import { Link, Outlet } from 'react-router-dom';
import LeDeco from './LiDecoration/LiDecor';
import Blogs from './Blogs/Blogs';
import ShareForm from './ShareBlog/ShareBlog';
import UserProfile from './UserProfile/UserProfile';

const HomePage = (props) => {
  // PROPS RECEIVING userData, facts, setFacts(fn) FROM APP.JS

  const [addBlog, setAddBlog] = useState(false);
  const [DisplayUser, setDisplayUser] = useState(false);
  const [name, setName] = useState('AddBlog');
  const [displayBlogs, setDisplayBlogs] = useState(true);
  const [filterName, getFilterName] = useState('All');

  let newArr;
  // FILTRATION OF BLOGS
  if (filterName === 'All') {
    newArr = props.facts;
  } else if (filterName === 'MyBlog') {
    newArr = props.facts.filter((each) => each.user === props.userData._id);
  } else {
    newArr = props.facts.filter((each) => each.category === filterName);
  }

  return (
    <div className={homeCss.topDiv}>
      <div>
        <div className={homeCss.mainDivHome}>
          <Link className={homeCss.headLink} to='/'>
            <h1
              className={homeCss.h3Head}
              onClick={() => {
                setDisplayBlogs(true);
                setDisplayUser(false);
              }}
            >
              Blogging App
            </h1>
          </Link>
          <div className={homeCss.navDiv}>
            {props.userData ? (
              <div className={homeCss.navBar}>
                <h3
                  onClick={() => {
                    setAddBlog(!addBlog);
                    setDisplayUser(false);
                    setName((old) => (old === 'Cancel' ? 'AddBlog' : 'Cancel'));
                  }}
                  className={homeCss.AddBlogBtn}
                >
                  {name}
                </h3>
                <Link className={homeCss.linkItem} to='#'>
                  <h3
                    onClick={() => {
                      getFilterName('MyBlog');
                      setDisplayUser(false);
                    }}
                  >
                    MyBlog
                  </h3>
                </Link>

                <Link className={homeCss.linkItem} to='#'>
                  <h3 onClick={() => setDisplayUser((old) => !old)}>
                    Welcome-{props.userData.username}
                  </h3>
                </Link>
                <Link className={homeCss.linkItem} to='/logout'>
                  <h3>LogOut</h3>
                </Link>
              </div>
            ) : (
              <div className={homeCss.navBar}>
                <Link className={homeCss.linkItem} to='/login'>
                  <h3 onClick={() => setDisplayBlogs(false)}>Login</h3>
                </Link>
                <Link className={homeCss.linkItem} to='/signup'>
                  <h3 onClick={() => setDisplayBlogs(false)}>SignUp</h3>
                </Link>
              </div>
            )}
          </div>
        </div>
        {addBlog && (
          <ShareForm
            user={props.userData}
            setAddBlog={setAddBlog}
            setName={setName}
            setIsUpdate={props.setIsUpdate}
          />
        )}
      </div>
      {/* STILL PENDING TO DISPLAY USER PROFILE */}
      {DisplayUser ? (
        <UserProfile user={props.userData} />
      ) : (
        <main>
          <div className={homeCss.catDiv}>
            {/* LIST ELEMENT FOR FILTRATION OF BLOGS */}
            {displayBlogs && <LeDeco getFilterName={getFilterName} />}
          </div>
          {/* DISPLAY BLOGS */}
          {displayBlogs && (
            <Blogs
              facts={newArr}
              setFacts={props.setFacts}
              userData={props.userData}
              setIsUpdate={props.setIsUpdate}
            />
          )}
        </main>
      )}
      <Outlet />
    </div>
  );
};

export default HomePage;
