import {
  CHAT_CLOSE,
  CHAT_OPEN,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  SEND_MESSAGEF,
} from "./types";

function init() {
  let initialState = {
    messages: [],
    chatOpen: false,
  };
  if (localStorage.getItem("messages")) {
    initialState.messages = [...JSON.parse(localStorage.getItem("messages"))];
  }

  return initialState;
}

export const messageReducer = (state = init(), action) => {
  switch (action.type) {
    case CREATE_MESSAGE: {
      let newMessages = [];
      state.messages.length >= 10
        ? (newMessages = [...state.messages.slice(1), { ...action.payload }])
        : (newMessages = [...state.messages, { ...action.payload }]);
      localStorage.setItem("messages", JSON.stringify(newMessages));
      return { ...state, messages: [...newMessages] };
      //return { ...state, messages: state.messages.concat(action.payload) };
    }
    case DELETE_MESSAGE: {
      let newMessages = [
        ...state.messages.filter((item, index) => index !== action.payload),
      ];
      localStorage.setItem("messages", JSON.stringify(newMessages));
      return {
        ...state,
        messages: [...newMessages],
      };
    }
    case CHAT_OPEN: {
      return { ...state, chatOpen: true };
    }
    case CHAT_CLOSE: {
      return { ...state, chatOpen: false };
    }
    case SEND_MESSAGEF: {
      console.log("message has been sent");
      return { ...state };
    }

    default:
      return state;
  }
};
