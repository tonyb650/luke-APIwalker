import { useState } from "react";
import App from "../App";
import { useNavigate } from 'react-router-dom';

// In SearchForm, we set up a user form to receive two search criteria for eventual use in our API call:
// We put both of these in state with 2-way binding: searchResource and searchID
// They are always ready to use as soon as the user triggers 'onSubmit' which executes the 'handleSearch' function
// 'handleSearch' is very simple and just navigates to a new route, triggering rerendering of <Routes> in App.jsx
// The API requests are handled within those various components

const SearchForm = (props) => {
    const [searchResource, setSearchResource] = useState("people");
    const [searchID, setSearchID] = useState(1);
    const navigate = useNavigate(); // Any component with useNavigate must be within the <BrowserRouter> tags in App.jsx

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/${searchResource}/${searchID}`)
    }

    return (
        <form onSubmit={handleSearch}>
            <label htmlFor="resource">Search for: </label>
            <select name="resource" id="resource" form="" onChange={(e) => { setSearchResource(e.target.value) }} value={searchResource}>
                <option value="people">People</option>
                <option value="planets">Planets</option>
                <option value="starships">Starships</option>
            </select>
            <label htmlFor="searchID">ID:</label>
            <input type="number" name="" id="searchID" onChange={(e) => { setSearchID(e.target.value)}} value={searchID} />
            <button>Search</button>
        </form>
    )
}

export default SearchForm