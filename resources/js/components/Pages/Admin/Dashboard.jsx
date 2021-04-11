import { makeStyles } from '@material-ui/styles';
import React from 'react'
import CardCount from '../../component/CardCount/CardCount';
import WrapperDashboard from '../../component/Wrapper/WrapperDashboard'

const useStyles = makeStyles((theme) => ({
    heading: {
       fontWeight: '700'
    },
}));

function Dashboard() {
    const classes = useStyles();
    return (
        <WrapperDashboard>
            <h2 className={classes.heading}>SELAMAT DATANG ADMIN</h2>
            <CardCount />
        </WrapperDashboard>
    )
}

export default Dashboard
