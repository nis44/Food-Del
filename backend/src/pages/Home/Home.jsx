import { useState } from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Header from '../../components/Header/Header'
import './Home.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Appdownload from '../../components/AppDownload/Appdownload'
function Home() {
  const [category,setcategory] = useState("All")
  return (
    <div>
        <Header/>
        <ExploreMenu category = {category} setcategory = {setcategory}/>
        <FoodDisplay category = {category}/>
        <Appdownload/>
    </div>
  )
}

export default Home