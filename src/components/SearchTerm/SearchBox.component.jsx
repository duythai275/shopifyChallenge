import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    iconButton: {
        padding: 10,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
}));

const SearchBox = ({handleSearchKeys}) => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="subtitle1">
                Movie Title
            </Typography>
            <Paper component="form" className={classes.search}>
                <IconButton className={classes.iconButton} aria-label="menu">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Search Movies"
                    inputProps={{ 'aria-label': 'search movies' }}
                    onChange={ e => handleSearchKeys(e.target.value) }
                />
            </Paper>
        </div>
    )
}

export default SearchBox;