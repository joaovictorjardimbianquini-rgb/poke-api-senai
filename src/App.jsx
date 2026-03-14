import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Pesquisa from "./components/Pesquisa";

import Home from "./Templates/Home";
import Header from "./components/Header";
import Cadastro from "./templates/Cadastro";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header subtitle="Explore todos os Pokemon">
        <Pesquisa
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
      </Header>
      <Routes>
        <Route path="/" element={<Home searchQuery={search} />} />

      <Routes>
        <Route path="/" element={<Cadastro/>} />
        <Route path="/Home" element={<Home search={search} setSearch={setSearch} />} />
        {/* Deixei a rota limpa para depois facilitar a integração */}
      </Routes>
    </BrowserRouter>
  );
}
