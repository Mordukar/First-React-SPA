import { useEffect, useState } from "react";
import { Button } from "@material-ui/core"
import { List } from "@material-ui/core"
import { ChatItem } from '../ChatItem';
import FormAddChat from '../FormAddChat';
import { ref, set, onValue } from "firebase/database";
import { db } from "../../services/firebase";


export const ChatList = ({ onDeleteChat, onAddChat }) => {

  const [chats, setChats] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    const userDbRef = ref(db, "chats");
    onValue(userDbRef, (snapshot) => {
      const data = snapshot.val();
      setChats(Object.values(data || {}));
    });
  }, []);

  const handleAddChat = (e) => {
    e.preventDefault();

    const newId = `chat-${Date.now()}`;
    const chatsDbRef = ref(db, `chats/${newId}`);

    set(chatsDbRef, {
      id: newId,
      name: value
    });

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