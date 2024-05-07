import React from 'react'
import './table.scss'
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

const UserList = ({userId}) => {
    console.log(userId)

    const [list, setList] = useState([]);
  
  const path=`booking/${userId}`
  console.log(path)
 
  
    // Fetch data based on the pathname
    const { data, loading, error } = useFetch(`/booking/${userId}`);
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
                        <TableCell className='tableCell'>User ID</TableCell>
                        <TableCell className='tableCell'>Room Id</TableCell>
                        <TableCell className='tableCell'>Room No</TableCell>
                        <TableCell className='tableCell'>Date</TableCell>
                        <TableCell className='tableCell'>Razorpay_order_id</TableCell>
                        <TableCell className='tableCell'>Razorpay_payment_id</TableCell>
                        <TableCell className='tableCell'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row) => (
                        <TableRow key={row._id}
                        >

                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    {/* <img src={row.img} alt="" className="image" /> */}
                                    {row.userId}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{row.roomId}</TableCell>
                            <TableCell className="tableCell">{row.roomNo}</TableCell>
                            <TableCell className="tableCell"> {new Date(row.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="tableCell">{row.razorpay_order_id}</TableCell>
                            <TableCell className="tableCell">{row.razorpay_payment_id}</TableCell>
                            <TableCell className="tableCell">
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default UserList
