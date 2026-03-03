import "./styles/header.modules.css";

export default function Header({ title, subtitle, children }) {
  return (

    <header className="header">
      <img src= "/background.mp4/m2-res_476p.gif" className="header-bg" />
      <div className="header-overlay"></div>
      <div className="header-content">
        <img src="/senaidexlogo.png" alt="SenaiDex Logo" className="logo" />
        <h2 className="header-subtitle">{subtitle}</h2>
        {children}
      </div>
    </header>
  );
}
