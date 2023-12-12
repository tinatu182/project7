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

  const handleLike = () => {
    onSent();
  };

  const handleComment = () => {
    onSent();
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
            {/* Condition to display search bar */}
            {showSearch ? (
              <div className={`d-flex flex-row justify-content-center align-item-center my-30  ${darkmode ? styles.searchBarDark : styles.searchBar}`}>
                <i className="fa-solid fa-magnifying-glass mr-15"></i>
                <input onInput={handleInput} className="flex-fill" type="text" placeholder="To research" />
              </div>
            ) : (
              ""
            )}
          </div>
          {data
            .filter((message) => message.firstName.toLowerCase().startsWith(filter))

            .map((message) => (
              <Message
                key={message.id}
                message={message}
                onDelete={() => handleDelete(message.id)}
                onLike={() => handleLike()}
                onComment={() => handleComment()}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
