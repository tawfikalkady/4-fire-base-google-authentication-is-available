import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "./Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const GoogleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);

  //sign in btn
  const handleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //sign out btn
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        //sign out successful
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        //an error happend
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>fire base authentication</h1>
      {user && (
        <div>
          <img src={user.photoURL} alt="" />
          <h4>name: {user.displayName}</h4>
          <h4>Email: {user.email}</h4>
        </div>
      )}
      {
        //applying ternary operator to toggle btn
        user ? (
          <button onClick={handleSignOut}>google sign out</button>
        ) : (
          <button onClick={handleSignIn}>google sign in</button>
        )
      }
    </div>
  );
}

export default App;
