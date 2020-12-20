import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Success from "../Signup/Success";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "#3F3D56",
	},
}));

function PostProject(props) {
	const classes = useStyles();

	const [userDetails, setUserDetails] = useState({
		projectName: "",
		projectDescription: "",
		group: '',
		link: "",
	});

	const [success, setSuccess] = useState(false);
	const [msg, setMsg] = useState();
	const [error, setError] = useState();

	const { projectName, projectDescription, group, link } = userDetails;

	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		let token = localStorage.getItem('token');
		e.preventDefault();
		axios
			.post(
				"http://localhost:3000/projects",
				{
					projectName,
					projectDescription,
					group,
					link
				},
				{
					headers: { Authorization: `bearer ${token}` }
				}
			)
			.then((res) => {
				console.log(res);
				setSuccess(res.data.project);
				console.log(res.data.project);
				setMsg(res.data.msg);
			})
			.catch((err) => {
				setError(err);
				console.log(err);
			});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Upload Project
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								autoFocus
								fullWidth
								id="project-name"
								label="Project Name"
								name="projectName"
								autoComplete="projectName"
								defaultValue={projectName}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								autoFocus
								fullWidth
								id="project-description"
								label="Project Description"
								name="projectDescription"
								autoComplete="projectDescription"
								defaultValue={projectDescription}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								autoFocus
								fullWidth
								id="group"
								label="group"
								name="group"
								autoComplete="group"
								defaultValue={group}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								autoFocus
								fullWidth
								id="link"
								label="Github/Live Project Link"
								name="link"
								autoComplete="link"
								defaultValue={link}
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
						Upload
					</Button>
					{success && <Success success={success} msg={msg} />}
				</form>
			</div>
		</Container>
	);
}

export default PostProject;
