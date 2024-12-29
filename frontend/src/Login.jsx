
import React, { useState } from "react";
import "./Login.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {isLogin ? (
          <>
            <h2 className="auth-title">Login</h2>
            <form>
              <input type="email" placeholder="Email" className="auth-input" />
              <input type="password" placeholder="Password" className="auth-input" />
              <button type="submit" className="auth-button">Login</button>
            </form>
            <p className="auth-switch">
              Don't have an account?{" "}
              <span className="auth-link" onClick={toggleForm}>
                Sign Up
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="auth-title">Sign Up</h2>
            <form>
              <input type="text" placeholder="Full Name" className="auth-input" />
              <input type="email" placeholder="Email" className="auth-input" />
              <input type="password" placeholder="Password" className="auth-input" />
              <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <p className="auth-switch">
              Already have an account?{" "}
              <span className="auth-link" onClick={toggleForm}>
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;