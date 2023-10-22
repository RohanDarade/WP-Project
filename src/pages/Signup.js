import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        data
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
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
        <button onClick={handleSubmit}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
