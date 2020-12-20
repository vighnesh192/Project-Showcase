import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarLoader } from "react-spinners";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function EnhancedTableHead(props) {
	
	const headCells = [
		{ id: 'name', numeric: false, disablePadding: false, label: 'Project Name' },
		{ id: 'size', numeric: true, disablePadding: false, label: 'Group Size' },
		{ id: 'upvotes', numeric: true, disablePadding: false, label: 'Upvotes' },
		{ id: 'uploaded-on', numeric: true, disablePadding: false, label: 'Uploaded On' },
	];

	const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
		console.log('Order', order);
  };

	return (
		<TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            > */}
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
	);
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h5" align="center" id="tableTitle" component="div">
          Projects
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [selectedArr, setSelectedArr] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [rows, setRows] = React.useState([]);

	const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { setLoggedInState, isLoggedIn } = props;

	const theme = createMuiTheme({
		palette: {
			secondary: {
				main: '#000',
			},
			primary: {
				main: '#3F3D56'
			}
		},
	});

	useEffect(() => {
		/*async function fetchData() {
            const res = await axios.get('/users');
            setUsers(res.data);
            return res;
        }*/
		async function fetchData() {
			setLoading(true);
			try {
				const res = await axios.get("/projects");
				setProjects(res.data);
				console.log(res.data);
				res.data.map((obj) => {
					let groupLength = obj.group.split(',').length;
					setSelectedArr(selectedArr => [...selectedArr, false]);
					let date = new Date(obj.createdAt);
					setRows(oldRows => [...oldRows, createData(obj.projectName, groupLength, obj.upvotes, new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date), obj._id)]);
				})
				console.log(rows);
				setLoading(false);
				return res;
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		}
		fetchData();
		console.log(projects);
	}, []);

	function createData(name, groupLength, upvotes, createdAt, id) {
		return { name, groupLength, upvotes, createdAt, id };
	}
	
	// rows = [
	// 	createData('Cupcake', 305, 3.7, 67, 4.3),
	// 	createData('Donut', 452, 25.0, 51, 4.9),
	// 	createData('Eclair', 262, 16.0, 24, 6.0)
	// ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		console.log('selectedIndex', selectedIndex)
    let newSelected = [];
		
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

		setSelected(newSelected);
		console.log('selected', selected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
	};
	
	const handleUpvoteClick = (e, createdAt, i, id) => {
		let token = localStorage.getItem('token');
		function search(createdAt, rows){
			for (var j=0; j < rows.length; j++) {
				if (rows[j].createdAt === createdAt) {
					return j;
				}
			}
		}
		let indexToChange = null;
		if(selectedArr[i]) {
			indexToChange = search(createdAt, rows);
			rows[indexToChange].upvotes -= 1;
			setRows([...rows]);
			selectedArr[i] = false;
			setSelectedArr([...selectedArr]);

			axios
			.put(
				"http://localhost:3000/projects",
				{
					id,
					upvotes: rows[indexToChange].upvotes
				},
				{
					headers: { Authorization: `bearer ${token}` }
				}
			)
			.then((res) => {
				console.log(res);
				// setSuccess(res.data.project);
				console.log(res.data.project);
				// setMsg(res.data.msg);
			})
			.catch((err) => {
				// setError(err);
				console.log(err);
			});

			console.log('Updated Upvote', rows);
			console.log('selected Arr:-', selectedArr);
		}
		else {
			indexToChange = search(createdAt, rows);
			rows[indexToChange].upvotes += 1;
			setRows([...rows]);
			selectedArr[i] = true;
			setSelectedArr([...selectedArr]);

			axios
			.put(
				"http://localhost:3000/projects",
				{
					id,
					upvotes: rows[indexToChange].upvotes
				},
				{
					headers: { Authorization: `bearer ${token}` }
				}
			)
			.then((res) => {
				console.log(res);
				// setSuccess(res.data.project);
				console.log(res.data.project);
				// setMsg(res.data.msg);
			})
			.catch((err) => {
				// setError(err);
				console.log(err);
			});

			console.log('Updated Upvote', rows);
			console.log('selected Arr:-', selectedArr);
		}
	}

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root} style={{ padding: "7% 15vw" }}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      // role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell> */}
                      <TableCell component="th" id={labelId} scope="row" align="center">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.groupLength}</TableCell>
											<ThemeProvider theme={theme}>
                      <TableCell align="center">
                        {isLoggedIn && (
                          <IconButton color={selectedArr[index] ? "primary" : "default"} onClick={(event) => handleUpvoteClick(event, row.createdAt, index, row.id)} aria-label="upvote">
                            <ArrowUpwardIcon />
                          </IconButton>
                        )
                        }
												{row.upvotes}
											</TableCell>
											</ThemeProvider>
											<TableCell align="center">{row.createdAt}
											</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

// export default Projects;
