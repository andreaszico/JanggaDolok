import React, { useState, useEffect } from 'react';
import './cardcount.css';
import BarChartIcon from '@material-ui/icons/BarChart';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getAllData } from '../../redux/action/AdminAction';
import { setLoading } from '../../redux/reducer/articleReducer';
import Chart from '../Chart/Chart';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        display: 'flex',
        color: theme.palette.text.secondary,
    },
    icon: {
        display: 'flex',
    },
    paragraph: {
        fontSize: '13px'
    },
    box: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    span: {
        fontSize: '25px'
    },
    span2: {
        fontSize: '5px',
        color: '#ff3429',
    },
}));


function CardCount({ getDataWeb }) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [data, setData] = useState({
        views: 0,
        article: 0,
        comment: 0,
        chart: []
    })

    useEffect(() => {
        async function fetchData() {
            dispatch(setLoading({
                isLoading: true
            }))
            const res = await getDataWeb().catch(err => console.log(err));
            if (res) {
                setData(res);
            }
        };
        fetchData();
    }, [])

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.box}>
                            <div className="text-dashboard">
                                <p className={classes.paragraph}>Viewers</p>
                                <span className={classes.span}>{data.views}</span>
                                {/* <span className={classes.span2}>10% <ArrowUpwardIcon fontSize="small" /></span> */}
                            </div>
                            <div className={classes.icon}>
                                <BarChartIcon fontSize="large" style={{ fontSize: '70px' }} />
                                {/* <BarChartIcon fontSize="large" style={{ fontSize: '70px'}}/> */}
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.box}>
                            <div className="text-dashboard">
                                <p className={classes.paragraph}>Article</p>
                                <span className={classes.span}>{data.article}</span>
                                {/* <span className={classes.span2}>10% <ArrowUpwardIcon fontSize="small" /></span> */}
                            </div>
                            <div className={classes.icon}>
                                <BarChartIcon fontSize="large" style={{ fontSize: '70px' }} />
                                {/* <BarChartIcon fontSize="large" /> */}
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                        <div className={classes.box}>
                            <div className="text-dashboard">
                                <p className={classes.paragraph}>Comments</p>
                                <span className={classes.span}>{data.comment}</span>
                                {/* <span className={classes.span2}>10% <ArrowUpwardIcon fontSize="small" /></span> */}
                            </div>
                            <div className={classes.icon}>
                                <BarChartIcon fontSize="large" style={{ fontSize: '70px' }} />
                                {/* <BarChartIcon fontSize="large" /> */}
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>

            <Chart data_chart={data.chart}/>
        </div>
    )
}
const reduxState = (state) => ({
    isLoading: state.loading.isLoading
})

const reduxDispatch = (dispatch) => ({
    getDataWeb: () => dispatch(getAllData())
})

export default connect(reduxState, reduxDispatch)(withRouter(CardCount));

