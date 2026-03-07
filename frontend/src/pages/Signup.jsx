import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../api";
import "../styles/Auth.css";

export default function Signup() {

  const {
    signup,
    loginWithGoogle,
    loginWithFacebook,
  } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setError(
        "Password must be at least 6 characters"
      );
    }

    try {

      setError("");
      setLoading(true);

      // ===== Username check =====

      const checkRes = await fetch(
        `${API_BASE_URL}/api/users/check-username`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
          }),
        }
      );

      const checkData = await checkRes.json();

      if (checkData.exists) {
        throw new Error(
          "Username already taken"
        );
      }

      // ===== Firebase User =====

      const userCredential = await signup(
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // ===== MongoDB Save =====

      const saveRes = await fetch(
        `${API_BASE_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            firebaseUid: user.uid,
          }),
        }
      );

      if (!saveRes.ok) {

        console.error(
          "Failed to save user to MongoDB"
        );

      }

      navigate("/");

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Failed to create account."
      );

    } finally {

      setLoading(false);

    }

  }

  async function handleSocialLogin(
    providerMethod
  ) {

    try {

      setError("");
      setLoading(true);

      await providerMethod();

      navigate("/");

    } catch (err) {

      console.error(err);

      setError(
        "Failed to create account. Please try again."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">
          Join Us
        </h1>

        <p className="auth-subtitle">
          Start your sustainability journey today
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="auth-input"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="auth-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            type="submit"
            className="auth-submit-btn"
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>

        </form>

        <div className="auth-divider">
          Or continue with
        </div>

        <button
          className="social-btn google-btn"
          onClick={() =>
            handleSocialLogin(
              loginWithGoogle
            )
          }
          disabled={loading}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="social-icon"
          />
        </button>

        <button
          className="social-btn facebook-btn"
          onClick={() =>
            handleSocialLogin(
              loginWithFacebook
            )
          }
          disabled={loading}
        >
          <img
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook"
            className="social-icon"
          />
        </button>

        <div className="footer-text">

          Already have an account?

          <Link
            to="/login"
            className="footer-link"
          >
            {" "}
            Log In
          </Link>

        </div>

      </div>

    </div>

  );

}