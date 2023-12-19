
function Search() {
  return (
    <div className="search-container">
      <div>
        <span>Kategoriler</span>
      </div>
      <div>
        <input type="text" placeholder="kategori ara..." />
        <img className="search-icon" src="search.svg" alt="Arama" />
      </div>
    </div>
  );
}

export default Search;

