import MultiSelectDropdown from "./components/multiselect.tsx";
function App() {
  const options = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Adcreative.ai Case</h1>
          <MultiSelectDropdown options={options} />
        </div>
      </header>
    </div>
  );
}

export default App;
