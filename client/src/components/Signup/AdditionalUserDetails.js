import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import './styles/UserDetails.css'

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
  

function AdditionalUserDetails(props) {
    const nextStep = (e) => {
        e.preventDefault();
        props.nextStep();
    }
    const prevStep = (e) => {
        e.preventDefault();
        props.prevStep();
    }

    const { rollNo, phoneNo, gitHub, linkedIn } = props.userDetails;

    const classes = useStyles();
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Step 2 of 3
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="rollNo"
                  name="rollNo"
                  variant="outlined"
                  required
                  fullWidth
                  id="rollNo"
                  label="Roll No"
                  autoFocus
                  defaultValue={rollNo}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNo"
                  label="Phone No"
                  name="phoneNo"
                  autoComplete="phoneNo"
                  defaultValue={phoneNo}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="gitHub"
                  label="GitHub"
                  name="gitHub"
                  autoComplete="gitHub"
                  defaultValue={gitHub}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="linkedIn"
                  label="LinkedIn"
                  name="linkedIn"
                  autoComplete="linkedIn"
                  defaultValue={linkedIn}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item justify="flex-start">
                <Button
                fullWidth
                variant="outlined"
                className={classes.prev}
                onClick = {prevStep}
                >
                Back
                </Button>
              </Grid>
              <Grid item justify="flex-end">
                <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.next}
                onClick = {nextStep}
                >
                Next
                </Button>
              </Grid>
            </Grid>
            
          </form>
        </div>
      </Container>
    );
}

export default AdditionalUserDetails;