import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Pesquisa from "./components/Pesquisa"

import Home from "./Templates/Home";
import TeamBuilder from "./Templates/TeamBuilder"
import Header from "./components/Header";

export default function App() {
  return (

    <BrowserRouter>
       <Header subtitle="Explore todos os Pokemon">
        <Pesquisa/>
       </Header>
    <Routes>
      <Route path= "/" element= {<Home />} />
      <Route path= "/TeamBuilder" element= {<TeamBuilder />} />
    </Routes>
    </BrowserRouter>
  );
}