import { useState, useLayoutEffect } from "react";
import reactLogo from "./assets/react.svg";
import jwt_decode from "jwt-decode";
import "./App.css";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const [isAuth, setIsAuth] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  const authHandler = (res) => {
    setIsAuth(true);
    const decodedToken = jwt_decode(res.credential);
    console.log("response:", res);
    console.log("decoded:", decodedToken);

    setUserInfo({ ...decodedToken });
  };

  const initializeGSI = () => {
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: authHandler,
    });
    google.accounts.id.prompt((notification) => {
      console.log("notification:", notification);
    });
  };

  useLayoutEffect(() => {
    if (isAuth) return;
    initializeGSI();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {isAuth ? (
          <h2> Hello {userInfo && userInfo.name}</h2>
        ) : (
          "User is NOT signed in"
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more{" "}
      </p>
    </div>
  );
}

export default App;
