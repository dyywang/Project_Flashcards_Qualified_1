import React, { useEffect , useState} from "react";
import "../data/db.json"
import {Link} from "react-router-dom"
import { deleteDeck, listDecks, listCards} from "../utils/api";

function DeckList() {
  
  const [decks, setDecks] = useState([])
  useEffect( ()=>{
    (async () => {
      const d = await listDecks()
      setDecks(d)
    } ) ()
  }, [])

  function DeckSummary({deck}) { 

    return (
    <div className="card">
    <div className="card-body">
      <div className="row">
      <h5 className="col card-title">{deck.name}</h5>
      <p className="col text-right">{deck.cards.length} cards</p>
      </div>

      <p className="card-text">{deck.description}</p>
      <Link to={`/decks/${deck.id}`}className="btn btn-secondary">View</Link>
      <Link to={`/decks/${deck.id}/study`}className="btn btn-info mx-2">Study</Link>
      <button className="btn btn-danger" 
        onClick={async () => {
          await deleteDeck(deck.id)
          const d = await listDecks()
          setDecks(d)
        }}>Delete</button>
    </div>
  </div> 
    )}
    
  return (
  <div>
    {decks.map((deck)=>(<DeckSummary key={deck.id} deck={deck} /> ))}
  </div>
  )
}

export default DeckList



