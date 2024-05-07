import React from 'react'
import './dataTable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../DataSource';
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react';
import axios from 'axios';

const DataTable = ({ columns }) => {
    // console.log(columns)
    const location = useLocation();
    const path = location.pathname.split("/")[1];


    const [list, setList] = useState([]);
    const { data, loading, error } = useFetch(`/${path}/`)
    console.log(`/${path}/`)

 
    useEffect(() => {
        setList(data);
    }, [data])
 
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/${path}/${id}`);
            setList(list.filter((item) => item._id !== id))
        } catch (err) {

        }

    }
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>

                        <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
                    </div>
                )
            }
        }
    ]

    return (
        <div className='datatable'>
            <div className="datatableTitle">
                {path}
                <Link to={`/${path}/new`} style={{ textDecoration: "none" }} className='link'>
                    Add New
                </Link>
            </div>

            <DataGrid
                className='datagrid'
                rows={list}
                columns={columns.concat(actionColumn)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                // rowsPerPageOptions={[9]}
                pageSizeOptions={[5, 9]}
                checkboxSelection

                disableRowSelectionOnClick
                getRowId={row => row._id}
            />

        </div>
    )
}

export default DataTable
