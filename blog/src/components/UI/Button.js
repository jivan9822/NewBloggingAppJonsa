import classes from './Button.module.css';

const Button = (props) => {
  const replyHandler = (e) => {
    props.setIsReply((old) => !old);
  };
  return (
    <button
      className={props.className ?? classes.btn}
      disabled={props.disable}
      type={props.type}
      onClick={props.onClick}
      style={props.style}
      id={props.id}
    >
      {props.name2 >= 0 ? (
        <span
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span onClick={replyHandler}>{props.name}</span>
          <span
            onClick={() => {
              props.onClickHandel((old) => !old);
            }}
          >
            {props.name2}
          </span>
        </span>
      ) : (
        <span>{props.name}</span>
      )}
    </button>
  );
};

export default Button;
