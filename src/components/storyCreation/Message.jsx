import EditAuthor from "./EditAuthor";
import EditComment from "./EditComment";
import EditTime from "./EditTime";

export default function Message({ message, index }) {
  return (
    <div>
      <EditTime checkbox={message[0]} time={message[1]} index={index} />
      <div className="row left-margin">
        <EditAuthor author={message[2]} />
        <EditComment comment={message[3]} />
      </div>
    </div>
  );
}
