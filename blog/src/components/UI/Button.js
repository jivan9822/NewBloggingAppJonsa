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
        <span>
          <span onClick={replyHandler}>{props.name}</span>
          <span>{props.name2}</span>
        </span>
      ) : (
        <span>{props.name}</span>
      )}
    </button>
  );
};

export default Button;
