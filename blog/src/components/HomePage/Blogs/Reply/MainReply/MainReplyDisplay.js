import BlogContext from '../../../../../context/blog-context';
import { useContext } from 'react';
import MainReplyHandler from './MainReplyHandler';

const DisplayMainReply = (props) => {
  const styles = {
    display: 'flex',
    gap: '20px',
    boxSizing: 'border-box',
    alignItems: 'center',
  };
  const blog = useContext(BlogContext);
  const oneBlog = blog.fact.find((each) => each._id === props.id);
  console.log(oneBlog);
  return (
    <div>
      {oneBlog.replies.map((each, ind) => (
        <div key={each._id} style={styles}>
          <div style={{ color: 'orangered' }}>{each.userName}</div>
          {each.userId === props.userId ? (
            <MainReplyHandler text={each.text} ind={ind} id={each._id} />
          ) : (
            <p>{each.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};
export default DisplayMainReply;
