import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "./api/Axios";

const USER_REGEX = /^[a-zA-z][A-z0-9-_]{3,23}$/; //regex for email
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // regex for pasword
const REGISTER_URL = "/register";

export default function Register() {
  const userRef = useRef(); // focus on username name when component loads;
  const errorRef = useRef(); // focus when we get error to be announced by screen reader.

  const [user, setUser] = useState(""); //actual value which user types,
  const [validName, setValidName] = useState(false); // whether user name is valid
  const [userFocus, setUserFocus] = useState(false); // set's the user focus

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [pwdMatch, setPwdMatch] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState(""); // displaying error message
  const [success, setSuccess] = useState(false); // successfull submission for registration

  useEffect(() => {
    userRef.current.focus(); //when component loads
  }, []);

  useEffect(() => {
    // validate user name
    const result = USER_REGEX.test(user); //whenver user input field changes
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === pwdMatch;
    setValidMatch(match);
  }, [pwd, pwdMatch]);

  useEffect(() => {
    setErrorMsg(""); // user has read the error match everytime they make a change in input field
  }, [user, pwd, pwdMatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // just for additional protection from javascript hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrorMsg("Invalid Entry");
      return; //don't send anything
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(
          { user, pwd }, //destructuring data
          {
            headers: {
              "content-type": "application/json",
              withCredentials: true,
            },
          }
        )
      );

      console.log(response.data);
      setSuccess(true);
      //here you can clear the input fields
    } catch (error) {
      if (!error?.response) {
        //lost internet connection
        setErrorMsg("No server response");
      } else if (error.response?.status === 409) {
        setErrorMsg("Username is taken");
      } else {
        setErrorMsg("registration failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errorRef}
            className={errorMsg ? "errmsg" : "offscreen"} //offscreen will take it off the screen but still accsisble to screen reader
            aria-live="assertive" //when u set the focus to this paragraph it will be announced by the screen reader
          >
            {errorMsg}
          </p>

          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            {" "}
            {/**because we have only one button we don't need onclick */}
            <label htmlFor="username">Username</label>{" "}
            {/**you can hide icons because its just for visual representation */}
            <input
              type="text"
              id="username"
              value={user}
              ref={userRef}
              autoComplete="off"
              required
              aria-invalid={validName ? "false" : "true"} //before submitting whether input field needs adjustment
              aria-describedby="uidnote" //describes read label first, then type and then aria-invalid and then description
              //provide another element to describe the input field
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                // user is not empty
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              {/**here offscreen meaning its available to screen readers does not set to display none */}
              4 to 24 characters. <br /> Must begin with letter. <br /> Letters,
              numbers, hypens allowed.
              <br />
            </p>
            <label htmlFor="password">Password</label>{" "}
            {/**you can hide icons because its just for visual representation */}
            <input
              type="password"
              id="password"
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"} //before submitting whether input field needs adjustment
              aria-describedby="pwdidnote" //describes read label first, then type and then aria-invalid and then description
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlue={() => setPwdFocus(false)}
            />
            <p
              id="pwdidnote"
              className={
                //when focused you instantly get the directions

                // user is not empty
                pwdFocus && !validPwd ? "instructions" : "offscreen"
              }
            >
              {/**here offscreen meaning its available to screen readers does not set to display none */}
              8 to 24 characters . <br /> Must include uppercase, lowercase and
              special character. <br /> Allowed special characters{" "}
              <span aria-label="exclamation">!</span>.
              <br />
            </p>
            <label htmlFor="confirm_password">Confirm Password</label>{" "}
            {/**you can hide icons because its just for visual representation */}
            <input
              type="password"
              id="confirm_password"
              value={pwdMatch}
              required
              aria-invalid={validMatch ? "false" : "true"} //before submitting whether input field needs adjustment
              aria-describedby="confirmnote" //describes read label first, then type and then aria-invalid and then description
              onChange={(e) => setPwdMatch(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlue={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                // no need to check if password is valid
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              Must match the first password field.
              <br />
            </p>
            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </>
  );
}
