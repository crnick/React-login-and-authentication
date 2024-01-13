// import logo from './logo.svg';
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Admin from "./Admin";
import Home from "./Home";
import Missing from "./Missing";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/**nest other components public routes not handling the conditional logic over here*/}
          <Route path="/login" element={<Login />} />
          <Route path="/regiter" element={<Register />} />

          {/**private routes*/} {/**for home path */}
          <Route element={<RequireAuth allowedRoles={[]} />}> {/**we are able to go back to where we were before */}
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/*" element={<Missing />} />
        </Route>
      </Routes>
      {/* <Register /> replace this with layout component */}
      <Login />
    </main>
  );
}

export default App;
