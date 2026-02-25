import "./styles/header.modules.css";

export default function Header({ title, subtitle, children }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <h2 className="header-subtitle">{subtitle}</h2>

        {children}
      </div>
    </header>
  );
}
