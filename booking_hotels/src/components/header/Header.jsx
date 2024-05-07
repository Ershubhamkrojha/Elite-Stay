import React, { useContext, useState } from 'react'
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range'
import header from './header.css';
import { FaBed } from "@react-icons/all-files/fa/FaBed";
import { FaPlaneDeparture } from "@react-icons/all-files/fa/FaPlaneDeparture"
import { FaCar } from "@react-icons/all-files/fa/FaCar"
import { FaShuttleVan } from "@react-icons/all-files/fa/FaShuttleVan"
import { FaChild } from "@react-icons/all-files/fa/FaChild"
import { FcCalendar } from "@react-icons/all-files/fc/FcCalendar"
import {useNavigate} from 'react-router-dom'

import { format } from "date-fns"
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
    const {user} = useContext(AuthContext)
   const[destination,setDestination]=useState("")

    // this page
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openOption, setOpenOption] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });
    const navigate = useNavigate()
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return { ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1, }
        });
    }
    const {dispatch}=useContext(SearchContext)

    const handleSearch=()=>{
dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})


        navigate("/hotels",{state:{destination,dates,options}})

    }
    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>

                <div className="headerList">
                    <div className="headerListIteams active">
                        <FaBed />
                        <span>Stays</span>
                    </div>
                    <div className="headerListIteams ">
                        < FaPlaneDeparture />
                        <span>Flight</span>
                    </div>
                    <div className="headerListIteams ">
                        < FaCar />
                        <span className="car">Car rentals</span>
                    </div>
                    <div className="headerListIteams ">
                        <FaShuttleVan />
                        <span className="van">Attractions</span>
                    </div>
                    <div className="headerListIteams ">
                        <FaShuttleVan />
                        <span className="van">Airpoart taxis</span>
                    </div>

                </div>

                {type !== "list" &&


                    <>
                        <h1 className="headerTitle">A Lifetime discount? It's Genius.</h1>
                        <p className="headerDesc">
                            Get Rewarded for your travels unlock instant saving of 10% or more with a free booking account
                        </p>
                        {!user&&
                        <button className="headerBtn">Sign in / Register</button>}

                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                < FaCar className='headerIcon' />
                                <input type='text' placeholder='Where are You going'
                                    className='headerSearchInput' onChange={(e)=>setDestination(e.target.value)}/>
                            </div>
                            <div className="headerSearchItem">
                                <FcCalendar className='headerIcon' />
                                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                                    {`${format(dates[0].startDate, "MM/dd/yyyy")}`}
                                      to
                                    {`${format(dates[0].endDate, "MM/dd/yyyy")}`}
                                </span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                   className='date'
                                    minDate={new Date()}
                                    ranges={dates} 
                                />}

                            </div>
                            <div className="headerSearchItem">
                                <FaChild className='headerIcon' />
                                <span onClick={() => setOpenOption(!openOption)} className="headerSearchText">{`${options.adult} adult .${options.children}  children . ${options.room} rooms`}</span>
                                {openOption && <div className="options">
                                    <div className="optionIteam">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className="optionCounterNumber" >{options.adult}</span>
                                            {/* disable button condition  */}
                                            <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionIteam">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionCounterNumber" >{options.children}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionIteam">
                                        <span className="optionText">Rooms</span>
                                        <div className="optionCounter">
                                            <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.room}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>



                        </div>
                    </>}
            </div>
        </div>

    )
}

export default Header
