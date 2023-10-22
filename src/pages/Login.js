import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth", data);
      console.log(response);
      localStorage.setItem("token", response.data);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default Login;
