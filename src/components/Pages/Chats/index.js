import { useEffect, useCallback, useMemo } from 'react';
import { List, ListItem } from '@material-ui/core';
import { AUTHORS } from '../../../utils/variables';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { ChatList } from '../../ChatList/index';
import Message from '../../Message';
import {Form} from '../../Form';
import { addMessageWithReply } from '../../../store/messages/actions';
import { selectIfChatExist } from '../../../store/chats/selectors';


function Chats(props) {

  const { chatId } = useParams();
  const dispatch = useDispatch();

  const messages = useSelector(state => state.messages.messages)
  const chats = useSelector(state => state.chats.chats)

  const selectChatExists = useMemo(() => selectIfChatExist(chatId), [chatId]);

  const chatExists = useSelector(selectChatExists);

  const sendMessage = useCallback((text, author) => {
    dispatch(addMessageWithReply(chatId, text, author))
  }, [chatId])

  const handleAddMessage = useCallback((text) => {
    sendMessage(text, AUTHORS.HUMAN);
  }, [chatId, sendMessage])


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
