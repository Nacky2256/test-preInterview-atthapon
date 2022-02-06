import * as React from 'react';

import { POKE_API_BASE_URL } from "./initial"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { useNavigate, useLocation} from "react-router-dom";
import Container from "@material-ui/core/Container";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    table: {
      minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

export default function Pokemons() {
    const navigate = useNavigate();
    var {state} = useLocation();
    
    const [pokemons, setPokemons] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);

    const [pokeType, setPokeType] = React.useState(state === null ? "" : state.poketype);
    const [pokeTypes, setPokeTypes] = React.useState([]);
    const classes = useStyles();


    const handleChangePokeType = (event) => {
        setPokeType(event.target.value);
      };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    
    const onRowPokeClick = (data) => {
        navigate('/detail', {state: {...data, poketype: pokeType}});
    }


    const fetchingTypes = async() =>{
        const response = await fetch(POKE_API_BASE_URL + "/type");
        const data = await response.json();
        if(data.results !== undefined){
            const types = data.results.map((type, index) => ({id: (index+1).toString(), name: type.name, url: type.url}));
            setPokeTypes(types);
        }
    }

    React.useEffect(()=>{
        fetchingTypes();
    },[]);

    React.useEffect(()=>{
        const fetchingPokemons = async() => {
            if(pokeType !== ''){
                const response = await fetch(POKE_API_BASE_URL +  "/type/" + pokeType);
                const data = await response.json();
                if(data.pokemon !== undefined){
                    const poke = data.pokemon.map((p,i)=> ({id:i+1, name: p.pokemon.name, url: p.pokemon.url}));
                    setPokemons(poke);
                }
            }else{
                setPokemons([]);
            }
        }
        fetchingPokemons();
    },[pokeType]);

    const selectType = pokeTypes.length > 0 ? <div style={{display: "flex", alignItems: "center", justifyContent: "center" , marginTop: "2rem"}}>
    Type Pokemon
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="lblType">Type</InputLabel>
      <Select
      labelId="lblType"
      id="demo-simple-select-outlined"
      value={pokeType}
      onChange={handleChangePokeType}
      label="type"
      >
          <MenuItem value="">
              <em>None</em>
          </MenuItem>
          {pokeTypes.map(type => <MenuItem value={type.id} key={type.id}>{type.name}</MenuItem>)}
      </Select>
  </FormControl>
</div> : <div>Loading...</div>

  return (
      <Container>
          {selectType}
        <div style={{ height: 300, width: '100%' }}>    
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
            <caption>pokemon list with type</caption>
            <TableHead>
                <TableRow>
                <TableCell align='center' >ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center" >URL</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {pokemons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow onClick={() => onRowPokeClick(row)} key={row.id}>
                    <TableCell align='center' component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align='center'>{row.url}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[8, 10, 25, 100]}
            component="div"
            count={pokemons.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
      </Container>
    
  );
}