import React, { useState } from "react";
import axios from "axios";
import styles from "./Content.module.scss";
import Message from "./Message";
import config from "../config";

const Content = ({ data, onSent, showSearch, darkmode }) => {
  const [filter, setFilter] = useState("");

  const handleDelete = (messageId) => {
    axios.delete(config.BACK_URL + "/messages/" + messageId, config.axios).then((res) => {
      onSent();
    });
  };


  const handleInput = (e) => {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  };

  console.log("styles.searchBarContainer", styles.searchBarContainer)
  return (
    <div className={`${styles.content} flex-fill  `}>
      <div className={styles.card}>
        <div className={darkmode ? styles.gridDark : styles.grid}>
          <div className={styles.searchBarContainer}>
          </div>
          {data
            .map((message) => (
              <Message
                key={message.id}
                message={message}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
