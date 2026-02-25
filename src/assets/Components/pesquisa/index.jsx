import "./index.css";
export function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar por nome ou número..."
        value={value}
        onChange={onChange}
        className="search-input"
      />
    </div>
  );
}