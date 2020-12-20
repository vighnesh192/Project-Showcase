import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarLoader } from "react-spinners";

import './styles/DisplayUsers.css'

function DisplayUsers() {

    const [ users, setUsers ] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        /*async function fetchData() {
            const res = await axios.get('/users');
            setUsers(res.data);
            return res;
        }*/
        async function fetchData() {
        setLoading(true);
        try {
            const res = await axios.get('/users');
            setUsers(...users, res.data);
            
            setLoading(false);
            return res;
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }    
        fetchData();
    }, []) 

    return (
        <div id="display-users">
            {
                loading
                ? <div id="loader"> 
                    <BarLoader color='#3F3D56' loading={loading} /> 
                  </div>
                : <React.Fragment>
                      <h1>T.E. Students</h1>
                        <div id="cards">
                            {users.map((user) => 
                                <div key={user._id} className="card">
                                    <span className="dp"></span>

                                    <div className="user-details">
                                        <h3>{user.firstname+" "+user.lastname}</h3>
                                        <div className="bottom">
                                            <p>{user.rollNo}</p>
                                            <div className="icons">
                                                {(user.linkedIn && <a href={user.linkedIn}><i className="fab fa-linkedin-in linkedIn"></i></a>)}
                                                {(user.gitHub && <a href={user.gitHub}><i className="fab fa-github"></i></a>)}
                                            </div>
                                        </div> 
                                    </div>                      
                                </div>    
                            )}
                        </div>
                  </React.Fragment>
            }       
        </div>
    )
}

export default DisplayUsers;