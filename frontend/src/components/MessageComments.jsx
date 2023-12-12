import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import config from "../config";
import styles from "./MessageComments.module.scss";

const MessageComments = ({ message, onComment }) => {
  const { userId, image, firstName, lastName, isAdmin } = useContext(AppContext);
  const [text, setText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      comment: text,
      postID: message.id,
      commenterImage: image,
    });

    axios
      .patch(config.BACK_URL + `/messages/comment-post/${message.id}`, data, config.axios)
      .then(function () {
        setText("");
        onComment();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleDelete = (e) => {
    const data = JSON.stringify({
      commentId: e,
    });

    axios
      .patch(config.BACK_URL + `/messages/delete-comment-post/${message.id}`, data, config.axios)
      .then(function (response) {
        onComment();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className={styles.commentsContainer}>
      {message.comments.map((comment) => {
        return (
          <div className={styles.commentsBox} key={comment.id}>
            <div className={styles.userBox}>
              <div className={styles.leftPart}>
                <pre></pre>
                <img className={styles.userImg} src={comment.commenterImage} alt="avatar" />
              </div>
              <div className={`d-flex ${styles.rightPart}`}>
                <div className={styles.commentBox}>
                  <p className={styles.commenterPseudo}>{comment.commenterPseudo}</p>
                  <p className={styles.commenterText}>{comment.text}</p>
                  <p>{comment.timestamp}</p>
                </div>

                {userId === comment.commenterId || isAdmin === true ? (
                  <div className={styles.btnDelete}>
                    <button className="btn-edit" onClick={(e) => handleDelete(comment.id)} aria-label="delete your comment">
                      <i className="fa-sharp fa-solid fa-trash" tabIndex={10}></i>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}

      {userId && (
        <form className={styles.commentForm} onSubmit={handleComment}>
          <textarea
            className={styles.textForm}
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder={`comment on the post ${message.firstName} ...`}
            aria-label="write your comment"
            tabIndex={8}
          />
          <button className={` btn btn-reverse-primary ${styles.submitBtn}`} type="submit" value="Publish" aria-label="post your comment" tabIndex={9}>
            <i className="fa-solid fa-comment mr-5"></i>
            <span>Poster</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default MessageComments;
