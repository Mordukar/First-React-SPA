import { AUTHORS } from "../../utils/variables";

export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGES::DELETE_MESSAGE';

export const addMessage = (chatId, text, author) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        text,
        author
    }
})

export const deleteMessage = (chatId, id) => ({
    type: DELETE_MESSAGE,
    payload: {
        chatId,
        id
    }
})

export const addMessageWithReply = (chatId, text, author) => (dispatch) => {

    dispatch(addMessage(chatId, text, author))

    if (author === AUTHORS.HUMAN) {
      const timeout = setTimeout(() => {
        dispatch(addMessage(chatId, "I am bot", AUTHORS.BOT))
      }, 1500)

      return () => {
        clearTimeout(timeout);
      };
    }   

}