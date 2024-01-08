import React, { useRef, useEffect, useState } from "react";
import axios from "./api/Axios";
import useAuth from "./hooks/useAuth";

export default function Login() {
  const userRef = useRef(); //focus on username field when the page loads
  const errorRef = useRef(); //focus if error occurs we need focus on that for accessilibity

  const { setAuth } = useAuth();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errmsg, setErrmsg] = useState(""); //error we may get back while authenticating
  const [success, setSuccess] = useState(false); //state if login is successfull

  const LOGIN_URL = "/auth";

  useEffect(() => {
    userRef.current.focus(); //set focus when page loads
  }, []);

  useEffect(() => {
    setErrmsg("");
  }, [user, pwd]); //empty out the error message state if there is change in user or password

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
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

      // console.log(response.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles; // array
      setAuth({ accessToken, roles }); // global state for holding token and user role
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        //lost internet connection
        setErrmsg("No server response");
      } else if (error.response?.status === 400) {
        //information which was expected was not received
        setErrmsg("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrmsg("Unauthorized");
      } else {
        setErrmsg("login failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
        </section>
      ) : (
        <section>
          <p
            ref={errorRef}
            className={errmsg ? "errmsg" : "offscreen"} //offscreen will take it off the screen but still accsisble to screen reader
            aria-live="assertive" //when u set the focus to this paragraph it will be announced by the screen reader
          >
            {errmsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username" //no aria described by or label or hints becaause user's should know what they need to type
              ref={userRef}
              type="text"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user} //makes this a controlled input 
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password" //no aria described by or label or hints becaause user's should know what they need to type
              type="password"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
        </section>
      )}
    </>
  );
}
