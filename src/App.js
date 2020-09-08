import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
import Slide from '@material-ui/core/Slide';

import SearchBox from './components/SearchTerm/SearchBox.component';
import ResultList from './components/ResultList/ResultList.component';
import Nomination from './components/Nomination/Nomination.component';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    background: '#F3F3F3',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  }
}))

const App = () => {
  const classes = useStyles();

  const [search, setSearch] = useState(""); // search key
  const [movies, setMovies] = useState([]); // result of searching movies
  const [nominations, setNominations] = useState(( localStorage.hasOwnProperty("nominations") ) ? JSON.parse(localStorage.nominations) : []); // load nominations from localStorage

  const handleSearchKeys = value => setSearch(value); // update search key

  const handleNominate = movie => setNominations([...nominations, movie]); // add a nomination

  const handleUnnominate = movie => setNominations(nominations.filter( m => m.imdbID !== movie.imdbID)); // remove a nomination
  

  useEffect( () => {
    /* Search from OMDB's API */
    fetch(`https://www.omdbapi.com/?apikey=df435e4a&s=${search}`)
      .then( res => res.json() )
      .then( json => (json.hasOwnProperty("Error")) ? setMovies([]) : setMovies(json.Search) );
    localStorage.setItem('nominations', JSON.stringify(nominations));
  }, [search,nominations])

  return (
    <React.Fragment>
      <main className={classes.content}>
        <Slide direction="down" in={( nominations.length < 5 ) ? false : true}>
          <Alert variant="filled" severity="success" className={classes.banner}>
            <strong>You have nominated 5 movies successfully</strong>
          </Alert>
        </Slide>
        <Container maxWidth="lg" className={classes.container}>
          <Typography component="h1" variant="h4" color="textPrimary">
            The Shoppies
          </Typography>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <SearchBox handleSearchKeys={handleSearchKeys}/>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <ResultList searchKey={search} movies={movies} nominations={nominations} handleNominate={handleNominate}/>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Nomination nominations={nominations} handleUnnominate={handleUnnominate}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default App;
