import React, { useEffect, useState } from "react";
import {useParams, Link, useRouteMatch, Route, Switch, useHistory} from "react-router-dom"
import Breadcrumbs from "./Breadcrumbs"

import AddEditCard from "./AddEditCard"
import EditDeck from "./EditDeck"
import Study from "./Study"
import { deleteCard, deleteDeck, readDeck } from "../utils/api";

function Deck () {
    
  const {deckId} = useParams()
  const {path} = useRouteMatch()

  const [deck, setDeck] = useState({cards:[]})
  const [change, setChange] = useState(false)
  const history = useHistory()
  const changer={change:change, setChange:setChange}


  useEffect( ()=>{
    const abortController = new AbortController();
    (async ()=>{
      let d = {cards:[]}
      try{
        d = await readDeck(deckId, abortController.signal)
      }
      catch(error) {
        if (error != "AbortError") throw error
      }
      setDeck(d)
    })()
    return () => abortController.abort
  }, [change]) 
  
  const myCards = deck.cards
   .map((card)=>{
      return (
        <div key={card.id} className="card my-2 p-3">
          <div className="row">
            <div className="col">{card.front}</div>
            <div className="col">{card.back}</div>
          </div>
          <div className="row justify-content-end pt-3 pr-3">
            {/* Edit Button - Card */}
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-primary">Edit</Link>
            {/* Delete Button - Card */}
            <button className="btn btn-danger ml-2" onClick={ ()=>{
              deleteCard(card.id)
              setChange(!change)
            }  }>Delete</button>
          </div>
        </div>)
    })
  
  function DeckSummary () {
    return (
    <div>
     <Breadcrumbs crumbs={[{link:"dummy", label:deck.name}] } />
      {/*Deck Summary*/}
      <h4>{deck.name} </h4>
      <p>{deck.description}</p>
      {/*Buttons*/}      
      <div className="row justify-content-between">
        <div className="col">
          {/* TODO: Edit Button - Deck */}
          <Link to={`/decks/${deck.id}/edit`} className="btn btn-primary">Edit</Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-2">Study</Link>
          <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-secondary">Add Card</Link>
        </div>
        <div className="col text-right">
          {/* Delete Button - Deck */}
          <button to="/" className="btn btn-danger" onClick={()=>{
              deleteDeck(deckId)
              setChange(!change)
              history.push("/")
            }}>Delete</button>
        </div>
      </div>
      {/* Cards in the Deck: */}
      <div>
        {myCards}
      </div>
    </div>
    )
  }

  return (
  <div>
        <Switch>
          <Route exact path={path}>
            <DeckSummary/>
          </Route>
          {/* Deck - Study */}
          <Route exact path={`${path}/study`}>
            <Study />
          </Route>
          {/* Deck - Edit */}
          <Route exact path={`${path}/edit`}>
            <EditDeck changer={changer}/>
          </Route>
          {/* Deck - Edit Card */}
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <AddEditCard changer={changer} edit={true}/>
          </Route>  
          {/* Deck - Add Card */}
          <Route exact path="/decks/:deckId/cards/new">
            <AddEditCard changer={changer} edit={false}/>
          </Route>  
        </Switch>

  </div>
  )
}

export default Deck