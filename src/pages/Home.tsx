import Multiselect from '@/components/Multiselect'
import { getProducts } from '@/api/product'

const Home = () => {
  const { data: choices = [], isLoading, error } = getProducts()
  return (
    <div className="container">
      <div className="category-container">
        <Multiselect
          choices={choices.map((item, i) => ({ id: i, label: item }))}
          loading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}

export default Home
