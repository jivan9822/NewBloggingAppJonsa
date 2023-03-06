import classes from './Button.module.css';

const Button2 = (props) => {
  return (
    <button
      className={classes.btn2}
      name={props.name ?? ''}
      value={props.value}
    >
      <span id={props.id} className={props.className} onClick={props.onClick1}>
        {props.span1name}
      </span>
      <span id={props.id} onClick={props.onClick2}>
        {props.span2name}
      </span>
      {props.name}
    </button>
  );
};

export default Button2;
