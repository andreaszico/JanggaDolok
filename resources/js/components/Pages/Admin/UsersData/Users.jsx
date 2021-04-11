import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useEffect } from 'react';
import {
    connect
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import WrapperDashboard from '../../../component/Wrapper/WrapperDashboard';
import TableMaterial from '../../../component/Tabel/TabelMaterial';
import Loading from '../../../component/Loading/Loading';
import { getAllUsers } from '../../../redux/action';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    heading: {
        fontWeight: '700'
    },
    h1: {
        fontWeight: '700'
    }
}));



function Users({ isLoading, getAllUsersData }) {
    const classes = useStyles();
  
    return (
        <WrapperDashboard>
            {
                isLoading ? (
                    <>
                        <Loading />
                        <div className="article" style={{ minHeight: '300vh', marginTop: '15vh' }} />
                    </>
                ) : (
                        <>
                            <h1 className={classes.h1}>DAFTAR COMMENTS</h1>
                            <TableMaterial/>
                        </>
                    )
            }
        </WrapperDashboard>
    )
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading,
})

const reduxDispatch = (dispatch) => ({
    getAllUsersData: () => dispatch(getAllUsers()),
})

export default connect(reduxState, reduxDispatch)(withRouter(Users));

