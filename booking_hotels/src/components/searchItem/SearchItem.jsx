import React from "react";
import { Link } from 'react-router-dom'
// import Img2 from '../../components/searchItem/serchimg/2.jpg'
import searchItem from './searchItem.css'
// import SearchHotels from '../searchItem/SearchHotels'

const SearchItem = ({ item }) => {
  return (
    <>
      <div className='searchItem'>
        <img src={item.photos[0]}
          alt=""
          className='siImg' />
        <div className="siDesc">
          <h1 className="siTitle">{item.name}</h1>
          <sspan className="siDistance">{item.distance}</sspan>
          <span className="siTaxi0p">Free airport taxi</span>
          <span className="siSubtitle">Studio Apartment with Air Condition</span>
          <span className="isFeatures">{item.desc}</span>
          <span className="siCancel0p">Free Cancellation</span>
          <span className="siCancel0pSubtitle">
            You can cancel later,so llock in this great price today!.
          </span>
        </div>
        <div className="siDetails">
          {item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>}
          <div className="siDetailTexts">
            <span className="siPrice">₹
              {item.cheapestPrices}</span>
            <span className="siTax0p">Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
              <button className='siCheckButton'>See availability</button></Link>

          </div>

        </div>
      </div>
    </>
  )
}

export default SearchItem
