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

const Nomination = ({nominations, handleUnnominate}) => {
    const classes = useStyles();
    return (
        <div>
            <Typography component="h1" variant="h6">
                Nominations
            </Typography>
            <ul>
                {
                    nominations.map( m => 
                    <li key={m.imdbID} className={classes.item}>
                        {`${m.Title} (${m.Year})`}
                        <Button size="small" variant="outlined" className={classes.button} onClick={ e => handleUnnominate(m) }>Remove</Button>
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Nomination;