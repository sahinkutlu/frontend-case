import '@/styles/App.scss'
import Multiselect from './components/Multiselect'
import { data } from './assets/items.json'

function App() {
  const choices = data.map((item, index) => ({ id: index, label: item }))
  return (
    <div className="container">
      <div className="category-container">
        <Multiselect choices={choices} />
      </div>
    </div>
  )
}

export default App
