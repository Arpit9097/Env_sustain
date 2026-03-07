import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../api";
import "../styles/Auth.css";

export default function Login() {

  const {
    login,
    loginWithGoogle,
    loginWithFacebook,
  } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setError("");
      setLoading(true);

      let emailToUse = identifier;

      // Username login → fetch email from backend
      if (!identifier.includes("@")) {

        const res = await fetch(
          `${API_BASE_URL}/api/users/get-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: identifier,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("User not found");
        }

        const data = await res.json();

        emailToUse = data.email;

      }

      await login(emailToUse, password);

      navigate("/");

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Failed to log in. Check your credentials."
      );

    } finally {

      setLoading(false);

    }

  }

  async function handleSocialLogin(providerMethod) {

    try {

      setError("");
      setLoading(true);

      await providerMethod();

      navigate("/");

    } catch (err) {

      console.error(err);

      setError(
        "Failed to log in. Please try again."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Sign in to continue your journey
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
            placeholder="Username or Email"
            className="auth-input"
            value={identifier}
            onChange={(e) =>
              setIdentifier(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            disabled={loading}
            type="submit"
            className="auth-submit-btn"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

        </form>

        <div className="auth-divider">
          Or continue with
        </div>

        <button
          className="social-btn google-btn"
          onClick={() =>
            handleSocialLogin(loginWithGoogle)
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
            handleSocialLogin(loginWithFacebook)
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

          Don't have an account?

          <Link
            to="/signup"
            className="footer-link"
          >
            {" "}
            Sign Up
          </Link>

        </div>

      </div>

    </div>

  );

}