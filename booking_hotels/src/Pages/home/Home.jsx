import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import home from './home.css'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/property/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div className='HomeDiv'>
      <Navbar />
      <Header/>
      
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type! </h1>
       <PropertyList/>
       <h1 className="homeTitle">Home guests love </h1>
       <FeaturedProperties/>
       <iframe width="853" height="480" src="https://www.youtube.com/embed/unEUQvBDOFw" title="jüSTa Cliffend Resort &amp; Spa, Mashobra | Luxury Resort in Mashobra with swimming pool" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       <MailList/>
       
       <Footer/>
      </div>

    </div>
  )
}

export default Home
