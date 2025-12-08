import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function NavBar() {
  const { logout, user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand fw-bold" to="/appointments">
        Clinic Admin
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/appointments">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/appointments/new">
              Add Appointment
            </Link>
          </li>
        </ul>

        <span className="navbar-text me-3">
          {user?.name}
        </span>

        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
