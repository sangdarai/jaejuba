import API from '../API';
import React, {useEffect, useState} from 'react';


export default function TestDB(){

    const [dbdata, setTodoList] = useState([]);

    useEffect(() => {
        API.get('/api/tdata')
        .then((res) => res.data)
        .then((data) => setTodoList(data));
    }, []);

    // const selectdb = JSON.stringify(dbdata);/

    return(
        <div>
            <h1>LIST</h1>
            {dbdata.map((customers) => (
                <div key={dbdata.id_email}>
                    <div>{customers.id_email}</div>
                    <div>{customers.password}</div>
                    <div>{customers.name}</div>
                    <div>{customers.nickname}</div>
                    <div>{customers.phone_num}</div>
                </div>
            ))}
        </div>
    );
}
