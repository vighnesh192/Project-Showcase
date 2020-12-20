import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Success from '../Signup/Success';
import AppNavbar from '../AppNavbar';
import { render } from 'jade';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#3F3D56",
    },
  }));
  
function UserDetails(props) {
    const classes = useStyles();

    const { setLoggedInState, isLoggedIn } = props;

    const [userDetails, setUserDetails] = useState({
        username: '', 
        password: ''
    })

    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState();
    const [error, setError] = useState(); 

    const { username, password } = userDetails;

    const handleChange = (e) => {
        setUserDetails({ 
            ...userDetails,
            [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/users/login', {
          username: username,
          password: password
        }, {withCredentials: true})
        .then(res => {
          console.log(res);
          setSuccess(res.data.success);
          console.log(res.data.success);
          localStorage.setItem('token', res.data.token);
          setLoggedInState(true);
          setMsg(res.data.status);
        })
        .catch(err => {
            setError(err);
            console.log(err);
        })
      }
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  autoFocus
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="email"
                  defaultValue={username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  defaultValue={password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Login
            </Button>
            {success && <Success success={success} msg={msg} />}
          </form>
        </div>
      </Container>
    );
  }

export default UserDetails;