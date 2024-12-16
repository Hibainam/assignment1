import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login";
import SignupPage from "./components/signup"; // Import your SignupPage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Add route for signup */}
      </Routes>
    </Router>
  );
};

export default App;
