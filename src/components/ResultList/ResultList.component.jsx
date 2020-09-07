import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(1)
    },
    item: {
        padding: theme.spacing(1)
    }
}))

const ResultList = ({searchKey, movies, nominations, handleNominate}) => {
    const classes = useStyles();
    return (
        <div>
            <Typography component="h1" variant="h6">
                Results for "{searchKey}"
            </Typography>
            <ul>
                {
                    movies.map( m => 
                    <li key={m.imdbID} className={classes.item}>
                        {`${m.Title} (${m.Year})`}
                        <Button size="small" variant="outlined" className={classes.button} onClick={ e => handleNominate(m) }
                            disabled={ ( nominations.length >= 5 ) ? true : ( nominations.some( n => n.imdbID === m.imdbID ) ) ? true : false }
                        > {/* disable Nominate button if the movie was nominated or there are 5 nominations */}
                            Nominate
                        </Button>
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

export default ResultList;