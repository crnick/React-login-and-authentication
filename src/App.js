// import logo from './logo.svg';
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <main className="App">
      <AuthProvider>
        {/* <Register /> */}
        <Login />
      </AuthProvider>
    </main>
  );
}

export default App;
