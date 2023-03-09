import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={props.className ?? classes.btn}
      disabled={props.disable}
      type={props.type}
      onClick={props.onClick}
      style={props.style}
    >
      {props.name}
    </button>
  );
};

export default Button;
