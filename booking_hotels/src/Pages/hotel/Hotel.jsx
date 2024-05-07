import React, { useContext, useState } from 'react'

import hotel from './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow"
import { BsArrowRightShort } from "@react-icons/all-files/bs/BsArrowRightShort"
import { BsArrowLeftShort } from "@react-icons/all-files/bs/BsArrowLeftShort"
import { IoIosClose } from "@react-icons/all-files/io/IoIosClose"

import Img1 from '../hotel/hotelImages/1.jpg'
import Img11 from '../hotel/hotelImages/11.jpg'
import Img12 from '../hotel/hotelImages/12.jpg'
import Img10 from '../hotel/hotelImages/10.jpg'
import Img9 from '../hotel/hotelImages/9.jpg'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../components/hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
// import Img12 from '../hotel/hotelImages/12.jpg'
import Reserve from '../../components/reserve/Reserve'
const Hotel = () => {

  const { id } = useParams();
  const { user } = useContext(AuthContext)

  const [slideNumber, setslideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const { data, loading, error, reFetch } = useFetch(`/hotels/${id}`)
  console.log(data)
  const { dates, options } = useContext(SearchContext);
  // console.log(dates.endDate)
  const endDate = dates[0]?.endDate;
  const startDate = dates[0]?.startDate;

  const MILLISECONDs_PER_DAY = (1000 * 60 * 60 * 24);
  function dayDifference(date1, date2) {
    if (!date1 || !date2) {
      return 0; // or handle the case where dates are not defined
    }
    if (!date1 === date2) {
      return 1; // or handle the case where dates are not defined
    }
    const timeDiff = Math.abs((date2.getTime()) - (date1.getTime()));
    const diffDays = Math.ceil(timeDiff / MILLISECONDs_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setslideNumber(i);
    setOpen(true)

  }
  // console.log(days)
  const handleMove = (direction) => {
    let newSlidenum;
    if (direction === "l") {
      newSlidenum = slideNumber === 0 ? 5 : slideNumber - 1;
    }
    else {
      newSlidenum = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setslideNumber(newSlidenum);

  }
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      setOpenModel(true)

    } else {
      navigate("/login");
    }

  }
  // console.log(user)

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? ("Loading....") : (<>
        <div className="hotelContainer">
          {open &&
            <div className="slider">
              <  BsArrowLeftShort className='arrow' nClick={() => { handleMove("l") }} />

              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <BsArrowRightShort className='arrow' onClick={() => { handleMove("r") }} />
              <IoIosClose className='close' onClick={() => { setOpen(false) }} />

            </div>}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or bookNow</button>
            <h1 className="hoteltitle">{data.name}</h1>
            <div className="hotelAddress">
              <FaLocationArrow />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Exellent loaction {data.distance} from center
            </span>
            <span className="hotelPriceHighLight">
              Book a stay over ₹{data.cheapestPrices} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {
                data.photos?.map((items, i) => {
                  return (
                    <div className="hotelImgWrapper">
                      <img onClick={() => handleOpen(i)} src={items.img} alt="" className="hotelImg" />
                    </div>
                  )

                })
              }

            </div>
            <div className="hotelDetails">
              <div className=" hotelDetailsTexts">
                <h1 className="hoteltitle">{data.title}</h1>
                <p className="hotelDesc">  {data.desc}

                  Very clean rooms, excellent meals with talented live music at dinner, friendly staff, and nice location made this a wonderful place to stay.” “I loved the food ...
                  Our staff, renowned for their warm and friendly demeanor, will cater to your every need, ensuring that your stay surpasses your expectations. Whether you're seeking recommendations for local attractions or require assistance with anything else, our attentive team is at your service.

                  Situated in a charming locale, our hotel offers more than just luxurious accommodations. It provides a gateway to the beauty of the area, allowing you to explore and discover at your leisure. Whether you're a nature enthusiast or a culture seeker, the surroundings offer something for everyone.

                  In essence, our hotel is a symphony of elegance, comfort, and hospitality. It's a place where every element comes together seamlessly to create an experience that lingers in your memory. From spotless rooms to delectable meals accompanied by live music, our establishment is a testament to the art of refined living. Your stay here is not just a sojourn; it's a masterpiece of moments that will be cherished long after you leave.
                </p>
              </div>
              <div className="hotelDetailsPrices">
                <h1>Perfect  for  a {days}-night Stay!</h1>
                <span>Located in the real heart of
                  Krakow, this property has an
                  excellent location Score of 9.8!</span>
                <h2>
                  <b>₹{days * data.cheapestPrices * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}> Reserve or Book Now!</button>
              </div>
            </div>

          </div>
          <MailList />
          <Footer />

        </div>
        </>)}
        
        {openModel && <Reserve  setOpen={setOpenModel} hotelId={id} />} 

    </div>
  )
}

export default Hotel
