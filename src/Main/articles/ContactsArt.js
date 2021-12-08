import "./contactsArt.scss";
import React from "react";
import { FiHome, FiPhone, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { chatClose, chatOpen } from "../../redux/actions";

import { BiXCircle } from "react-icons/bi";
import { AiOutlineSkype } from "react-icons/ai";
import MessageForm from "./MessageCont";

function ContactsArt() {
  const dispatch = useDispatch();
  const chatOn = useSelector((state) => state.messages.chatOpen);
  return (
    <article className="contactsArt">
      <div className="contactsCont">
        <div className="itemConteiner">
          <div>
            <FiHome className="contacts__item" />
          </div>
          <p>Ukrane, Kyiv</p>
        </div>
        <div className="underline"></div>
        <div className="itemConteiner">
          <div>
            <FiPhone className="contacts__item" />
          </div>
          <p>(093) 843-79-68</p>
        </div>
        <div className="underline"></div>
        <div className="itemConteiner">
          <div>
            <FiMail className="contacts__item" />
          </div>
          <p>pasha147223@gmail.com</p>
        </div>
        <div className="underline"></div>
        <div className="itemConteiner">
          <div>
            <AiOutlineSkype className="contacts__item" />
          </div>
          <p>pasha147223</p>
        </div>
        <div className="underline"></div>
        <div className="itemConteiner">
          <div>
            <FiGithub className="contacts__item" />
          </div>
          <a href="https://github.com/Pasha147">Pasha147</a>
        </div>
        <div className="underline"></div>
        <div className="itemConteiner">
          <div>
            <FiLinkedin className="contacts__item" />
          </div>
          <a href="https://www.linkedin.com/in/pfernati/">pfernati</a>
        </div>
        {/* <div className="underline"></div> */}
      </div>
      <div className="chat" onClick={() => dispatch(chatOpen())}>
        <BiCommentDetail className="icon" />
        <p>Send a message</p>
      </div>
      <div className={`modal ${chatOn ? "modal_active" : "modal_off"}`}>
        <BiXCircle
          className="closeIcon"
          onClick={() => dispatch(chatClose())}
        />

        <MessageForm />
      </div>
    </article>
  );
}

export default ContactsArt;
