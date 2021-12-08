import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createMessage, deleteMessge } from "../../redux/actions";
import "./messageCont.scss";

function MessageForm({ messages, createMessage, deleteMessge }) {
  const [formMessage, setFormMessage] = useState({ name: "", text: "" });
  const [curMessage, setCurMessage] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    // messages.push(formMessage);
    if (formMessage.name.trim() && formMessage.text.trim()) {
      const date = new Date();
      const dateStr =
        `${date.getFullYear()}.${date.getMonth()}.` +
        `${date.getDate()} ${date.getHours()}:` +
        `${date.getMinutes()}:${date.getSeconds()}`;

      createMessage({ ...formMessage, date: dateStr });
      setFormMessage({ name: "", text: "" });
      setCurMessage(false);
    }
  };

  const changeInputHandler = (e) => {
    setFormMessage({ ...formMessage, [e.target.name]: e.target.value });
  };

  const clickChange = (i) => {
    setFormMessage({ name: messages[i].name, text: messages[i].text });
    deleteMessge(i);
  };

  useEffect(() => {
    setCurMessage(false);
  }, [messages]);

  return (
    <>
      <h2>Send a message</h2>
      <form className="messageForm" onSubmit={submitHandler}>
        <input
          onChange={changeInputHandler}
          name="name"
          placeholder="Name"
          className="input"
          type="text"
          value={formMessage.name}
        />
        <textarea
          name="text"
          rows="3"
          // cols="20"
          onChange={changeInputHandler}
          placeholder="Message"
          className="input"
          value={formMessage.text}
        ></textarea>
        <button className="submitBtn" type="submit">
          Send
        </button>
      </form>
      <h2>Messages</h2>
      <p>(on the localStorage)</p>
      <div className="messages">
        {messages.length === 0 && <p>No messages</p>}
        {messages.length > 0 &&
          messages.map((item, i) => {
            return (
              <div
                key={item.date}
                className={`message ${
                  i === curMessage ? "message_active" : ""
                }`}
                onClick={() => setCurMessage(i)}
              >
                <h3>{item.name}</h3>
                <span>{`${item.date ? item.date : ""}`}</span>
                <p>{item.text}</p>
                {i === curMessage && (
                  <div className="messageButtons">
                    <button
                      className="messageBtn"
                      onClick={() => clickChange(i)}
                    >
                      Change
                    </button>
                    <button
                      className="messageBtn"
                      onClick={() => deleteMessge(i)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                <div className="underline"></div>
              </div>
            );
          })}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return { messages: state.messages.messages };
};

const mapDispatchToProps = {
  createMessage,
  deleteMessge,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
