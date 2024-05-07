export const userColumns = [
     { field: "_id", headerName: "ID", width: 70 },
    {
        field: "user",
        headerName: "User",
        width: 230,
        renderCell: (parms) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={parms.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif" } alt="avatar" />
                    {parms.row.username}
                </div>
            )

        }
    },
    {
        field: "email",
        headerName: "Email",
        width: 300,
    },
    {
        field: "country",
        headerName: "Country",
        width: 100,
    },
    {
        field: "city",
        headerName: "City",

        width: 100,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 100,
    },
    // {
    //     field: "status",
    //     headerName: "Status",
    //     width: 160,
    //     renderCell: (parms) => {
    //         return (
    //             <div className={`cellWithStatus ${parms.row.status}`}>
    //                 {parms.row.status}
    //             </div>
    //         )

    //     }
    // }
];
export const hotelColumns=[
    {field:"_id",headerName:"ID",width:220},
    {
        field:"name",
        headerName:"HotelName",
        width:120,
    },
    {
        field:"type",
        headerName:"Type",
        width:120,
    },
    {
        field:"title",
        headerName:"Title",
        width:300,
    },
    {
        field:"city",
        headerName:"City",
        width:230,
    }

]
export const roomColumns=[
    {field:"_id",headerName:"ID",width:250},
    {
        field:"title",
        headerName:"Title",
        width:200,
    },
    {
        field:"desc",
        headerName:"Description",
        width:200,
    },
    {
        field:"price",
        headerName:"Price",
        width:100,
    },
    {
        field:"maxPeople",
        headerName:"Max People",
        width:100,
    }

]

