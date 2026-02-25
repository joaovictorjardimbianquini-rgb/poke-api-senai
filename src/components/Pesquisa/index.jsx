import "./styles/pesquisa.modules.css"

export default function Pesquisa({ value, onChange, onClear }) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Buscar por nome ou número..."
          value={value}
          onChange={onChange}
          className="search-input"
        />
        {value && (
          <button 
            className="clear-button" 
            onClick={onClear}
            type="button"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
