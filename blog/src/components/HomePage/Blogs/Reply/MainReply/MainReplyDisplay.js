import BlogContext from '../../../../../context/blog-context';
import { useContext } from 'react';
import ReplyHandler from '../SubReply/ReplyHandler2';

const DisplayMainReply = (props) => {
  const blog = useContext(BlogContext);
  const oneBlog = blog.fact.find((each) => each._id === props.id);
  return (
    <ul>
      {oneBlog.replies.reverse().map((each, ind) => (
        <ReplyHandler
          key={each._id}
          each={each}
          userId={props.userId}
          ind={ind}
          subReplies={each.subReplies}
          onClickHandel2={props.setIsDisplayReply}
        />
      ))}
    </ul>
  );
};
export default DisplayMainReply;
