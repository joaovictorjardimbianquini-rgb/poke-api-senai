import "./styles/header.modules.css";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "HOME", end: true },
  { to: "/teambuilder", label: "TEAM BUILDER" },
  { to: "/login", label: "LOGIN" },
  { to: "/cadastro", label: "CADASTRO" },
];

export default function Header({ subtitle, children, compact = false }) {
  return (
    <header className={`header${compact ? " header-compact" : ""}`}>
      <img src= "/background.mp4/m2-res_476p.gif" className="header-bg" />
      <div className="header-overlay"></div>
      <nav className="header-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `header-link${isActive ? " header-link-active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="header-content">
        <img src="/senaidexlogo.png" alt="SenaiDex Logo" className="logo" />
        <h2 className="header-subtitle">{subtitle}</h2>
        {children}
      </div>
    </header>
  );
}
