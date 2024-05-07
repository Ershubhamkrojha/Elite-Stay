import React from 'react'
import img3 from '../featured/feturedphotos/3.jpg'
import img2 from '../featured/feturedphotos/2.jpg'
import img6 from '../featured/feturedphotos/6.jpg'
import img5 from '../featured/feturedphotos/5.jpg'
import img4 from '../featured/feturedphotos/4.jpg'
import useFetch from '../hooks/useFetch'
// import img7 from '../featured/feturedphotos/7.jpg'
import featured from './featured.css'

const Featured = () => {
  const { data, loading, error } = useFetch("/hotels/countBYCity?cities=Bangalore,Gurgaon,Bhuj kutch")


  return (
    <div>
      <div className="fetaured">
        { loading ?"Loading Plese Wait":<>
          <div className="featuredItem">
            <img src={img3} alt="" className="featuredImg" />
            <div className="featureTitle">
              <h1>Bangalore</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img src={img4} alt="" className="featuredImg" />
            <div className="featureTitle">
              <h1>Gurgaon</h1>
              <h2> {data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={img5} alt="" className="featuredImg" />
            <div className="featureTitle">
              <h1>Bhuj kutch</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
        }
      </div>

    </div>
  )
}

export default Featured
