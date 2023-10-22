import React from "react";

function Home() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
