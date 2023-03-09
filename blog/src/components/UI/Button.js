import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={props.className ?? classes.btn}
      type={props.type}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default Button;
