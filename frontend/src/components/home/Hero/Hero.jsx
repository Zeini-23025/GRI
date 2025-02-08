import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Explorez les meilleures options immobilières pour vous' subtitle='Explorez une vaste sélection de biens à louer, soigneusement choisis pour correspondre à vos préférences, vos besoins et votre budget. Que vous recherchiez un logement confortable ou un espace professionnel idéal, 3a9ari vous aide à trouver l`endroit parfait où que vous soyez.' />

          {/* <form className='flex'>
            <div className='box'>
              <span>City/Street</span>
              <input type='text' placeholder='Location' />
            </div>
            <div className='box'>
              <span>Property Type</span>
              <input type='text' placeholder='Property Type' />
            </div>
            <div className='box'>
              <span>Price Range</span>
              <input type='text' placeholder='Price Range' />
            </div>
            <div className='box'>
              <h4>Advance Filter</h4>
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form> */}
        </div>
      </section>
    </>
  )
}

export default Hero
