import { useEffect, useState, useCallback, useHistory } from 'react';
import Message from '../../Message';
import {Form} from '../../Form';
import { List, ListItem } from '@material-ui/core';
import { AUTHORS } from '../../../utils/variables';
import { useParams } from 'react-router';
import { ChatList } from '../../ChatList/index';

function Chats(props) {

    const initialMessages = {
        "chat-1": [
          { text: "nnnn", author: "HUMAN", id: "mess-2" },
          { text: "nnnn", author: "HUMAN", id: "mess-1" },
        ],
        "chat-2": [],
      };

  const initialChats = [
    {id: 'chat-1', name: "chat-1"},
    {id: 'chat-2', name: "chat-2"}
  ]

  const { chatId } = useParams();
  const history = useHistory();

  const [messageList, setMessageList] = useState(initialMessages);
  const [chatList, setChatList] = useState(initialChats);

  const sendMessage = useCallback((message) => {
    setMessageList((prevMess) => ({
        ...prevMess,
            [chatId]: [ 
                ...prevMess[chatId],
                message,
            ],
        }));
  }, [chatId])
  
  useEffect(() => {
    const currentMess = messageList[chatId];

    if (chatId && currentMess?.[currentMess.length - 1]?.author === AUTHORS.HUMAN) {
      
      const timeout = setTimeout(() => {
        sendMessage({ 
            id: `mess-${Date.now()}`, 
            text: "I am bot", 
            author: AUTHORS.BOT, 
            value: '' 
        })
      }, 1500)

      return () => {
        clearTimeout(timeout);
      };
      
    }
  }, [messageList]);

  const handleAddMessage = useCallback((text) => {
    sendMessage({
        text,
        author: AUTHORS.HUMAN,
        id: `mess-${Date.now()}`
    });
  }, [chatId, sendMessage])

  const handleAddChat = useCallback((name)=> {
    const id = `chat-${Date.now()}`;
    setChatList((prevChats) => [
      ...prevChats,
      {
        id,
        name
      }
    ])

    setMessageList((prevMess) => ({
      ...prevMess,
      [id]: []
    }))
  }, []);

  const handleDeleteChat = useCallback((id) => {
    const newChats = chatList.filter(chat => chat.id !== id);
    setChatList(newChats);

    const newMess = {...messageList};
    delete newMess[id];

    setMessageList(newMess);

    if (chatId !== id) {
      return;
    }

    if (newChats.length) {
      history.push(`/chats/${chatList[0].id}`)
    } else {
      history.push(`/chats`);
    }

  }, [chatList, messageList, history])


  return (
    <div className="App">

      <div className="App__wrapper">

        <ChatList chats={chatList} onAddChat={handleAddChat} onDeleteChat={handleDeleteChat} />

        {!!chatId && !!messageList[chatId] && (
            <div>  
                <List>
                    {messageList[chatId]?.map((message) => (
                        <ListItem
                        key={message.id}  
                        >
                        <Message
                            author={message.author}
                            text={message.text}
                            value={message.value}
                        />
                        </ListItem>
                        ))
                    }
                </List>

                <Form
                    onSubmit={handleAddMessage}
                />
            </div>  
        )}

      </div>

    </div>
  );
}

export default Chats;
