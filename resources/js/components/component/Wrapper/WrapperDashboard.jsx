import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect, useDispatch } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: 'Poppins',
        fontWeight: theme.typography.fontWeightBold
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        fontFamily: 'Poppins',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        fontFamily: 'Poppins',
        position: 'relative',
        overflowX: 'hidden'
    },
}));

function WrapperDashboard({ loading, children }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <Sidebar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div >
    )
}

const reduxState = (state) => ({
    loading: state.loading.isLoading,
})

const reduxDispatch = (dispatch) => ({
    
})

export default connect(reduxState, reduxDispatch)(WrapperDashboard);
