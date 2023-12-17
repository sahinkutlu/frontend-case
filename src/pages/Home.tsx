import Multiselect from '@/components/Multiselect'
import { getCategories } from '@/api/category'

const Home = () => {
  const { data: choices = [], isLoading, error } = getCategories()
  return (
    <div className="container">
      <div className="category-container">
        <span>Kategoriler</span>
        <Multiselect
          choices={choices.map((item, i) => ({ id: i, label: item }))}
          loading={isLoading}
          error={error}
          searchButtonText="Ara"
        />
      </div>
    </div>
  )
}

export default Home
