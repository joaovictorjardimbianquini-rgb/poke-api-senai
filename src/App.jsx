//import "./SearchBar.css";
import { useState } from "react";
import { SearchBar } from "./assets/Components/pesquisa";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}

export default App;