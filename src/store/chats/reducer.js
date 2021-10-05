import { ADD_CHAT } from "./actions"
import { DELETE_CHAT } from "./actions"
import { SET_CHATS } from "./actions"

const initialState = {
    chats: []
}

export const chatsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_CHAT: {
            return {
                ...state,
                chats: [...state.chats, { id: `chats-${Date.now()}`, name: payload}]
            }
        }
        case DELETE_CHAT: {
            const newChats = state.chats.filter(({ id })=>( id !== payload ))
            return {
                ...state,
                chats: newChats
            }
        }
        case SET_CHATS: {
            return {
              ...state,
              chats: payload,
            };
          }
        default:
            return state;
    }
}