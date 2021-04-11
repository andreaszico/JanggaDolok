import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Line } from 'react-chartjs-2';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        color: theme.palette.text.secondary,
        width: '100%',
        marginTop: '40px'
    },
}));
function Chart({ data_chart }) {
    
    const classes = useStyles();

    const [data, setData] = useState({
        data: {
            labels: ['Jan', 'Mar', 'Apr'],
            datasets: [{
                label: 'Views',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }],
        }
    })

    return (
        <Grid
            container
            spacing={0}
        >
            <Paper className={classes.paper}>
                <Line
                    data={data.data}
                    height={200}
                    width={600}
                />
            </Paper>
        </Grid>
    )
}

export default Chart
