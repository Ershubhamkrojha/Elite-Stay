import React from 'react'
import useFetch from '../hooks/useFetch'
import Img1 from '../featuredProperties/fpimg/1.jpg'
import Img2 from '../featuredProperties/fpimg/2.jpg'
import Img3 from '../featuredProperties/fpimg/3.jpg'
import Img4 from '../featuredProperties/fpimg/4.jpg'
import Img5 from '../featuredProperties/fpimg/5.jpg'
import Img6 from '../featuredProperties/fpimg/6.jpg'
import Img7 from '../featuredProperties/fpimg/7.jpg'
import Img8 from '../featuredProperties/fpimg/8.jpg'
import Img9 from '../featuredProperties/fpimg/9.jpg'
import Img10 from '../featuredProperties/fpimg/10.jpg'
import Img11 from '../featuredProperties/fpimg/11.jpg'

import featuredProperties from './featuredProperties.css'

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch(
        "/hotels?fetured=true&limit=3"
    )
  
    return (
        <div className="fp">
        {loading ? "Loading..." : (
            <>
                {data.map((item) => (
                    <div className="fpItem" key={item._id}>
                        <img src={item.photos[0]} alt="" className="fpImg" />
                        <span className="fpName">Shubham hotel{item.name}</span>
                        <span className="fpCity">{item.city}</span>
                        <span className="fpPrice">Starting from ${item.cheapestPrices} </span>
                        {item.rating && (
                            <div className="fpRating">
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </div>
                        )}
                    </div>
                ))}
            </>
        )}
    </div>
    )
}

export default FeaturedProperties
