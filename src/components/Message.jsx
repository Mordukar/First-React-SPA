import "./message.css";

function Message(props) {
    return (
      <div className="message">
          <h3 className="message__title">Hello, {props.name}</h3>
          <p className="message__text">{props.text}</p>
      </div>
    );
}
   
export default Message;