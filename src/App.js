import React from 'react';
import Pokemons from "./components/Pokemon";
import { Link, Route, Routes } from "react-router-dom";
import Detail from './components/Pokemon/Detail';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Article3 from './components/Article/Article3';
import Article4 from './components/Article/Article4';
import Article5 from './components/Article/Article5';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#ffffff"
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            <Link style={{color: "#fff"}} to="/">Pokemon</Link>  
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link style={{color: "#fff"}} to="/article3">ข้อที่ 3</Link>  
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link style={{color: "#fff"}} to="/article4">ข้อที่ 4</Link>  
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link style={{color: "#fff"}} to="/article5">ข้อที่ 5</Link>  
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
      <Routes>
      <Route path="/" element={<Pokemons/>}/>
      <Route path="/detail" element={<Detail/>}/>
      <Route path="/article3" element={<Article3/>}/>
      <Route path="/article4" element={<Article4/>}/>
      <Route path="/article5" element={<Article5/>}/>
    </Routes>
    </div>


  );
}

export default App;
