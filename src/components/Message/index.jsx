import "./message.css";

function Message(props) {
    return (
      <div className="message">
          <h1 className="message__title">{props.author}</h1>
          <h2 className="message__subtitle">{props.text}</h2>
          <p className="message__text">{props.value}</p>
      </div>
    );
}
   
export default Message;