import React from "react"
import Heading from "../../common/Heading"
import "./featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <Heading title='Types de propriétés en vedette' subtitle='Trouvez tous les types de biens.' />
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured
