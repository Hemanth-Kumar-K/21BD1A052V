import React from 'react'
import { Route ,Routes,BrowserRouter} from 'react-router-dom'
import AllProductsPage from "./components/AllProductsPage/index"
import SpecificProductPage from "./components/SpecificProductPage/index"
import HomePage from "./components/HomePage/index"
import Navbar from "./components/Navbar/index"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/products' element={<AllProductsPage/>}/>
        <Route exact path='/product/:id' element={<SpecificProductPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
