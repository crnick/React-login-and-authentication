// import logo from './logo.svg';
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Admin from "./Admin";
import Home from "./Home";
import Missing from "./Missing";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/**nest other components public routes*/}
          <Route path="/login" element={<Login />} />
          <Route path="/regiter" element={<Register />} />

          {/**private routes*/}
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/*" element={<Missing />} />
        </Route>
      </Routes>
      {/* <Register /> replace this with layout component */}
      <Login />
    </main>
  );
}

export default App;
