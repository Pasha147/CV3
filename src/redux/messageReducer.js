import { CREATE_MESSAGE, DELETE_MESSAGE } from "./types";

function init() {
  let initialState = {
    messages: [],
  };
  // let messages = JSON.parse(localStorage.getItem("messages"));
  if (localStorage.getItem("messages")) {
    initialState.messages = [...JSON.parse(localStorage.getItem("messages"))];
  }
  // initialState = {
  //   messages: [
  //     {
  //       name: "Pasha",
  //       text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id est distinctio eum error iusto impedit, possimus veritatis maiores dignissimos incidunt.",
  //     },
  //     {
  //       name: "Sasha",
  //       text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id est distinctio eum error iusto impedit, possimus veritatis maiores dignissimos incidunt.",
  //     },
  //     {
  //       name: "Kcusha",
  //       text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id est distinctio eum error iusto impedit, possimus veritatis maiores dignissimos incidunt.",
  //       date: "2021.11.7 12:54:20",
  //     },
  //   ],
  // };
  return initialState;
}

export const messageReducer = (state = init(), action) => {
  switch (action.type) {
    case CREATE_MESSAGE: {
      let newMessages = [...state.messages, { ...action.payload }];
      localStorage.setItem("messages", JSON.stringify(newMessages));
      // console.log("dddd>>", action.payload);
      return { ...state, messages: [...newMessages] };
      //return { ...state, messages: state.messages.concat(action.payload) };
    }
    case DELETE_MESSAGE: {
      let newMessages = [
        ...state.messages.filter((item, index) => index !== action.payload),
      ];
      localStorage.setItem("messages", JSON.stringify(newMessages));
      // console.log(state.messages);
      return {
        ...state,
        messages: [...newMessages],
      };
    }

    default:
      return state;
  }
};
