import React, { useEffect, useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 550,
        width: 350,
    },
    control: {
        padding: theme.spacing(2),
    },
}));
function Card({ data, title }) {
    const classes = useStyles();
    const [postNews, setPostNews] = useState({});

    useEffect(() => {
        // async function fetchData() {
        //     await fetch('http://newsapi.org/v2/everything?q=bitcoin&from=2020-10-11&sortBy=publishedAt&apiKey=dc4f9c8746754635b86580b6f4215534')
        //         .then(res => { 
        //             return res.json();
        //         })
        //         .then(data => {
        //             setPostNews(data);
        //         })
        //         .catch(err => console.log(err))
        // }

        // fetchData();
    }, [])


    return (
        <>
            <Grid item xs={12} key={1}>
                <Paper className="heading-card">{title}</Paper>
            </Grid>
            <Grid container key={2} className={classes.root} spacing={2} style={{ marginTop: 20 }}>
                <Grid item xl={12}>
                    <Grid container justify="center" spacing={3}>
                        {data && data.map((value) => ( 
                            <Grid key={value.id} item>
                                <Paper className={classes.paper}>
                                    <div className="image-card">
                                        <img
                                            src={value.image}
                                            alt={value.title}
                                            className={value.title === 'Sawah Dan Pegunungan' ? 'image-scale' : 'image-default'}
                                        />
                                    </div>
                                    <div className="content-card">
                                        <p className="title-text-card">{value.title}</p>
                                        <p className="content-text-card">{value.content}</p>
                                        <Button className="button-card">
                                            Read More
                                        </Button>
                                    </div>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Card
