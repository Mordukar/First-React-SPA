import { useEffect, useState, useRef } from 'react';
import './App.css';
import Message from './components/message/Message';
import Chat from './components/chat/Chat';
import { TextField, Button, List, ListItem } from '@material-ui/core';

function App() {

  const [value, setValue] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [chatList, setChatList] = useState([
    { id: 1, name: "Chat-1"},
    { id: 1, name: "Chat-1"},
    { id: 1, name: "Chat-1"}
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messageList[messageList.length - 1]?.author === "HUMAN") {
      
      const timeout = setTimeout(() => {
        setMessageList((prevMessageList) => [
          ...prevMessageList, 
          { id: 1, text: "I am bot", author: "BOT", value: '' },
        ]);
        
      }, 1500)

      return () => {
        clearTimeout(timeout);
      };
      
    }
  }, [messageList]);

  const handleAddMessage = (e) => {
    e.preventDefault();
    setMessageList((prevMessageList) => [
      ...prevMessageList,
      { id: 2, text: "", author: "HUMAN", value: value },
    ])
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="App">

      <form className="form" onSubmit={handleAddMessage}>
        <div>Введите сообщение:</div>
        <TextField
          color="primary"
          placeholder="message"
          label="Label"
          value={value}
          onChange={handleChange}
          inputRef={inputRef}
        />
        <Button className="button" type="submit">Submit</Button>
      </form>

      <div className="App__wrapper">

        <List>
          {chatList.map((chat) => (
            <ListItem
              key={chat.id}
            >
              <Chat name={chat.name}></Chat>
            </ListItem>
          ))}
        </List>

        <List>
          {messageList.map((message) => (
            <ListItem
            key={message.id}  
            >
              <Message
                author={message.author}
                text={message.text}
                value={message.value}
              />
            </ListItem>
            ))}
        </List>

      </div>

    </div>
  );
}

export default App;
