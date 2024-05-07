import React from 'react'
import './hotelTable.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react';
const HotelTable = ({hotelPath}) => {
    const [list, setList] = useState([]);
  
   
    console.log(hotelPath)
    const { data, loading, error } = useFetch(`${hotelPath}`);
  console.log(data)
    useEffect(() => {
      // Update the list when data changes
      setList(data);
    }, [data]);


    return (

        <TableContainer component={Paper} className='table'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='tableCell'>Hostel ID</TableCell>
                        <TableCell className='tableCell'>Name</TableCell>
                        <TableCell className='tableCell'>City</TableCell>
                        <TableCell className='tableCell'>Distance</TableCell>
                        <TableCell className='tableCell'>Rating</TableCell>
                        <TableCell className='tableCell'>Cheapest Prices</TableCell>
                        <TableCell className='tableCell'>Address</TableCell>
                        <TableCell className='tableCell'>DEsc</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                        <TableRow key={list?._id}
                        >
                          
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src="https://www.justahotels.com/wp-content/uploads/2023/12/Ssatva-15.png" alt="" className="image" />
                                    {list._id}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{list?.name}</TableCell>
                            <TableCell className="tableCell">{list?.city}</TableCell>
                            <TableCell className="tableCell">{list?.distance}</TableCell>
                            <TableCell className="tableCell">{list?.rating}</TableCell>
                            <TableCell className="tableCell">{list?.cheapestPrices}</TableCell>
                            <TableCell className="tableCell">{list?.address}</TableCell>
                            <TableCell className="tableCell">{list?.desc}</TableCell>

                            {/* <TableCell className="tableCell">
                                <span className={`status ${row?.Status}`}>{row?.Status}</span>
                            </TableCell> */}
                        </TableRow>
             
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default HotelTable
