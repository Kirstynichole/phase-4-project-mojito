
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function App() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/check_session`).then((res) => {
        if (res.ok) {
            res.json().then((user) => setUser(user));
        }
    });
}, []);

function attemptLogin(userInfo) {
  fetch(`/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
      },
      body: JSON.stringify(userInfo),
  })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          throw res;
      })
      // if we log in successfully, we want to store the
      // user object in state
      .then((data) => {
          setUser(data);
          // go to the home page if we log in successfully
          console.log(data)
          navigate("/");
      })
      .catch((e) => {
          alert('incorrect username or password')
          console.log(e);
      });
}
function logout() {
  // for logging out we just set user to null
  fetch(`/logout`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
          setUser(null);
      }
  });
}

  return (
    <div>
      <Navbar logout={logout} user={user}/>
      <Outlet context={{ user, attemptLogin, logout }}/>
    </div>
  );
}

export default App;
