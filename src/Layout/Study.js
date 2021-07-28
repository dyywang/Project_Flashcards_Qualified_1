import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { listCards, readDeck } from "../utils/api"
import Breadcrumbs from "./Breadcrumbs"


function Study() {
  const { deckId } = useParams()
  const history = useHistory()
  const [cards, setCards] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flip, setFlip] = useState(true) //true for front, false for back
  const [myDeck, setMyDeck] = useState({})

  useEffect(() => {
    (async function () {
      const d = await readDeck(deckId)
      const c = d.cards
      setMyDeck(d)
      setCards(c)
    })()
  }, [])
  
  if (cards.length < 3)
    return <div>
            <Breadcrumbs crumbs={[{link:`/decks/${deckId}`, label:myDeck.name}, {link:null, label:"Study"}] }/>
            <h4>Not enough cards</h4>
            <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">+Add Cards</Link>
          </div>

  return (
    <div>
      <Breadcrumbs crumbs={[{link:`/decks/${deckId}`, label:myDeck.name}, {link:null, label:"Study"}] }/>
      <h2>Study: {myDeck.name}</h2>
      <div className="card p-3">
        <div className="card-title">
          <h6>{cards.length > 0 ? `Card ${currentCardIndex + 1} of ${cards.length}` : ""}</h6>
          {cards.length > 0 && flip && cards[currentCardIndex].front}
          {cards.length > 0 && !flip && cards[currentCardIndex].back}
        </div>
        <div className="row">
          {/* Flip Button */}
          <button className="btn btn-secondary mx-3" onClick={() => { return setFlip(!flip) }}>Flip</button>
          {/* Next Button */
            !flip && currentCardIndex !== cards.length - 1 &&
            <button className="btn btn-secondary" onClick={() => {
              setFlip(!flip)
              setCurrentCardIndex(currentCardIndex + 1)
            }}>Next</button>
          }

          {/* End Button */
            !flip && currentCardIndex == cards.length - 1 &&
            <button className="btn btn-secondary" onClick={() => {
              window.confirm("Restart?") ? setCurrentCardIndex(0) : history.push("/")
            }
            }>End</button>
          }
        </div>
      </div>
    </div>
  )

}

export default Study