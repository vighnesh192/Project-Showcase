import React from 'react';
import {useHistory} from 'react-router-dom'

import './styles/Home.css'

function Home() {

    const history = useHistory();

    const handleClick = () => {
        history.push("/students");
    }

    return (
        <div id="home">
            <div id="left">
                <div id="desc">
                    {/* <h1>Students’ Portal For I.T. Department</h1> */}
                    <h1>Platform to showcase your projects</h1>
                    {/* <p>Find all the details about the students of I.T. department of SIT.</p> */}
                    <p>Signup, upload your project, and race to the top of the leaderboard.</p>
                </div>                
                <button id="explore" onClick={handleClick}>Explore</button>
            </div>

            <div id="right">
                <img src={require("../assets/images/undraw_online_cv_qy9w.svg")} alt="Illustration" />
            </div>
        </div>
    )
}

export default Home;