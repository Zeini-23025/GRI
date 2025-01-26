import React from "react"
import img from "../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import FeaturedCard from "../home/featured/FeaturedCard"

const Services = () => {
  return (
    <>
      <section className='services mb'>
        <Back name='Catégories' title='Catégories -Tous les catégories' cover={img} />
        <div className='featured '>
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Services
