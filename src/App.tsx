import { useEffect, useState } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import data from './assets/items.json'

function App() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const onSearchChange = (value: string) => {
    setCategories(data.data.filter(item => item.toLowerCase().includes(value)))
  }

  const onCategoryToggle = (value: string) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(prevState => prevState.filter(item => item !== value))
    }
    else {
      setSelectedCategories(prevState => [...prevState, value])
    }
  }

  useEffect(() => {
    setCategories(data.data)
  }, [])

  return (
    <div className="App">
      <div className="multi-select-wrapper">
        <div className="selected-categories-wrapper">
          {
            selectedCategories.map(item => (
              <div data-testid="selected-category-item" key={item} onClick={() => onCategoryToggle(item)} className="selected-category-item">
                {item}
              </div>
            ))
          }
        </div>
        <h1 className="title">
          Kategoriler
        </h1>
        <SearchBox onChange={onSearchChange} />
        <div className="category-wrapper">
          {
            categories.length > 0 ?
              categories.map(item => (
                <div data-testid="category-item" onClick={() => onCategoryToggle(item)} key={item} className="category-item">
                  <div className={`${selectedCategories.includes(item) ? 'active' : ''} select-box`}>
                    <div />
                  </div>
                  <span className={`${selectedCategories.includes(item) ? 'selected-text' : ''} category-text`}>{item}</span>
                </div>
              )) : <div>Veri bulunamadı</div>
          }
        </div>
        <button className="search-button">Ara</button>
      </div>
    </div>
  );
}

export default App;
