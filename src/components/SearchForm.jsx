import { useState } from "react";
import App from "../App";
import { useNavigate } from 'react-router-dom';

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