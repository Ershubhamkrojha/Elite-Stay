import React from 'react'
import './roomTable.scss'
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
const  RoomTable= ({RoomPath}) => {
    const [list, setList] = useState([]);
  
   
    //  console.log(hotelPath)
    const { data, loading, error } = useFetch(`${RoomPath}`);
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
                        <TableCell className='tableCell'>Room ID</TableCell>
                        <TableCell className='tableCell'>Name</TableCell>
                        <TableCell className='tableCell'>Price</TableCell>
                        <TableCell className='tableCell'>Max People</TableCell>
                     <TableCell className='tableCell'>Room No</TableCell>
                        <TableCell className='tableCell'>Desc</TableCell>
                     
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
                            <TableCell className="tableCell">{list?.title}</TableCell>
                            <TableCell className="tableCell">{list?.city}</TableCell>
                            <TableCell className="tableCell">{list?.price}</TableCell>
                            <TableCell className="tableCell">{list?.maxPeople}</TableCell>
                            <TableCell>
                            {list.roomNumber?.map((roomDetail) => (
                                    <div key={roomDetail?._id}>{roomDetail?.number}</div>
                                ))}
                            </TableCell>
                           
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

export default RoomTable
