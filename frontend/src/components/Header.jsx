import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <Link to="/">Login</Link> |{" "}
      <Link to="/signup">Signup</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/stores">Stores</Link>
    </nav>
  );
}
