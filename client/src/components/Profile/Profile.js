import React, { useState, useEffect } from 'react';
import { useParams} from "react-router";
import { BarLoader } from "react-spinners";
import axios from 'axios';

function Profile() {

    let { studentId } = useParams();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try{
                const res = await axios.get(`/users/${studentId}`);
                setLoading(true);
                setUser(...user, res.data);
                setLoading(false);
                console.log(user);
                return res; 
            } catch(err) {
                setLoading(false);  
            } 
        }
        fetchData();
    }, [])

    return (
        <div>
            <div id="display-users">
            {
                loading
                ? <div id="loader"> 
                    <BarLoader color='#3F3D56' loading={loading} /> 
                  </div>
                : <React.Fragment>
                    {/*TODO*/}
                  </React.Fragment>
            }       
        </div>
        </div>
    )
}

export default Profile;
