import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DisplayStarships = (props) => {
    const { idParam } = useParams();
    const [resourceData, setResourceData] = useState({})
    const navigate = useNavigate()

    useEffect(() => { // what does useEffect do? it causes this code to be executed after component is rendered and then every time the component updates
        axios.get(`https://swapi.dev/api/starships/${idParam}`)
            .then(response => {
                setResourceData(response.data) // Axios 'response.data' is an object with key-value pairs
            })
            .catch(error => {
                console.log(".catch error getting Starships: " + error)
                navigate('/empty')
            })
    }, [idParam]);
    // no clean up statement is required since we are not using resources
    //    that will continue to run (?) what does this mean?

    return (
        <>
            <h2>{resourceData.name}, ID: {idParam}</h2>
            <ul style={{ listStyleType: 'none' }}>
                <li><span style={{ color: `blue` }}>Model: </span>{resourceData.model} cm</li>
                <li><span style={{ color: `blue` }}>Crew: </span>{resourceData.crew} kg</li>
                <li><span style={{ color: `blue` }}>Passengers: </span>{resourceData.passengers}</li>
                <li><span style={{ color: `blue` }}>Hyperdrive Rating: </span>{resourceData.hyperdrive_rating}</li>
            </ul>
        </>
    )

}

export default DisplayStarships