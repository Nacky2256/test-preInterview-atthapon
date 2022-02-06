import React from "react"
import { Container } from "@material-ui/core";
import {  useLocation, useNavigate } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
    },
  }));
  


const Detail = () => {
    const classes = useStyles();
    var {state} = useLocation();
    const [pokemon, setPokemon] = React.useState({});
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate("/", {state: {poketype: state.poketype}});
    }
    React.useEffect(()=> {
        const fetchingPokemon =async () => {
            if(state.url !== undefined){
                const response = await fetch(state.url);
                const json = await response.json();
                setPokemon(json);
            }
        }
        fetchingPokemon();
    },[state.url]);

    const Pokem = state === null ? <Container>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center" , marginTop: "2rem"}}>
            No Data.
        </div>
    </Container> : <Container>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center" , marginTop: "2rem"}}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img width={"100%"} src={pokemon.sprites !== undefined ? pokemon.sprites.front_default : ""} alt={pokemon.name}/>
                    </Avatar>
                    }
                    title={pokemon.name}
                    subheader={"Base Exprirance: " + pokemon.base_experience} 
                />
                <CardMedia
                    className={classes.media}
                    image={pokemon.sprites !== undefined ? pokemon.sprites.other.home.front_default : "/test.png"}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    { "Abilities:  " + (pokemon.abilities !== undefined ? pokemon.abilities.map((data) => " "+data.ability.name) : "no data.")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    { "Types:  " + (pokemon.types !== undefined ? pokemon.types.map((data) => " "+data.type.name) : "no data.")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    { "Stats:  " + (pokemon.stats !== undefined ? pokemon.stats.map((data) => " "+data.stat.name + ": " + data.base_stat) : "no data.")}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={navigateBack} aria-label="back">
                    <KeyboardBackspaceIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
        
    </Container>;

    return Pokem;
}

export default Detail;