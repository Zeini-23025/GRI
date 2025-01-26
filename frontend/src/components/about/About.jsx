import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='À propos de nous' title='À propos de nous - Qui sommes-nous?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='L`histoire de notre agence' subtitle='Découvrez l`histoire de notre entreprise et notre processus de travail' />

            <p>Découvrez l’histoire d’Ijari et comment nous facilitons la gestion des biens immobiliers.

Ijari est une application innovante conçue pour simplifier la gestion des biens immobiliers. Notre objectif est de permettre à nos utilisateurs de suivre facilement les revenus générés par leurs propriétés, comme les loyers et les charges, tout en offrant un outil pratique pour gérer les paiements et générer des rapports financiers. Nous avons développé cette plateforme pour vous aider à optimiser la gestion de votre patrimoine immobilier, en vous apportant une solution rapide, efficace et sécurisée.

Que vous soyez propriétaire d’un seul bien ou d’un portefeuille immobilier, Ijari vous offre tout ce dont vous avez besoin pour mieux gérer vos investissements et garantir la rentabilité de vos biens.</p>
            
          </div>
          {/* <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div> */}
        </div>
      </section>
    </>
  )
}

export default About
