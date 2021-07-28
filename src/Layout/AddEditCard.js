import React , {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import { readCard , readDeck, updateCard, createCard, listCards} from "../utils/api"
import Breadcrumbs from "./Breadcrumbs"

function AddEditCard({changer, edit=true}) {
  const {deckId, cardId} = useParams() 
  const [card, setCard] = useState({})
  const [cards, setCards] = useState([])
  const [deck, setDeck] = useState({})
  const [cardNum, setCardNum] = useState(0)
  const {change, setChange} = changer

  const history = useHistory()
  const handleChange = (event) => setCard({...card, [event.target.name]:event.target.value})

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (cardId) {
      await updateCard(card) }
    else { await createCard(deckId, card) }
    setChange(!change) 
    history.push(`/decks/${deckId}`)
  }

  useEffect( ()=>{
    (async ()=>{ 
      const d = await readDeck(deckId)
      const myCards = d.cards
      const c = cardId ? await readCard(cardId) : {front:"Front side of card", back:"Back side of card"}
      setDeck(d)
      setCards(myCards)
      setCard(c)
      cardId ? setCardNum( myCards.findIndex((card)=>{return card.id == cardId}) +1 ) : setCardNum(myCards.length + 1)
    } )()  
  }, [])

  const action = edit ? "Edit Card"  : "Add Card"
  const crumbs = [{link:`/decks/${deckId}`, label:deck.name}, {link:"dummy", label:action+" "+cardNum}]

  return (
    <div>

    <Breadcrumbs crumbs={crumbs}/>

    <h4>{action}</h4>
    <form className="m-2 p-2" onSubmit={handleSubmit}>
      <label htmlFor="front" className="row">Front:</label>
      <textarea className="row w-100" name="front" id="front" onChange={handleChange} value={card.front}></textarea>
      
      <label htmlFor="back" className="row pt-4">Back:</label>
      <textarea className="row w-100" name="back" id="back" onChange={handleChange} value={card.back}></textarea>
      <div className="row mt-4">
        <button className="btn btn-secondary mr-2" onClick={()=>history.push(`/decks/${deckId}`)}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
  )

  
}

export default AddEditCard