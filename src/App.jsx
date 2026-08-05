import './App.css'
import ProductCard from './components/productCard'
import { FaHome } from "react-icons/fa";

function App() {
  


  return(
    <div>
      <ProductCard name="Apple iPhone 5s" price="$100" image="https://picsum.photos/id/3/200/300"/>
      <ProductCard name="Apple Laptop" price="$1000" image="https://picsum.photos/id/0/200/300"/>
      <ProductCard name="Women's Shoes" price="$50" image="https://picsum.photos/id/21/200/300"/>
      <FaHome className='text-[100px]'/>
    </div>
  )
}

export default App
