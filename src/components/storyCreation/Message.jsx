import EditAuthor from "./EditAuthor";
import EditTime from "./EditTime";

export default function Message({ message, index, setShowScrollPanel }) {
  return (
    <div>
      <EditTime checkbox={message[0]} time={message[1]} index={index} setShowScrollPanel={setShowScrollPanel}/>
      <div className="row left-margin">
        <EditAuthor author={message[2]} />
        <div>{message[3]}</div>
      </div>
    </div>
  );
}
