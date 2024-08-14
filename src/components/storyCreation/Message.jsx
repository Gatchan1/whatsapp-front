import EditAuthorMessage from "./authorEditing/EditAuthorMessage";
import EditComment from "./EditComment";
import EditTime from "./EditTime";

export default function Message({ message, index }) {
  return (
    <div>
      <EditTime checkbox={message[0]} time={message[2]} index={index} />
      <div className="row left-margin">
        <EditAuthorMessage author={message[3]} index={index}/>
        <EditComment comment={message[4]} index={index}/>
      </div>
    </div>
  );
}
