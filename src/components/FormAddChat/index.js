import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { Button } from "@material-ui/core"
import { addChat } from '../../store/chats/actions'

function FormAddChat() {

    const dispatch = useDispatch();

    const [value, setValue] = useState('');

    const handleAddChat = useCallback((name)=> {
        dispatch(addChat(name))
      }, [dispatch]);

    const handleChange = (e) => {
        setValue(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            handleAddChat(value);
            setValue('');
        }
    }


    return(
        <form onSubmit={handleSubmit}> 
            <input type="text" value={value} onChange={handleChange}/>
            <Button type="submit" varinat="outlined" disabled={!value}>Add chat</Button>
        </form>
    )
}


export default FormAddChat;