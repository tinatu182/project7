import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "./Content.module.scss";
import Message from "./Message";

const Content = ({ data, darkmode }) => {
  const { userId, setIsUserId } = useContext(AppContext);

  return (
    <div className={`${styles.content} flex-fill  `}>
      <div className={styles.card}>
        <div className={darkmode ? styles.gridDark : styles.grid}>
          <div className={styles.searchBarContainer}>
          </div>
          {data
             .sort((a, b) => {
              if (a.isRead === b.isRead) {
                return 0; // Maintain the order if isRead values are the same
              }
              return a.isRead ? 1 : -1; // Sort false before true
            })
            .map((message) => (
              <Message
                key={message.id}
                message={message}
                isRead={message.Ledgers.filter(ledger => ledger.userId === userId).length > 0}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
