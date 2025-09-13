import React, { useState } from "react";
import styles from "./LoginRegister.module.css";

const LoginRegister = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", loginData);
    // Add your login logic here
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", signupData);
    // Add your signup logic here
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.LoginRegisterContainer}>
        <p>Free Shipping Sitewide on Every Order, Don't Miss Out!!</p>
        <button className={styles.loginButton} onClick={() => setIsOpen(true)}>
          LOG IN / SIGNUP
        </button>

        {isOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
              <button className={styles.closeButton} onClick={closeModal}>
                ×
              </button>

              <div className={styles.modalContent}>
                <div className={styles.header}>
                  <h2 className={styles.title}>Login or Signup</h2>
                  <p className={styles.subtitle}>
                    Get Exciting Offers & Track Order
                  </p>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "login" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("login")}
                  >
                    LOGIN
                  </button>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "signup" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("signup")}
                  >
                    SIGNUP
                  </button>
                </div>

                {/* Login Form */}
                {activeTab === "login" && (
                  <form onSubmit={handleLoginSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          type="text"
                          name="emailOrPhone"
                          className={styles.input}
                          value={loginData.emailOrPhone}
                          onChange={handleLoginChange}
                          required
                          placeholder="Email or Phone Number *"
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          type="password"
                          name="password"
                          className={styles.input}
                          value={loginData.password}
                          onChange={handleLoginChange}
                          required
                          placeholder="Password *"
                        />
                      </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                      Login with Password
                    </button>

                    <div className={styles.divider}>
                      <span className={styles.dividerText}>OR</span>
                    </div>

                    <button type="button" className={styles.otpButton}>
                      Login with OTP
                    </button>

                    <div className={styles.forgotPassword}>
                      <a href="#" className={styles.forgotLink}>
                        Forgot Password?
                      </a>
                    </div>
                  </form>
                )}

                {/* Signup Form */}
                {activeTab === "signup" && (
                  <form onSubmit={handleSignupSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          type="text"
                          name="username"
                          className={styles.input}
                          value={signupData.username}
                          onChange={handleSignupChange}
                          required
                          placeholder="Username *"
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          type="email"
                          name="email"
                          className={styles.input}
                          value={signupData.email}
                          onChange={handleSignupChange}
                          required
                          placeholder="Email *"
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.phoneInputWrapper}>
                        <div className={styles.countryCode}>
                          <span className={styles.flag}>🇮🇳</span>
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          name="mobile"
                          className={styles.phoneInput}
                          value={signupData.mobile}
                          onChange={handleSignupChange}
                          required
                          placeholder="Phone Number *"
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          type="password"
                          name="password"
                          className={styles.input}
                          value={signupData.password}
                          onChange={handleSignupChange}
                          required
                          placeholder="Password *"
                        />
                      </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                      Create Account
                    </button>

                    <div className={styles.divider}>
                      <span className={styles.dividerText}>OR</span>
                    </div>

                    <button type="button" className={styles.otpButton}>
                      Signup with OTP
                    </button>
                  </form>
                )}

                <div className={styles.socialLogin}>
                  <button className={styles.socialButton}>
                    <span className={styles.googleIcon}>G</span>
                    Continue with Google
                  </button>
                  <button className={styles.socialButton}>
                    <span className={styles.facebookIcon}>f</span>
                    Continue with Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginRegister;
