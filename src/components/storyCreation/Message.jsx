import EditAuthor from "./EditAuthor";

export default function Message({message}) {
  return (
    <div>
        <div>{message[0]}</div>
        <EditAuthor author={message[1]}/>
        <div>{message[2]}</div>
    </div>
  )
}
