import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link style={{ marginRight: "2rem" }} to="/">
        Home
      </Link>
      <Link to="/register" style={{ marginRight: "2rem" }}>
        Register
      </Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
