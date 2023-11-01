import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  if (!user) {
    navigate("/login");
    return null;
  }
  if (user) {
    return (
      <div>
        <h1>Dashboard</h1>
        {!!user && <h2>Hi {user.name}!</h2>}
      </div>
    );
  }
};

export default Dashboard;
