import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Signup.module.scss";
import logo from "../assets/images/icon-left-font-monochrome-white.png";
import backgroundImg from "../assets/images/background.jpg";
import Error from "../components/Error";

const Signup = () => {
  const yupSchema = yup.object({
    firstName: yup.string().required("The field is required").min(2, "Too short").max(20, "Too long"),

    lastName: yup.string().required("The field is required").min(2, "Too short").max(20, "Too long"),

    email: yup.string().email("The email must be a valid email").required("The field is required"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password too short")
      .matches(/[a-z]/, "The password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "The password must contain at least 1 capital letter")
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, "Use at least 1 number or special character."),

    confirmPassword: yup
      .string()
      .required("You need to confirm your password")
      .oneOf([yup.ref("password"), ""], "Passwords don't match"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({           
    defaultValues,
    resolver: yupResolver(yupSchema),
    mode: "onSubmit",
  });

  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  async function submit(values) {
    values.confirmPassword = undefined;

    const response = await fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      reset(defaultValues);
      setSuccess(true);
    } else {
      const body = await response.json();
      setError(body.error);
    }
  }

  const navigate = useNavigate();

  return success ? (
    navigate("/login")
  ) : (
    <div className={styles.background}>
      <img className={styles.backgroundImg} src={backgroundImg} alt="lines" />

      <div className={`d-flex flex-row justify-content-center align-items-center ${styles.container}`}>
        <form className={styles.signupForm} onSubmit={handleSubmit(submit)}>
          <img className={styles.logo} src={logo} alt="logo groupomania" />
          <h1 className={`mb-20 ${styles.title}`}>Create a Profile</h1>{" "}
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="firstName"></label>
            <input
              className={styles.signinInput}
              {...register("firstName")}
              id="firstName"
              type="text"
              placeholder="First Name"
              autoComplete="off"
              aria-label="Enter your First Name"
            />
            <div className={styles.errorBox}>{errors?.firstName && <p className={styles.errorBoxText}>{errors.firstName.message}</p>}</div>
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="name"></label>
            <input
              className={styles.signinInput}
              {...register("lastName")}
              id="lastName"
              type="text"
              placeholder="Last Name"
              autoComplete="off"
              aria-label="Enter your Last Name"
            />
            <div className={styles.errorBox}>{errors?.lastName && <p>{errors.lastName.message}</p>}</div>
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="email"></label>
            <input
              className={styles.signinInput}
              {...register("email")}
              id="email"
              type="email"
              placeholder="email"
              autoComplete="off"
              aria-label="Enter your Email"
            />
            <div className={styles.errorBox}>{errors?.email && <p>{errors.email.message}</p>}</div>
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="password"></label>
            <input
              className={styles.signinInput}
              {...register("password")}
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              aria-label="Enter your Password"
            />
            <div className={styles.errorBox}>{errors?.password && <p>{errors.password.message}</p>}</div>
          </div>
          <div className="d-flex flex-column mb-20">
            <label className="mb-5" htmlFor="confirmPassword"></label>
            <input
              className={styles.signinInput}
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              aria-label="Confirm your password"
            />
            <div className={styles.errorBox}>{errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}</div>
          </div>
          <Error error={error} />
          <button disabled={isSubmitting} className={`btn btn-primary ${styles.btnSignin}`}>
          Create an account
          </button>
          <NavLink to="/login">
            <p className={styles.link} aria-label="Go to the login page">
            Log in to your account
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};
export default Signup;
