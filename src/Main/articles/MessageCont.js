import React, { useState } from "react";
import { connect } from "react-redux";
import { createMessage, deleteMessge } from "../../redux/actions";
import "./messageCont.scss";

function MessageForm({ messages, createMessage, deleteMessge }) {
  const [formMessage, setFormMessage] = useState({ name: "", text: "" });
  const [curMessage, setCurMessage] = useState(-1);
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
    }

    // console.log(messages);
  };

  const changeInputHandler = (e) => {
    setFormMessage({ ...formMessage, [e.target.name]: e.target.value });
  };

  const messageClick = (i) => {
    setCurMessage(i);
  };

  return (
    <>
      <h2>Leave a message</h2>
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
      <div className="messages">
        {messages.length === 0 && <p>No messages</p>}
        {messages.length > 0 &&
          messages.map((item, i) => {
            return (
              <div key={i} className="message" onClick={() => messageClick(i)}>
                <h3>{item.name}</h3>
                <span>{`${item.date ? item.date : ""}`}</span>
                <p>{item.text}</p>
                {i === curMessage && (
                  <div className="messageButtons">
                    <button
                      className="messageBtn"
                      onClick={() => {
                        setFormMessage({ name: item.name, text: item.text });
                        return deleteMessge(i);
                      }}
                    >
                      chage
                    </button>
                    <button
                      className="messageBtn"
                      onClick={() => deleteMessge(i)}
                    >
                      delete
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

/*
saveBtn.addEventListener('click', (event) => {

    save = {
        numberBee: input2.value,
        input: input.value
    }

    localStorage.setItem('save', JSON.stringify(save))

})

loadBtn.addEventListener('click', (event) => {
    save = JSON.parse(localStorage.getItem('save'))
   // console.log(save)
    
    input2.value = save.numberBee
    input.value = save.input
    numberBee=save.numberBee
    beecOn=true
    beeAngr = input.value / 75

})
*/
