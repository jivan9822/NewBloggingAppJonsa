import EditForm from '../../UI/EditForm';
import classes from './Display.module.css';

const ShowSubReplyList = (props) => {
  console.log(props.id);
  return (
    <>
      {props.subReplyList.map((each, ind) => (
        <div key={ind} className={classes.nestReplyDis}>
          <p
            className={classes.ptagSub}
            style={{ backgroundColor: props.color }}
          >
            {each.userName.toUpperCase().slice(0, 1)}
          </p>
          {/* <p style={{ color: 'rgb(51, 1, 95)' }}>{each.reply}</p> */}
          <EditForm
            style={{ color: 'rgb(51, 1, 95)' }}
            text={each.reply}
            id={props.id}
            index={ind}
          />
        </div>
      ))}
    </>
  );
};
export default ShowSubReplyList;
