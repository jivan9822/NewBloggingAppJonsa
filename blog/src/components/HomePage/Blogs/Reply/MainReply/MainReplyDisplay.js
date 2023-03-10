import BlogContext from '../../../../../context/blog-context';
import { useContext } from 'react';
import ReplyHandler from './ReplyHandler2';

const DisplayMainReply = (props) => {
  const blog = useContext(BlogContext);
  const oneBlog = blog.fact.find((each) => each._id === props.id);
  return (
    <div>
      {oneBlog.replies.map((each, ind) => (
        <ReplyHandler
          key={each._id}
          each={each}
          userId={props.userId}
          ind={ind}
        />
      ))}
    </div>
  );
};
export default DisplayMainReply;
