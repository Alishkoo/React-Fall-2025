import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand">
          <Link to="/">Rick & Morty Lab</Link>
        </div>
        <div className="links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/items">Characters</NavLink>
          <NavLink to="/locations">Locations</NavLink>
          <NavLink to="/episodes">Episodes</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </nav>
  );
}
