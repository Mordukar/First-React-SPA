import "./chat.css";

function Chat(props) {
    return (
      <div className="chat">
          <h1 className="chat__title">{props.name}</h1>
      </div>
    );
}
   
export default Chat;