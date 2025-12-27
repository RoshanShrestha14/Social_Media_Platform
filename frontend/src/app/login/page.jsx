"use client";
import { useState, useEffect } from "react";
import styles from "../auth.module.css";
import API from "../config/Api";

export default function () {

   const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

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
        "/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log("Login successful");
        console.log(res.data);
      } else {
        setMessage(res.data.message || "Login failed");
      }

      setMessage(res.data.message);

      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Error:", err);
      const backendMessage = err.response?.data?.message || "Login failed";
      setMessage(backendMessage);
      console.log(message);
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
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Create a password"
              />
            </div>

            <button type="submit" className={styles.button}>
                {loading ? "Logging in…" : "Log In"}
            </button>
          </form>

          <div className={styles.loginLink}>
             Don't have an account?{" "}
            <a href="/login" className={styles.link}>
              Signup
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

            <a href="/signup" className={styles.loginButton}>
              <span className={styles.buttonIcon}></span>
              Go to Signup Page
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
