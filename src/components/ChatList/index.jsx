import { List } from "@material-ui/core"
import { ChatBubbleOutlineRounded } from "@material-ui/icons";
import { Link } from "react-router-dom"
import { ChatItem } from '../ChatItem';
import FormAddChat from '../FormAddChat';


export const ChatList = ({ chats, chatId }) => {

    return (
      <List>
        {chats.map((chat) => (
          <ChatItem chatId={chatId} chats={ chats } chat={chat} key={chat.id} id={chat.id} />
        ))}
        <FormAddChat/>
      </List>
    );
  };