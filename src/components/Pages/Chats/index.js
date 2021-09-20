import { useEffect, useState, useCallback, useMemo } from 'react';
import { List, ListItem } from '@material-ui/core';
import { AUTHORS } from '../../../utils/variables';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { ChatList } from '../../ChatList/index';
import Message from '../../Message';
import {Form} from '../../Form';
import { addChat, deleteChat } from '../../../store/chats/actions'
import { addMessage } from '../../../store/messages/actions';


function Chats(props) {

    // const initialMessages = {
    //   "chat-1": [
    //     { text: "nnnn", author: "HUMAN", id: "mess-2" },
    //     { text: "nnnn", author: "HUMAN", id: "mess-1" },
    //   ],
    //   "chat-2": [],
    // };

  // const initialChats = [
  //   {id: 'chat-1', name: "chat-1"},
  //   {id: 'chat-2', name: "chat-2"}
  // ]

  const { chatId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // const [messageList, setMessageList] = useState(initialMessages);
  // const [chatList, setChatList] = useState(initialChats);
  const messages = useSelector(state => state.messages.messages)
  const chats = useSelector(state => state.chats.chats)

  const sendMessage = useCallback((text, author) => {
    dispatch(addMessage(chatId, text, author))
  }, [chatId])
  
  useEffect(() => {
    const currentMess = messages[chatId];

    if (chatId && currentMess?.[currentMess.length - 1]?.author === AUTHORS.HUMAN) {
      
      const timeout = setTimeout(() => {
        sendMessage("I am bot", AUTHORS.BOT)
      }, 1500)

      return () => {
        clearTimeout(timeout);
      };
      
    }
  }, [messages]);

  const handleAddMessage = useCallback((text) => {
    sendMessage(text, AUTHORS.HUMAN);
  }, [chatId, sendMessage])

  const handleAddChat = useCallback((name)=> {
    dispatch(addChat(name))
  }, [dispatch]);

  const handleDeleteChat = useCallback((id) => {

    dispatch(deleteChat(id))

    if (chatId !== id) {
      return;
    }

    if (chats.length === 1) {
      history.push(`/chats/${chats[0].id}`)
    } else {
      history.push(`/chats`);
    }

  }, [history, dispatch, chats, chatId])


  const chatExists = useMemo(() => !!chats.find(({id}) => id === chatId), [chatId, chats]);


  return (
    <div className="App">

      <div className="App__wrapper">

        <ChatList chats={chats} onAddChat={handleAddChat} onDeleteChat={handleDeleteChat} />

        {!!chatId && chatExists && (
            <div>  
                <List>
                    {(messages[chatId] || [])?.map((message) => (
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
