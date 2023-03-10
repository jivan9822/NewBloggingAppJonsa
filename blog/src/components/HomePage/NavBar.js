import homeCss from './Home.module.css';
import { Link } from 'react-router-dom';

const NavPage = (props) => {
  return (
    <div className={homeCss.navDiv}>
      {props.user ? (
        <div className={homeCss.navBar}>
          <h3
            onClick={() => {
              props.setAddBlog((old) => !old);
              props.setDisplayUser(false);
              props.setName((old) => (old === 'Cancel' ? 'AddBlog' : 'Cancel'));
              props.setEditMode(false);
            }}
            className={homeCss.AddBlogBtn}
          >
            {props.name}
          </h3>
          <Link className={homeCss.linkItem} to='#'>
            <h3
              onClick={() => {
                props.getFilterName('MyBlog');
                props.setDisplayUser(false);
              }}
            >
              MyBlog
            </h3>
          </Link>

          <Link className={homeCss.linkItem} to='#'>
            <h3 onClick={() => props.setDisplayUser((old) => !old)}>
              Welcome-{props.user.username}
            </h3>
          </Link>
          <Link className={homeCss.linkItem} to='/logout'>
            <h3>LogOut</h3>
          </Link>
        </div>
      ) : (
        <div className={homeCss.navBar}>
          <Link className={homeCss.linkItem} to='/login'>
            <h3 onClick={() => props.setDisplayBlogs(false)}>Login</h3>
          </Link>
          <Link className={homeCss.linkItem} to='/signup'>
            <h3 onClick={() => props.setDisplayBlogs(false)}>SignUp</h3>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavPage;
