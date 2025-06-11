import {React,useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

const Fetch = () => {
    const[joke,setJoke] = useState(null);
    const[loading,setLoading] = useState(false);
    const fetchJoke = async() => {
        setLoading(true)
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke')
            const data = await response.json();
            setJoke(data)
        } catch (error) {
            setJoke({setup:"Error Fetching Joke", punchline: ""})
        }
        setLoading(false)
    } 
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light" >
      <h1 className="mb-4" > Random Jokeness! </h1>
      <button onClick={fetchJoke}  className="btn btn-primary mb-4" >{ loading ? "loading...":"Generate Joke"}</button>
      {joke && (<div className="card text-center shadow p-4" >
        <h5>{joke.setup}</h5>
        <p>{joke.punchline}</p>
      </div>)}
    </div>
  )
}

export default Fetch
