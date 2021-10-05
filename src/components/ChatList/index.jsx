import { useEffect, useState} from "react";
import { Button } from "@material-ui/core"
import { List } from "@material-ui/core"
import { ChatItem } from '../ChatItem';
import FormAddChat from '../FormAddChat';
import { useDispatch, useSelector } from "react-redux";
import { selectChats } from "../../store/chats/selectors";
import { addChatFb } from "../../store/chats/actions";


export const ChatList = ({ onDeleteChat, onAddChat }) => {

  const chats = useSelector(selectChats);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleAddChat = (e) => {
    e.preventDefault(value);

    dispatch(addChatFb(value))

    setValue("");
  }

  return (
    <List>
      {chats.map((chat) => (
        <ChatItem 
          chat={chat} 
          key={chat.id} 
          id={chat.id} 
          onDelete={onDeleteChat}
        />
      ))}
      <form onSubmit={handleAddChat}>
        <input type="text" value={value} onChange={handleChange} />
        <Button
          type="submit"
          disabled={!value}
        >
          Add chat
        </Button>
      </form>
      {/* <FormAddChat/> */}
    </List>
  );


};