import React, { useState } from 'react'
import Img1 from '../property/propertyImg/1.jpg'
import Img2 from '../property/propertyImg/2.jpg'
import Img3 from '../property/propertyImg/3.jpg'
import Img4 from '../property/propertyImg/4.jpg'
import Img5 from '../property/propertyImg/5.jpg'
import Img6 from '../property/propertyImg/6.jpg'
import Img7 from '../property/propertyImg/7.jpg'
import Img8 from '../property/propertyImg/8.jpg'
import Img9 from '../property/propertyImg/9.jpg'
import Img10 from '../property/propertyImg/10.jpg'
import Img11 from "../property/propertyImg/Cabin.jpg"
import Img12 from "../property/propertyImg/Resort.jpg"
import property from './propertyList.css'
import useFetch from '../hooks/useFetch'

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countBYType");

  const images = [
    Img4, Img2, Img12, Img10, Img11
  ];

  
  return (
    <div className="pList">

      {loading ? ("loading") : (
        <>{images &&
          data.map((item, i) => (
            <div className="pListItem">
              <img src={images[i]} alt="" className="pListImg" />
              <div className="pListTitle">
                {/* <h1>{i}</h1> */}
                <h1>{item?.type}</h1>
                <h2>{item?.count} {item?.type}</h2> 
              </div>
            </div>
          ))}

        </>)}
    </div>
  )
}

export default PropertyList
