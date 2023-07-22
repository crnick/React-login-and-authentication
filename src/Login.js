import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "./api/Axios";

export default function Login() {
  const userRef = useRef();
  const errorRef = useRef();

  const { setAuth } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errmsg, setErrmsg] = useState("");

  const [success, setSuccess] = useState(false);
  const REGISTER_URL = "/register";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrmsg("");
  }, [user, pwd]); //empty out the error message state if there is change in user or password

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles; // array
      setAuth({ accessToken, roles });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        //lost internet connection
        setErrmsg("No server response");
      } else if (error.response?.status === 400) {
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
              value={user}
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
