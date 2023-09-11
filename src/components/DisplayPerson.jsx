import {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DisplayPerson = (props) => {
  //const navigate = useNavigate();     // this is the only place we can put 'useNavigate'?
  const { idParam } = useParams();
  const [resourceData, setResourceData] = useState({})
  const [homeworldData, setHomeworldData] = useState({})
  const [homeworldID, setHomeworldID] = useState("")
  const navigate = useNavigate()

  const getHomeworld = (homeworldURL) => {
    axios.get(homeworldURL)
    .then(response => {
      setHomeworldData(response.data) // Axios 'response.data' is an object with key-value pairs
      setHomeworldID(response.data.url.split("/")[response.data.url.split("/").length-2])
    })
    .catch(error => {
      console.log(".catch error getting homeworld: "+ error)
    })
  }

  useEffect(() => { // what does useEffect do? it causes this code to be executed after component is rendered and then every time the component updates
    axios.get(`https://swapi.dev/api/people/${idParam}`)
    .then(response => {
      getHomeworld(response.data.homeworld)
      setResourceData(response.data) // Axios 'response.data' is an object with key-value pairs

    })
    .catch(error => {
      console.log(".catch error getting person: "+ error)
      navigate('/empty')
    })
  },[idParam]);
  // no clean up statement is required since we are not using resources
  //    that will continue to run (?) what does this mean?

    
  return (
      <>
          <h2>{resourceData.name}, ID: {idParam}</h2>
          <ul style={{ listStyleType: 'none'}}>
              <li><span style={{ color: `blue` }}>Height: </span>{resourceData.height} cm</li>
              <li><span style={{ color: `blue` }}>Weight: </span>{resourceData.mass} kg</li>
              <li><span style={{ color: `blue` }}>Eye Color: </span>{resourceData.eye_color}</li>
              <li><span style={{ color: `blue` }}>Skin Color: </span>{resourceData.skin_color}</li>
              <li><span style={{ color: `blue` }}>Homeworld: </span><Link to={`/planets/${homeworldID}`}>{homeworldData.name}</Link></li>
          </ul>
      </>
  )
}

export default DisplayPerson