
import React, { useContext, useState } from 'react'
import './tableList.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from '../../components/hooks/useFetch'
import { AuthContext } from '../../context/AuthContext'

const TableList = () => {
    const { user } = useContext(AuthContext)
    let userId=user?._id;
 
     const { data, loading, error, reFetch } = useFetch(`/booking/${userId}`)
  

    return (

        <TableContainer component={Paper} className='table'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='tableCell'>User ID</TableCell>
                        <TableCell className='tableCell'>Room Id</TableCell>
                        <TableCell className='tableCell'>Room Number</TableCell>
                        <TableCell className='tableCell'>razorpay_order_id</TableCell>
                        <TableCell className='tableCell'>razorpay_payment_id</TableCell>
                        {/* <TableCell className='tableCell'>razorpay_signature Method</TableCell> */}
                        <TableCell className='tableCell'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => (
                        <TableRow key={row?._id}
                        >
                            <TableCell className="tableCell">{row?.userId} </TableCell>

                            <TableCell className="tableCell">{row?.roomId}</TableCell>
                            <TableCell className="tableCell">{row?.roomNo}</TableCell>
                            <TableCell className="tableCell">{row?.razorpay_order_id}</TableCell>
                            <TableCell className="tableCell">{row?.razorpay_payment_id}</TableCell>
                            {/* <TableCell className="tableCell">{row.razorpay_signature}</TableCell> */}
                            <TableCell className="tableCell">
                                <span className={`status ${row?.status}`}>{row?.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> 
        </TableContainer>

    )
}

export default TableList
