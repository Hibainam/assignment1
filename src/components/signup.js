import React, { useState, useEffect } from "react";
import "./signup.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  // State variables for form data, errors, and validation
  const [captchaValue, setCaptchaValue] = useState(""); // Holds the generated captcha value
  const [captchaInput, setCaptchaInput] = useState(""); // Captures user input for captcha
  const [mobileError, setMobileError] = useState(""); // Stores mobile number validation error
  const [passwordError, setPasswordError] = useState(""); // Stores password validation error
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Stores confirm password error
  const [captchaError, setCaptchaError] = useState(""); // Stores captcha validation error
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    letter: false,
    special: false,
  }); // Tracks password validation rules
  const [successMessage, setSuccessMessage] = useState(""); // Displays success message

  // Fonts for generating captcha styles
  const fonts = ["cursive", "sans-serif", "serif"];

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // Generate and initialize captcha on component mount
  useEffect(() => {
    initCaptcha();
  }, []);

  // Function to generate a random captcha value
  const gencaptcha = () => {
    let value = btoa(Math.random() * 1000000000); // Generate a random base64 string
    value = value.substr(0, 5 + Math.random() * 5); // Trim it to 5-10 characters
    setCaptchaValue(value); // Set the captcha value
  };

  // Function to split captcha characters and style them randomly
  const setcaptcha = () => {
    return captchaValue.split("").map((char, index) => {
      const rotate = -20 + Math.trunc(Math.random() * 30); // Random rotation
      const font = fonts[Math.trunc(Math.random() * fonts.length)]; // Random font
      return (
        <span
          key={index}
          style={{
            transform: `rotate(${rotate}deg)`,
            fontFamily: font,
            color: "white",
          }}
        >
          {char}
        </span>
      );
    });
  };

  // Initialize captcha on page load or refresh
  const initCaptcha = () => {
    gencaptcha();
  };

  // Validate the password against rules
  const validatePassword = (password) => {
    const validations = {
      length: password.length >= 8, // At least 8 characters
      letter: /[A-Za-z]/.test(password), // Contains at least one letter
      special: /[!@#$%^&*]/.test(password), // Contains at least one special character
    };
    setPasswordValidations(validations); // Update validation states
    const allValid = Object.values(validations).every((isValid) => isValid); // Check if all rules are satisfied
    setPasswordError(allValid ? "" : "Password does not meet all requirements.");
    return allValid;
  };

  // Validate mobile number format
  const validateMobile = (mobile) => {
    const regex = /^[0-9]{10}$/; // Checks for exactly 10 digits
    return regex.test(mobile);
  };

  // Form validation function
  const validateForm = () => {
    let isValid = true;

    // Mobile number validation
    if (!validateMobile(formData.mobile)) {
      setMobileError("Mobile number must be 10 digits.");
      isValid = false;
    } else {
      setMobileError("");
    }

    // Password validation
    if (!validatePassword(formData.password)) {
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    // Captcha validation
    if (captchaInput !== captchaValue) {
      setCaptchaError("Captcha does not match.");
      isValid = false;
    } else {
      setCaptchaError("");
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Log form data as JSON to the console
      console.log("Form Data (JSON):", JSON.stringify(formData, null, 2));

      setSuccessMessage("Account created successfully!"); // Display success message
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      }); // Reset form
      setCaptchaInput(""); // Clear captcha input
      initCaptcha(); // Generate new captcha
    } else {
      setSuccessMessage("");
      alert("Please fill in correct details.");
    }
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get field name and value
    setFormData({
      ...formData,
      [name]: value, // Update specific field in state
    });
  };

  // Component rendering
  return (
    <div className="signup-container">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src="background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="signup-form-container">
        <h1 className="form-title">Sign Up</h1>
        <form id="sign-up-form" className="form-fields" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            className="input-field"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            name="email"
            type="email"
            className="input-field"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            name="mobile"
            type="tel"
            className="input-field"
            placeholder="Mobile No"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
          {mobileError && <div className="error-message">{mobileError}</div>}
          <input
            name="password"
            type="password"
            className="input-field"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <div className="password-requirements">
            <ul>
              <li className={passwordValidations.length ? "valid" : "invalid"}>
                Minimum 8 characters
              </li>
              <li className={passwordValidations.letter ? "valid" : "invalid"}>
                At least one letter (uppercase or lowercase)
              </li>
              <li className={passwordValidations.special ? "valid" : "invalid"}>
                At least one special character (!@#$%^&*)
              </li>
            </ul>
          </div>
          <input
            name="confirmPassword"
            type="password"
            className="input-field"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {confirmPasswordError && (
            <div className="error-message">{confirmPasswordError}</div>
          )}
          <div id="captcha" className="captcha-section">
            <div className="captcha-preview">{setcaptcha()}</div>
            <div className="captcha-input">
              <input
                type="text"
                id="captcha_form"
                className="input-field"
                placeholder="Enter Captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
              />
              <button
                type="button"
                className="captcha-refresh"
                onClick={initCaptcha}
              >
                <i className="fa fa-refresh"></i>
              </button>
            </div>
            {captchaError && <div className="error-message">{captchaError}</div>}
          </div>
          <button id="submit-button" className="submit-button">
            Create Account
          </button>
          <p className="account">
            Already have an account?{" "}
            <Link to="/" className="link">
              Login
            </Link>
          </p>
        </form>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>
    </div>
  );
};
export default SignUp;