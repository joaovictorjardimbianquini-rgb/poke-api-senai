import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Pesquisa from "./components/Pesquisa";

import Home from "./Templates/Home";
import Header from "./components/Header";

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
        {/* Deixei a rota limpa para depois facilitar a integração */}
      </Routes>
    </BrowserRouter>
  );
}
