import Multiselect from '@/components/Multiselect'
import { useGetCategories } from '@/api/category'

const Home = () => {
  const { data: choices = [], isLoading, error } = useGetCategories()
  return (
    <div className="container">
      <div className="category-container">
        <span>Kategoriler</span>
        <Multiselect
          choices={choices.map((item, i) => ({ id: i, label: item }))}
          loading={isLoading}
          error={error}
          searchButtonText="Ara"
          inputProps={{ placeholder: 'kategori ara...' }}
        />
      </div>
    </div>
  )
}

export default Home
