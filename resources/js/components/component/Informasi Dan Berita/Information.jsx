import React, { useEffect, useState } from 'react';
import './information.css';
import { Link, withRouter } from 'react-router-dom';
import {
    connect,
    useDispatch
} from 'react-redux';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { truncate } from '../../Utils/Utils';
import { getArticle, getDataArticle } from '../../redux/action';
import { setLoading } from '../../redux/reducer/articleReducer';

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
function Information({ getDataArticles }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [postNews, setPostNews] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            dispatch(setLoading({
                isLoading: true
            }))
            const res = await getDataArticles().catch(err => console.log(err))
            if (res) {
                setPostNews(res);
            }
        };
        fetchData();
    }, [])

    return (
        <>
            <Grid item xs={12} key={1}>
                <Paper className="heading-card">INFORMASI DAN BERITA</Paper>
            </Grid>
            <Grid container key={2} wrap='wrap' className={classes.root} spacing={2} style={{ marginTop: 20 }}>
                <Grid item xl={12}>
                    <Grid container wrap='wrap' justify="center" spacing={3}>
                        {postNews && postNews.map((value, index) => (
                            <Grid key={index} item>
                                <Paper className={classes.paper}>
                                    <div className="image-card">
                                        <img
                                            src={`/uploads/${value.image}`}
                                            alt=''
                                        />
                                    </div>
                                    <div className="content-card image-card-content">
                                        <p className="title-text">{value.title}</p>
                                        <p className="content-text">{moment(value.created_at).fromNow()}<br/><br/><p dangerouslySetInnerHTML={{ __html: truncate(value.content, 150)}}></p></p>
                                        <Link to={`/article/${value.slug}`}>
                                            <Button className="button-card">
                                                Read More
                                            </Button>
                                        </Link>
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

const reduxState = (state) => ({
    isLoading: state.loading.isLoading
})

const reduxDispatch = (dispatch) => ({
    getDataArticles: () => dispatch(getDataArticle())
})

export default connect(reduxState, reduxDispatch)(withRouter(Information));

