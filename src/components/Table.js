import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../static/Home.css";
import "../static/Navbar.css";
import { useContext } from 'react';
import { MyContext } from './Mycontext';

function Table() {
    const { uid, setUid } = useContext(MyContext);
    console.log(uid);
    if(!uid) window.location.href="/";
    const [userdetails, setUserDetails] = useState([]);
    const [agdata, setAgData] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        onValue(ref(db, 'users'), (snapshot) => {
            const data = snapshot.val();
            if (data.length >= 1 && !data[0]) data.splice(0, 1);
            setUserDetails(data);
            const k = Object.keys(data);
            let arr = [];
            for (let i = 0; i < k.length; i++) {
                var key = k[i];
                arr.push(data[key]);
            }
            setAgData(arr);
        });
    }, []);

    const columns = [
        { headerName: "Username", field: "username", sortable:true,filter :true },
        { headerName: "Date", field: "date" , sortable:true,filter : true},
        { headerName: "Status", field: "status" },
    ];

    function add() {
        window.location.href = '/';
    }

    function del(id) {
        const database = getDatabase();
        const userRef = ref(database, 'users/' + id);
        remove(userRef)
        const db = getDatabase();
        onValue(ref(db, 'users'), (snapshot) => {
            const k = snapshot.val();
            if (k) setUserDetails(k);
            else setUserDetails([]);
        });
    }

    return (
        <div className="table-container">
            <div className="ag-theme-alpine ag-grid-container" style={{
                height: '350px',
                width: '1000px',
                marginBottom: '20px'
            }}>
                <AgGridReact rowData={agdata} columnDefs={columns} />
            </div>

            <div className="html-table-container">
                <table className="custom-table"> {/* Add a custom class to the table */}
                    <thead>
                        <tr>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(userdetails).map((i) => (
                            <tr key={userdetails[i].username}>
                                <td>
                                    <input type="radio" id={`active-${userdetails[i].username}`} name={userdetails[i].username} value="active" checked className="specifyColor" />
                                    <label htmlFor={`active-${userdetails[i].username}`}>Active</label><br />
                                    <input type="radio" id={`unactive-${userdetails[i].username}`} name={userdetails[i].username} value="unactive" className="specifyColor" />
                                    <label htmlFor={`unactive-${userdetails[i].username}`}>Unactive</label>
                                </td>
                                <td>
                                    <button className="button" onClick={add}>Add</button>
                                    <button className="button" onClick={() => del(userdetails[i].username)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
