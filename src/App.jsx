import { useState } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import DisplayPerson from './components/DisplayPerson'
import DisplayPlanet from './components/DisplayPlanet'
import DisplayStarships from './components/DisplayStarships'
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
} from "react-router-dom";

const Home = (props) => {
  return (
    <>
      No results.
    </>
  )
}

const EmptyResults = (props) => {
  return (
    <>
      <img src="https://wealthofgeeks.com/wp-content/uploads/2023/05/Untitled-design-18-2.png" alt="Obi-Wan Kenobi" width='250' />
      <p>These aren't the droids you're looking for.</p>
    </>
  )
}

function App() {

  return (
    <>
      <BrowserRouter>
        <SearchForm />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/empty"} element={<EmptyResults />} />
          <Route path={"/people/:idParam"} element={<DisplayPerson />} />
          <Route path={"/planets/:idParam"} element={<DisplayPlanet />} />
          <Route path={"/starships/:idParam"} element={<DisplayStarships />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
