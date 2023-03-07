const Button3 = (props) => {
  return (
    <button
      name={props.name}
      id={props.id}
      value={props.value}
      onClick={props.onClick}
      style={props.style}
    >
      {props.heading}
    </button>
  );
};

export default Button3;
