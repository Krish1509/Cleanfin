import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LandingPage;
