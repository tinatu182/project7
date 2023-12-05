import React, { useContext, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import config from "../config";
import axios from "axios";
import styles from "./Profile.module.scss";
import backgroundImg from "../assets/images/background.jpg";
import FileUpload from "../components/FileUpload";
import Error from "../components/Error";

const Profile = () => {
  const { firstName, lastName, image, userId, isAdmin, displayUser } = useContext(AppContext);

  const [files, setFiles] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    let data = new FormData();
    data.append("image", files);

    axios
      .put(config.BACK_URL + "/auth/" + userId, data, config.axios)
      .then((user) => {
        displayUser(user);
        setFiles("");
      })
      .catch((error) => {
        setError(error.response.data);
        setFiles("");
      });
  };

  const navigate = useNavigate();

  const handleDelete = (e) => {
    setTimeout(() => {
      if (window.confirm("Are you sure you want to delete your account? ?")) {
        axios.delete(config.BACK_URL + "/auth/" + userId, config.axios);
        setSuccess(true);
      } else {
        navigate("/profile");
      }
    }, 800);
  };

  return success ? (
    navigate("/login")
  ) : (
    <div className={styles.background}>
      <img className={styles.backgroundImg} src={backgroundImg} alt="lines" />
      <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
        <img className={` ${styles.userimg}`} src={image} alt="avatar" />
        <div className={styles.userName}>
          <span>{firstName} </span>
          <span>{lastName}</span>

          <div className={styles.userStatus}>{isAdmin === true ? <div>status: Administrator</div> : <div>status: User</div>}</div>
        </div>
        <FileUpload files={files} onFileSelected={(file) => setFiles(file)} />

        <button className={`btn btn-reverse-primary ${styles.submitBtn}`} type="submit" value="Publish" aria-label="edit your profile">
          <span>EDIT</span>
        </button>
        <Error error={error} />
        <div className={styles.deleteLink}>
          <p onClick={handleDelete}>Delete account</p>
        </div>

        <NavLink to="/">
          <i
            className={`fa-solid fa-house ${styles.homeIcon}`}
            aria-label="join the main page"
            ref={inputRef}
            onKeyDown={handleClick}
            tabIndex={0}
          ></i>
        </NavLink>
      </form>
    </div>
  );
};
export default Profile;
