import { useState } from 'react'
import { List, ListItem, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { ChatItem } from '../ChatItem';


export const ChatList = ({ chats, onDeleteChat, onAddChat }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      onAddChat(value)
    }
  }

    return (
      <List>
        {chats.map((chat) => (
          <ChatItem chat={chat} key={chat.id} id={chat.id} onDelete={onDeleteChat} />
        ))}
        <form onSubmit={handleSubmit}> 
          <input type="text" value={value} onChange={handleChange}/>
          <Button varinat="outlined" disabled={!value}>Add chat</Button>
        </form>
      </List>
    );
  };