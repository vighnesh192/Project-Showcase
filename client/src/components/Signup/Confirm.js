import React, { useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import './styles/Confirm.css';
import Success from './Success';

const useStyles = makeStyles((theme) => ({
    listItem: {
        paddingLeft: 0
    },
    next: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#3F3D56",
    },
    prev: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#FFFFFF",
      color: "#000000",
      borderColor: "#000000"
    },
  }));

function Confirm(props) {
    const { firstname, lastname, username, email, rollNo, phoneNo, gitHub, linkedIn, password } = props.userDetails;

    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState()
    const [error, setError] = useState(); 

    const prevStep = (e) => {
      e.preventDefault();
      props.prevStep();
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('/users/signup', {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        rollNo: rollNo,
        phoneNo: phoneNo,
        gitHub: gitHub,
        linkedIn: linkedIn
      }, {withCredentials: true})
      .then(res => {
        setSuccess(true);
        setMsg(res.data.status);
      })
      .catch(err => setError(err))
    }

    const classes = useStyles();

    return (
        <MuiThemeProvider>
        <div className="confirm">
            <Typography id="title" component="h1" variant="h5">
                Confirmation
            </Typography>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemText className={classes.listItem} primary="First Name" secondary={firstname} />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Last Name" secondary={lastname} />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Email" secondary={email} />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Username" secondary={username} />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Roll No" secondary={rollNo} />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Phone No" secondary={phoneNo} />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="GitHub" secondary={gitHub} />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText primary="LinkedIn" secondary={linkedIn} />
              </ListItem>
            </List>
            <br />

            <Button
              variant="outlined"
              onClick={prevStep}
              id="back-btn"
              className={classes.prev}
            >Back</Button>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              id="confirm-btn"
              className={classes.next}
            >Confirm & Continue</Button>
            {success && <Success success={success} msg={msg} />}
            
        </div>
      </MuiThemeProvider>
    )
}

export default Confirm;