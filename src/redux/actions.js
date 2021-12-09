import {
  CHAT_CLOSE,
  CHAT_OPEN,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  FILTER_OFF,
  FILTER_ON,
  SEND_MESSAGEF,
} from "./types";

export function createMessage(message) {
  //   console.log("act>", message);
  return {
    type: CREATE_MESSAGE,
    payload: message,
  };
}

export function deleteMessge(id) {
  return {
    type: DELETE_MESSAGE,
    payload: id,
  };
}

export function filterOn() {
  return {
    type: FILTER_ON,
    payload: true,
  };
}

export function chatOpen() {
  return {
    type: CHAT_OPEN,
  };
}

export function chatClose() {
  return {
    type: CHAT_CLOSE,
  };
}

export function sendMessageF(message) {
  return async (dispatch) => {
    // const url = `http://localhost:3000/api/data/${5}`;
    //new server
    const url = `https://fpcv.herokuapp.com/api/data/${5}`;
    const resp = await request(url, "POST", message);
    console.log("resp-->", resp);

    dispatch({
      type: SEND_MESSAGEF,
      payload: { ...resp },
    });
  };
}

export function filterOff() {
  return {
    type: FILTER_OFF,
    payload: false,
  };
}

async function request(url, method = "GET", data = null) {
  try {
    let headers = {};
    let body;
    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json();
  } catch (error) {
    console.log("Error", error.message);
  }
}
