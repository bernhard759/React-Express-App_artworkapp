import './App.css';
import { useEffect, useState } from "react";
import Login from "./components/login.js";
import Homepage from "./components/homepage.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// App
function App() {

  // Signin state
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // Signing startup
  useEffect(() => {
    if (localStorage.getItem("token") && !isUserSignedIn) {
      setIsUserSignedIn(true);
    }
    else setIsUserSignedIn(false);
  }, [])

  // Signin toast
  useEffect(() => {
    if (isUserSignedIn) {
      toast.info(`Logged in as ${localStorage.getItem("name")}`);
    }
  }, [isUserSignedIn]);

  // Successful login function prop
  const onLoginSuccessful = () => {
    setIsUserSignedIn(true);
  };

  // Logout
  const onLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    setIsUserSignedIn(false);
  };



  // Return Login Page or Homepage based on users login status
  return (
    <>
    {isUserSignedIn ? <Homepage onLogout={onLogout} />
    : <Login onLoginSuccessful={onLoginSuccessful} />}
    <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={true}
    theme="colored"
    />
    </>
  );
}

export default App;
