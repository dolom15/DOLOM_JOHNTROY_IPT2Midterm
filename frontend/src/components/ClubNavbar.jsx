import { NavLink } from 'react-router-dom';

export default function ClubNavbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">

        <h2>Student Club</h2>

        <div className="nav-links">

          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/members">
            Members
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

        </div>

      </div>
    </nav>
  );
}