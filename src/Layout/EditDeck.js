import React, {useState, useEffect} from "react"
import {useParams, useHistory, Link} from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api"
import Breadcrumbs from "./Breadcrumbs"

function EditDeck({changer}){
  const [deck, setDeck] = useState({})
  const {deckId} = useParams()
  const history = useHistory()
  const {change, setChange} = changer
  const handleChange = (event) => setDeck({...deck, [event.target.name]:event.target.value})
  const handleSubmit = async (event) =>{
    event.preventDefault()
    await updateDeck(deck)
    setChange(!change)
    history.push(`/decks/${deckId}`)
  }
  
  useEffect( ()=>{
    (async ()=>{
      readDeck(deckId)
      .then(setDeck)
    })()
  }, [])

  return (
    
    <div>
     <Breadcrumbs crumbs={[{link:`/decks/${deckId}`, label:deck.name}, {link:null, label:"Edit Deck"}] } />
      <h4>Edit Deck: {deck.name}</h4>
      <form className="m-2 p-2" onSubmit={handleSubmit}>
        {/*Name*/}
        <label className="row" htmlFor="name">Name</label>
        <input className="row w-100" name="name" id="name" type="text" value={deck.name}
          onChange={handleChange}></input>
        {/*Description*/}
        <label className="row pt-4" htmlFor="description">Description</label>
        <textarea className="row w-100" name="description" id="description" rows="8" value={deck.description}
          onChange={handleChange}></textarea>
        {/*Buttons*/}
        <div className="row mt-4">
          <Link className="btn btn-secondary mr-2" to="/" >Cancel</Link>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EditDeck