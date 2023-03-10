import BlogContext from '../../../../../context/blog-context';
import { useContext } from 'react';
const col = [
  'white',
  '#3b82f6',
  '#16a34a',
  '#ef4444',
  '#eab308',
  '#db2777',
  '#14b8a6',
  '#f97316',
  '#8b5cf6',
  '#881337',
];
const DisplayMainReply = (props) => {
  const styles = {
    display: 'flex',
    gap: '20px',
    boxSizing: 'border-box',
    alignItems: 'center',
  };

  const blog = useContext(BlogContext);
  const oneBlog = blog.fact.find((each) => each._id === props.id);
  return (
    <div>
      {oneBlog.replies.map((each, ind) => (
        <div key={each._id} style={styles}>
          <div style={{ color: 'orangered' }}>{each.userName}</div>
          {each.userId === props.userId ? (
            <div style={styles}>
              <p>✏️ </p>
              <p
                style={{
                  backgroundColor: col[ind % 10],
                  padding: '3px',
                }}
              >
                {each.text}
              </p>

              <p> ❌</p>
            </div>
          ) : (
            <p>{each.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};
export default DisplayMainReply;
