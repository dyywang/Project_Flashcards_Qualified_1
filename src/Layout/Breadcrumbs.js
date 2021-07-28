import React from "react"
import {Link, useRouteMatch} from "react-router-dom"

function Breadcrumbs({crumbs}) {
  const {path} = useRouteMatch()
  let crumbsArray = [<li key="home" className="breadcrumb-item"> <Link to="/">Home</Link></li>]
  
  crumbs.forEach( (crumb, index) => {
    crumbsArray.push(<li key={index} className="breadcrumb-item"> {crumb.link ? <Link to={crumb.link}>{crumb.label}</Link> : crumb.label }</li>)
  } )


 
  //crumbsArray.push(<li className="breadcrumb-item active" aria-current="page">{crumbs[crumbs.length - 1].label}</li>)
  
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {crumbsArray}
      </ol>
    </nav>
  )

}

export default Breadcrumbs