import React, {Fragment, useState} from "react"
import Breadcrumbs from "./Breadcrumbs"
import {Link, useHistory} from "react-router-dom"
import {createDeck, listDecks} from "../utils/api/index"

function NewDeck({setDecks}){
  const blankData = {name:"", description:""}
  const [formData, setFormData] = useState({blankData})
  const handleChange = (event) =>setFormData({...formData, [event.target.name]:event.target.value})
  const history = useHistory()
  const handleSubmit = async (event) => {
    event.preventDefault()
    await createDeck(formData)
    const d = await listDecks()
    setDecks(d)
    setFormData({blankData})
    history.push("/")
  }

  return (
    <Fragment>
      <Breadcrumbs crumbs={[{link:null, label:"Create Deck"}] }/>
       
      <form className="m-2 p-2" onSubmit={handleSubmit}>
        {/*Name*/}
        <label className="row" htmlFor="name">Name</label>
        <input className="row w-100" name="name" id="name" type="text" 
          onChange={handleChange}></input>
        {/*Description*/}
        <label className="row pt-4" htmlFor="description">Description</label>
        <textarea className="row w-100" name="description" id="description" rows="8" 
          onChange={handleChange}></textarea>
        {/*Buttons*/}
        <div className="row mt-4">
          <Link className="btn btn-secondary mr-2" to="/" >Cancel</Link>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </Fragment>

  )

}

export default NewDeck