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

// Here on the App.jsx file, we have 2 simple components and the main App 'root' function
// the two simple components are 'Home' ("/" route) that renders when the page is first loaded
// and 'EmptyResults' which renders when a search comes up empty (an API get error)

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

// in this main App function, we wrap everything in <BrowserRouter>.
// I found out that having the <SearchForm> component outside of the <BrowserRouter>
// won't work because useNavigate becomes inaccessible to the <SearchForm> component.
// So we have <SearchFrom> and the various routes for categories of searches (people/planets/starships)
// as well as the Home and EmptyResults edge cases within <Routes>

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
