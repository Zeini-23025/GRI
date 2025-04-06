import React from "react"
import img from "../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/featured.css"
import FeaturedCard from "../home/featured/FeaturedCard"

const Services = () => {
  return (
    <>
      <section className='services mb'>
        <Back name='Catégories' title='Catégories - Tous les catégories' cover={img} />
        <div className='featured'>
          <div className="intro-text">
            <h2 className="text-center">Découvrez Nos Catégories</h2>
            <p className="text-center">Explorez notre sélection de biens immobiliers pour trouver celui qui correspond à vos besoins</p>
          </div>
          <FeaturedCard />

        </div>
      </section>
    </>
  )
}

export default Services
