import {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

// DisplayPerson is the component called by route '/people/:id'. 'id' comes through props as 'idParam' (this is id number of the SW resource we are searching for).
// We set up 3 state variables: resourceData which holds the data from the 'people' search, homeworldData which holds the data from the person's homeworld, and
//     homeworldID which holds the id number (as a string) of the person's homeworld on the API.
// We also set up useNavigate so that we can route to the EmptySearch component if we get an error on the API request
// useEffect allows us to make our API requests when the page is first rendered PLUS every time the 'idParam' value is changed. Notice the 2nd argument
// at the very end of the useEffect code block.
// I made 'getHomeworld' into a separate function to make the code a bit more readable.  'getHomeworld' sets the homeworldData value (needed for the name)
// and sets the 'homeworldID' value (needed for the link to that component if the user wants to go there. eg: "/planets/4")

const DisplayPerson = (props) => {
  const { idParam } = useParams();
  const [resourceData, setResourceData] = useState({})
  const [homeworldData, setHomeworldData] = useState({})
  const [homeworldID, setHomeworldID] = useState("")
  const navigate = useNavigate()

  const getHomeworld = (homeworldURL) => {
    axios.get(homeworldURL)
    .then(response => {
      setHomeworldData(response.data) // Axios 'response.data' is an object with key-value pairs
      setHomeworldID(response.data.url.split("/")[response.data.url.split("/").length-2]) // this bit of parsing gets the planet ID of the person's homeworld (as a string)
    })
    .catch(error => {
      console.log(".catch error getting homeworld: "+ error) // I guess in case that particular homeworld is not in the API database
    })
  }

  useEffect(() => { // useEffect causes this code to be executed *after* component is rendered and then every time 'idParam' changes
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