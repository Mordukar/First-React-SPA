import { useEffect, useState } from 'react';
import './App.css';
import Message from './components/message/Message';

function App() {

  const [value, setValue] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author === "HUMAN") {
      console.log('ква');
      setTimeout(() => {
        setMessageList((prevMessageList) => [
          ...prevMessageList, 
          { id: 1, text: "I am bot", author: "BOT", value: '' },
        ]);
      }, 1500)
      
    }
  }, [messageList]);

  const handleAddMessage = (e) => {
    e.preventDefault();
    setMessageList((prevMessageList) => [
      ...prevMessageList,
      { id: 2, text: "", author: "HUMAN", value: value },
    ])
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="App">

      <form class="form" onSubmit={handleAddMessage}>
        <div>Введите сообщение:</div>
        <input class="input" type="text" value={value} onChange={handleChange}/>
        <button class="button" type="submit">Submit</button>
      </form>

      {messageList.map((message, i) => (
        <Message
          key={i}  
          author={message.author}
          text={message.text}
          value={message.value}
        />
      ))}
      
    </div>
  );
}

export default App;
