import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {useHistory} from 'react-router-dom'

import "./styles/Success.css";
import { Button } from '@material-ui/core';

function Success(props) {
    const history = useHistory();

    const handleClick = () => {
        history.push("/students");
    }

    return (
        <Dialog open fullWidth maxWidth='sm'>
            <div id="success">
                {props.success && <React.Fragment>
                                    <h1>{props.msg}</h1>
                                    <Button variant="contained" color="primary" onClick={handleClick} id="back-btn" >
                                        Students
                                    </Button>
                                  </React.Fragment>}
                {!props.success && <h1>{props.error.err}</h1>}
            </div>
        </Dialog>
    )
}

export default Success;