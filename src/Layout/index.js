import React, { useEffect, useState} from "react";
import {Link, Switch, Route} from "react-router-dom"
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import Deck from "./Deck"
import NewDeck from "./NewDeck"

import {listDecks} from "../utils/api/index"
import "../data/db.json"

function Layout() {
  
  const [decks, setDecks] = useState([])

  //Load Data
  useEffect(()=>{
    ( async ()=>{listDecks().then(setDecks)
    })()
  }, [])

  return (
    <div>
      <Header />
      <div className="container">
        
        {/* Root */}
        
        <Switch>
          {/* Deck List - Home */}
          <Route exact path="/">
            {/* Button (New Deck) */}
            <Link to="/decks/new" className="btn btn-primary mb-3">+ Create Deck</Link>
            <DeckList decks={decks} setDecks={setDecks}/>
          </Route>
          {/* New Deck - Form*/}
          <Route path="/decks/new">
            <NewDeck setDecks={setDecks}/>
          </Route>
          <Route path="/decks/:deckId">
            <Deck/>
          </Route>
          {/* 404 */}
          <Route>
            <NotFound />       
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
