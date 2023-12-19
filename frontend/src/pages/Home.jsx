import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import config from "../config";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../App.module.scss";
import Form from "../components/Form";

const Home = () => {

  const fetchData = async () => await axios.get(config.BACK_URL + "/messages/", config.axios);

  const { isLoading, data, isSuccess, refetch } = useQuery("messages", fetchData);

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Form onSent={() => refetch()}/>
      
      {isSuccess && !isLoading && data.data ? (
        <Content
          data={data.data}
        />
      ) : (
        <div className="">"Loading"</div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
