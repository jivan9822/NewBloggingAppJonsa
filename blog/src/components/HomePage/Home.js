import { React, useState } from 'react';
import homeCss from './Home.module.css';
import { Link, Outlet } from 'react-router-dom';
import LeDeco from './LiDecoration/LiDecor';
import Blogs from './Blogs/Blogs';
import ShareForm from './ShareBlog/ShareBlog';

const HomePage = (props) => {
  const [addBlog, setAddBlog] = useState(false);
  const [displayBlogs, setDisplayBlogs] = useState(true);

  return (
    <div className={homeCss.topDiv}>
      <div>
        <div className={homeCss.mainDivHome}>
          <Link className={homeCss.headLink} to='/'>
            <h3
              className={homeCss.h3Head}
              onClick={() => setDisplayBlogs(true)}
            >
              Welcome to the Blogging App
            </h3>
          </Link>
          <div className={homeCss.navDiv}>
            {props.userData ? (
              <div className={homeCss.navBar}>
                <h3
                  onClick={() => setAddBlog(!addBlog)}
                  className={homeCss.AddBlogBtn}
                >
                  AddBlog
                </h3>
                <Link className={homeCss.linkItem} to='/myblog'>
                  <h3>MyBlog</h3>
                </Link>

                <Link className={homeCss.linkItem} to='/userdetails'>
                  <h3>Welcome-{props.userData.username}</h3>
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
          <ShareForm user={props.userData} setFacts={props.setFacts} />
        )}
      </div>
      <main>
        <div className={homeCss.catDiv}>{displayBlogs && <LeDeco />}</div>
        {displayBlogs && <Blogs facts={props.facts} />}
      </main>
      <Outlet />
    </div>
  );
};

export default HomePage;
