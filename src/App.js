import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Povar from "./pages/Povar";
import User from "./pages/User";

function App(props) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  console.log(admin);

  useEffect(() => {
    console.log("token check");
    if (window.localStorage.getItem("token") === "true") {
      setAdmin(true);
      navigate("/admin");
    } else {
      window.localStorage.setItem("token", "false");
      setAdmin(false);
    }
  }, [admin]);

  const [povar, setPovar] = useState(false);
  return (
    <div>
      <Routes>
        <Route path="/" element={<User />} />
        <Route
          path="/login"
          element={
            <Login
              admin={admin}
              povar={povar}
              setAdmin={setAdmin}
              setPovar={setPovar}
            />
          }
        />
        <Route
          path="/admin"
          element={<Admin admin={admin} setAdmin={setAdmin} />}
        />
        <Route
          path="/povar"
          element={<Povar povar={povar} setSign={setPovar} />}
        />
      </Routes>
    </div>
  );
}

export default App;
