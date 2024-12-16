import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; 
import "./login.css";
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginPage = () => {
  const [captchaValue, setCaptchaValue] = useState("");
  const [inputCaptchaValue, setInputCaptchaValue] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  const fonts = ["cursive", "sans-serif", "serif"];

  // Memoize the captcha generator function using useCallback
  const generateCaptcha = useCallback(() => {
    let value = btoa(Math.random() * 1000000000);
    value = value.substr(0, 5 + Math.random() * 5);
    setCaptchaValue(value);
  }, []);

  const setCaptcha = () => {
    const html = captchaValue.split("").map((char) => {
      const rotate = -20 + Math.trunc(Math.random() * 30);
      const font = fonts[Math.trunc(Math.random() * fonts.length)];
      return (
        <span
          key={Math.random()}
          style={{ transform: `rotate(${rotate}deg)`, fontFamily: font,  color: "white", }}
        >
          {char}
        </span>
      );
    });
    return html;
  };

  const handleCaptchaRefresh = () => {
    generateCaptcha();
  };

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Create an object to store the login data
    const loginData = {
      username: username,
      password: password,
      captchaEntered: inputCaptchaValue,
      generatedCaptcha: captchaValue
    };

    // Log the login data as a JSON string
    console.log("Login Data:", JSON.stringify(loginData, null, 2));

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError("Invalid Password");
      return;
    } else {
      setPasswordError(""); 
    }

    if (inputCaptchaValue === captchaValue) {
      alert("Log in success");
    } else {
      alert("Invalid Captcha");
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  return (
    <div className="login-page">
      {/* Background video */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="sign-up-container">
        <h1 className="heading">Login</h1>

        {/* Username input with icon */}
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            id="username"
            type="text"
            className="input-field"
            placeholder="Username"
            required
          />
        </div>

        {/* Password input with icon */}
        <div className="input-container">
          <i className="fa fa-lock icon"></i>
          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="Password"
            required
          />
        </div>

        {/* Password Error Message */}
        {passwordError && <div className="error-message">{passwordError}</div>}

        <div id="captcha" className="form_div mb-8">
          <div className="preview mb-4 text-center text-xl font-semibold text-black">
            {setCaptcha()}
          </div>
          <div className="captcha_form">
            <input
              type="text"
              id="captcha_form"
              className="input-field"
              placeholder="Enter Captcha"
              value={inputCaptchaValue}
              onChange={(e) => setInputCaptchaValue(e.target.value)}
              required
            />
            <button className="captcha_refresh" onClick={handleCaptchaRefresh}>
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>

        <button
          id="login_button"
          className="login-button"
          onClick={handleLogin}
        >
          <span>
            <a href="#" id="login" className="login">Login</a>
          </span>
        </button>

        <p className="account">
          Don’t have an account?{' '}
          {/* Use Link to navigate to the signup page */}
          <Link to="/signup" className="link">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
