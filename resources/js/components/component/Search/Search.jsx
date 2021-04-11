import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import './search.css';
import { useForm } from '../../Utils/Utils';
import { connect, useDispatch } from 'react-redux';
import { searchArticle } from '../../redux/action';
import { getDataUser } from '../../redux/reducer/loginReducer';
import { setLoading } from '../../redux/reducer/LoadingReducer';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '100px',
        width: '300px',
        border: 'none !important',
        background: 'transparent !important',
        marginTop: '30px'
    },
    iconButton: {
        padding: 10,
    },
    input: {
        marginLeft: theme.spacing(1),
    },
}));



function Search({ searchArticle, isLoading }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { onChange, onSubmit, values } = useForm(SearchCallback, {
        search: 'a'
    });

    
    function SearchCallback(){
        searchData();
    }
    
    
    const searchData = async (e) => {
        e.preventDefault()
        dispatch(setLoading({
            isLoading: true
        }))
        const sendData = {
            'search': values.search
        }
        const res = await searchArticle(sendData).catch(err => err);
        if(res){
            // console.log(res)
        }
    }

    return (
        <Paper className={classes.root}>
            <div className="input-search">
                <InputBase
                    className={classes.input}
                    placeholder="Cari Artikel"
                    inputProps={{ 'aria-label': 'cari artikel' }}
                    name="search"
                    onChange={onChange}
                    
                />
                <IconButton 
                    type="submit" 
                    className={classes.iconButton} 
                    aria-label="search"
                    onClick={searchData}
                    onSubmit={onSubmit}
                >
                    <SearchIcon />
                </IconButton>
            </div>
        </Paper>
    );
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading,
    user: state
})

const reduxDispatch = (dispatch) => ({
    searchArticle: (data) => dispatch(searchArticle(data))
})

export default connect(reduxState, reduxDispatch)(Search);