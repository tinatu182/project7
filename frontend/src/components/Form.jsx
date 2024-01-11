import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import styles from "./Form.module.scss";
import FileUpload from "./FileUpload";
import config from "../config";

const Form = ({ onSent}) => {
  const { firstName, lastName, image, userId } = useContext(AppContext);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("media", files);
    data.append("content", content);
    
    data.append("userId", userId);

    await axios.post(config.BACK_URL + "/messages/", data, config.axiosFile);
    setContent("");
    setFiles("");
    onSent();
  };

  return (
    <div>
      <form className={`p-20  ${styles.form}`} onSubmit={(e) => handleSubmit(e)}>
        <div className={` ${styles.formContainer} d-flex `}>
          <textarea
            tabIndex={0}
            className={styles.textForm}
            autoFocus
            placeholder={`Exchange with your colleagues ${firstName} ${lastName} ...`}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            aria-label="write your message"
          ></textarea>
        </div>
        <FileUpload files={files} onFileSelected={(file) => setFiles(file)} />

        <button className={`mr-15 btn btn-reverse-primary ${styles.submitBtn}`} type="submit" value="Publier" aria-label="poster votre message">
          <span>Poster</span>
        </button>
      </form>
    </div>
  );
};

export default Form;
