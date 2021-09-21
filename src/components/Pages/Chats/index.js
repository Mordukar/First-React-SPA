import { useEffect, useState, useCallback, useMemo } from 'react';
import { List, ListItem } from '@material-ui/core';
import { AUTHORS } from '../../../utils/variables';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { ChatList } from '../../ChatList/index';
import Message from '../../Message';
import {Form} from '../../Form';
import { addMessage } from '../../../store/messages/actions';


function Chats(props) {

  const { chatId } = useParams();
  // const history = useHistory();
  const dispatch = useDispatch();

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

  const chatExists = useMemo(() => !!chats.find(({id}) => id === chatId), [chatId, chats]);

  return (
    <div className="App">

      <div className="App__wrapper">

        <ChatList chatId={chatId} chats={chats} />

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
