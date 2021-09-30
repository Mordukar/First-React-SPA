import { useEffect, useCallback, useState, useRef, useMemo, useSelector } from 'react';
import { List, ListItem } from '@material-ui/core';
import { AUTHORS } from '../../../utils/variables';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { db } from "../../../services/firebase";
import { ref, set, onValue } from "firebase/database";

import { ChatList } from '../../ChatList/index';
import Message from '../../Message';
import {Form} from '../../Form';
import { addMessageFb, initMessages } from '../../../store/messages/actions';
import { initChats } from '../../../store/chats/actions';
import { selectIfChatExist } from '../../../store/chats/selectors';


function Chats(props) {

  const { chatId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const chatsDbRef = ref(db, "chats");
    dispatch(initChats())
    dispatch(initMessages())
  }, []);

  const messages = useSelector((state) => state.messages.messages)

  const selectChatExists = useMemo(() => selectIfChatExist(chatId), [chatId]);

  const chatExists = useSelector(selectChatExists);

  const sendMessage = useCallback(
    (text, author) => {
    dispatch(addMessageFb(text, author, chatId))
  }, [chatId])

  const handleAddMessage = useCallback(
    (text) => {
      sendMessage(text, AUTHORS.HUMAN);
    }, 
    [sendMessage]
  );

  return (
    <div className="App">

      <div className="App__wrapper">

        <ChatList />

        {!!chatId && chatExists && (
            <div>  
                <List>
                  {(Object.values(messages[chatId] || {}) || [])?.map((message) => (
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
