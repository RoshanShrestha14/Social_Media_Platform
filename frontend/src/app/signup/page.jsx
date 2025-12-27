"use client";
import { useState, useEffect } from "react";
import styles from "../auth.module.css";
import API from "../config/Api";

export default function () {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await API.post(
        "/auth/register",
        {
          name: formData.fullname,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      console.log("Signup successful:", res.data);

      if (res.data.success) {
        console.log("Signup successful");
        console.log(res.data);
      } else {
        setMessage(res.data.message || "Login failed");
      }
      setMessage(res.data.message);

      setFormData({
        fullname: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Error during signup:", err);
      const backendMessage =
        err.response?.data?.message || "Login failed Server Error";
      setMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.card}>
          <div className={styles.header}>
            <p className={styles.subtitle}>Join and Share your thoughts</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your full name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Username</label>
              <input
                type="text"
                value={formData.username}
                name="username"
                className={styles.input}
                placeholder="Choose a username"
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className={styles.input}
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                className={styles.input}
                placeholder="Create a password"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.button}>
              {loading ? "Signing in…" : "Signup"}
            </button>
          </form>

          <div className={styles.loginLink}>
            Already have an account?{" "}
            <a href="/login" className={styles.link}>
              Login
            </a>
          </div>
        </div>
        <div className={styles.welcomeCard}>
          <div className={styles.cardContent}>
            <div className={styles.welcomeIcon}>
              <img
                src="/images/welcome.png"
                alt="Welcome Icon"
                style={{ height: "8rem", width: "9rem" }}
              />
            </div>
            <h3 style={{ fontSize: "2rem", color: "#d234eb" }}>to</h3>

            <h1 className={styles.title}> &nbsp;&nbsp; Connectly</h1>

            <a href="/login" className={styles.loginButton}>
              <span className={styles.buttonIcon}></span>
              Go to Login Page
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
