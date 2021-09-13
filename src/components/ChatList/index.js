import React from 'react'
import { List, ListItem } from "@material-ui/core"
import { Link } from "react-router-dom"

export const ChatList = ({ chats }) => {
    return (
      <List>
        {chats.map((chat) => (
          <ListItem key={chat.id}>
            <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
          </ListItem>
        ))}
        {/* <button>Add chat</button> */}
      </List>
    );
  };