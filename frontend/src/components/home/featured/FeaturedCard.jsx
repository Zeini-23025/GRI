import React from "react"
import { featured } from "../../data/Data"

const FeaturedCard = () => {
  return (
    <>
      <div className='contenu grid5 mtop '>
        {featured.map((items, index) => (
          <div className='boxi' key={index}>
            <img src={items.cover} alt='' />
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedCard
