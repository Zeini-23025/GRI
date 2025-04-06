import React from "react"
import Heading from "../../common/Heading"
import "./Recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Propriétés récemment répertoriées' subtitle='Découvrez nos dernières propriétés mises en ligne, sélectionnées avec soin pour répondre à vos besoins. Que vous soyez à la recherche d`un appartement moderne, d`une maison spacieuse ou d`un bien commercial, nous mettons à votre disposition les meilleures options disponibles sur le marché.

Restez informé des nouvelles opportunités en temps réel et trouvez facilement le bien immobilier qui vous correspond.' />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent
