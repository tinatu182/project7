import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
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

  return (
    <div className={styles.message}>
      <div className={` d-flex  align-items-center  ${styles.userBox}`}>
        <div className={styles.signature}>
          <div className={styles.signatureName}>
            <b>{message.User.firstName} </b>
            <b>{message.User.lastName}</b>
          </div>
        </div>
      </div>

      <div className={`${styles.messageContent} d-flex flex-column justify-content-center align-items-center `}>
        <p className={styles.textMessage}>{editContent ? editContent : message.content}</p>

        {message.mediaUrl ? (
          <div className={styles.imageContainer}>
            <img className={styles.messageImg} src={message.mediaUrl} alt="message" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Message;
