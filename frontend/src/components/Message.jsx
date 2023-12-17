import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import axios from "axios";
import styles from "./Message.module.scss";
// import MessageComments from "./MessageComments";
import config from "../config";

const Message = ({ message, onDelete }) => {
  const { userId, setIsUserId } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [showComments, setShowComments] = useState(false);


  // Format date for messages timestamps //

  const formatDate = (date) => {
    let options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };
  console.log("Hello there ", message.mediaUrl)

  let content;
  if (message.mediaUrl.endsWith('.mp4')){
    content = <video controls className={`${styles.contentContainer} ${styles.videoContainer}`}><source src={message.mediaUrl} type="video/mp4" /></video>
  }else if (message.mediaUrl.endsWith('.mp3')){
    content = <audio controls className={`${styles.contentContainer} ${styles.mediaContainer}`}><source src={message.mediaUrl} type="audio/mpeg" /></audio>
  }else{
    content = <div className={`${styles.contentContainer} ${styles.imageContainer}`}><img className={styles.messageImg} src={message.mediaUrl} alt="message" /></div>;
  }

  const handleRead = async (e) => {
    e.preventDefault();
    let data = new FormData();

    data.append("ledgerId", message.id);
    data.append("userId", userId);

    await axios.post(config.BACK_URL + "/messages/read", data, config.axios);
    console.log("DATA ", message.id, userId)
  };
  const isRead = message.Ledgers.filter(ledger => ledger.userId === userId).length > 0;

  console.log("*****************SDWSYSDYSD ", isRead)

  return (
    <div className={styles.message}>
      <div className={` d-flex  align-items-center  ${styles.userBox}`}>
        <div className={styles.signature}>
          <div className={styles.signatureName}>
            <b>{message.User.firstName} </b>
            <b>{message.User.lastName}</b>
            {isRead ?
              <FaEnvelopeOpen color="green" size={30}/>
              :
              <FaEnvelope color="red" size={30} onClick={handleRead}/>
            }
          </div>
        </div>
      </div>

      <div className={`${styles.messageContent} d-flex flex-column justify-content-center align-items-center `}>
        <p className={styles.textMessage}>{editContent ? editContent : message.content}</p>

        {message.mediaUrl ? (
          content
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Message;
