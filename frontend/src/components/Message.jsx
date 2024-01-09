import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import axios from "axios";
import styles from "./Message.module.scss";
import config from "../config";

const Message = ({ message, isRead }) => {
  const { userId, setIsUserId } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(isRead);


  let content;
  if (message.mediaUrl.endsWith('.mp4')) {
    content = <video controls className={`${styles.contentContainer} ${styles.videoContainer}`}><source src={message.mediaUrl} type="video/mp4" /></video>
  } else if (message.mediaUrl.endsWith('.mp3')) {
    content = <audio controls className={`${styles.contentContainer} ${styles.mediaContainer}`}><source src={message.mediaUrl} type="audio/mpeg" /></audio>
  } else {
    content = <div className={`${styles.contentContainer} ${styles.imageContainer}`}><img className={styles.messageImg} src={message.mediaUrl} alt="message" /></div>;
  }

  const handleRead = async (e) => {
    e.preventDefault();
    let data = new FormData();

    data.append("ledgerId", message.id);
    data.append("userId", userId);

    await axios.post(config.BACK_URL + "/messages/read", data, config.axios);
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.message}>
      <div className={` d-flex  align-items-center  ${styles.userBox}`}>
        <div className={styles.signature}>
          <div className={styles.signatureName}>
            <b>{message.User.firstName} </b>
            <b>{message.User.lastName}</b>
          </div>
          <div>
            {collapsed ?
              <FaEnvelopeOpen color="gray" size={30} />
              :
              <FaEnvelope color="red" size={30} onClick={handleRead} />
            }
          </div>
        </div>
      </div>
      {collapsed && (
        <div className={`${styles.messageContent} d-flex flex-column justify-content-center align-items-center `}>
          <p className={styles.textMessage}>{message.content}</p>

          {message.mediaUrl ? (
            content
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
