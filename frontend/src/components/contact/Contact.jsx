import React from "react"
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import "./contact.css"

const Contact = () => {
  return (
    <>
      <section className='contact mb'>
        <Back name='Contactez nouz' title='Obtenez de l`aide et un soutien amical' cover={img} />
        <div className='container'>
          <form className='shadow'>
            <h4>Remplissez cette formulaire</h4> <br />
            <div>
              <input type='text' placeholder='Nom' />
              <input type='text' placeholder='Gmail' />
            </div>
            <input type='text' placeholder='Sujet' />
            <textarea cols='30' rows='10'></textarea>
            <button className="btn6">Envoyer</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
