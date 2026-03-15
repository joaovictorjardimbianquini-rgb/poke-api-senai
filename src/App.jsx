import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Pesquisa from "./components/Pesquisa";

import Home from "./Templates/Home";
import Cadastro from "./Templates/Cadastro";
import Login from "./Templates/Login/index.jsx";
import TeamBuilder from "./Templates/TeamBuilder";
import Header from "./components/Header";

function AppContent({ search, setSearch }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const subtitles = {
    "/": "Explore todos os Pokemon",
    "/teambuilder": "Monte seu time ideal",
    "/login": "Entre para continuar sua jornada",
    "/cadastro": "Crie sua conta de treinador",
  };

  return (
    <>
      <Header subtitle={subtitles[location.pathname] ?? subtitles["/"]} compact={!isHome}>
        {isHome ? (
          <Pesquisa
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
          />
        ) : null}
      </Header>
      <Routes>
        <Route path="/" element={<Home searchQuery={search} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/teambuilder" element={<TeamBuilder />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <AppContent search={search} setSearch={setSearch} />
    </BrowserRouter>
  );
}
