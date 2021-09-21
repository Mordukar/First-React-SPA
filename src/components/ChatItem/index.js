import { useCallback } from 'react'
import { useHistory } from 'react-router'
import { ListItem } from "@material-ui/core"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deleteChat } from '../../store/chats/actions'

export const ChatItem = ({ chat, id, chats, chatId }) => {
    const showName = useSelector((state) => state.showName);

    const history = useHistory();
    const dispatch = useDispatch();

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


    const handleDelete = () => {
        handleDeleteChat(id);
    }

    
    return (
        <ListItem key={chat.id}>
            <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
            <span onClick={handleDelete}>Delete</span>
        </ListItem>
    );
};


