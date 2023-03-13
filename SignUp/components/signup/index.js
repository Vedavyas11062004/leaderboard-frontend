import React, { useState } from "react";
import SignUp from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { signup, signupGoogle } from "../../redux/actions/auth";

const InitState = {
  email: "",
  password: "",
};

function Signup() {
  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const [sForm, setsForm] = useState(InitState);

  const handleChange = (e) =>
    setsForm({
      ...sForm,
      [e.target.name]: e.target.value,
    });

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    dispatch(signupGoogle(accessToken, nagivate));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (
      sForm.password !== "" &&
      sForm.email !== "" &&
      sForm.password.length >= 4
    ) {
      dispatch(signup(sForm, nagivate));
      window.alert("Registered Succesfully...");
    }
    else{
      window.alert("Please fill all details");
    }
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (
    <div className={SignUp.loginContainer}>
      <div className={SignUp.loginContainerv2}>
        <h2>Register to an account</h2>
        
        <button onClick={() => login()} className={SignUp.googleBTN}>
          <i class="fa-brands fa-google"></i> Sign up with google
        </button>
        
        <span className={SignUp.or}>or</span>

        <div className={SignUp.without}>
        <div className={SignUp.inputContainer}>
          <label>EMAIL</label>
          <input
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            type="email"
          />
        </div>

        <div className={SignUp.inputContainer}>
          <label>PASSWORD</label>
          <input
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            type="password"
          />
        </div>


        <button onClick={handleOnSubmit} className={SignUp.loginBTN}>
          REGISTER
        </button>

        </div>
        
        <div className={SignUp.footerContainer}>
          <div>
            Already Signed Up? <Link to="/account/login">Login</Link>
          </div>
          {/* <div>
            <Link to="/account/forgotpassword">Forgot Password?</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
