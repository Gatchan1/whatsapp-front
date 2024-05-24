import EditAuthorMessage from "./EditAuthorMessage";
import EditComment from "./EditComment";
import EditTime from "./EditTime";

export default function Message({ message, index }) {
  return (
    <div>
      <EditTime checkbox={message[0]} time={message[1]} index={index} />
      <div className="row left-margin">
        <EditAuthorMessage author={message[2]} index={index}/>
        <EditComment comment={message[3]} index={index}/>
      </div>
    </div>
  );
}
