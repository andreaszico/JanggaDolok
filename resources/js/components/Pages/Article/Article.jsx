import { Container, makeStyles } from '@material-ui/core'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import React, { useState } from 'react'
import './article.css';
import { useEffect } from 'react';
import {
    connect
} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getArticle } from '../../redux/action';
import { store } from '../../redux/store/store';
import Loading from '../../component/Loading/Loading';
import { truncate } from '../../Utils/Utils';
import moment from 'moment';
import { setLoading } from '../../redux/reducer/LoadingReducer';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    heading: {
        fontWeight: '700'
    }
}));

function Article({ isLoading, getArticles }) {
    const classes = useStyles();
    const [article, setArticle] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    async function fetchData(page) {
        store.dispatch(setLoading({
            isLoading: true
        }))
        const res = await getArticles(page).catch(err => console.log(err))
        if (res) {
            setArticle(res.data.data);
            setTotalPage(res.data.last_page);
            console.log(res.data);
        }
    };
    useEffect(() => {
        fetchData(page);
    }, [])

    const handleChange = (event, value) => {
        setPage(value);
        fetchData(value);
    }

    return (
        <div className="article" style={{ minHeight: '100vh', marginTop: '15vh' }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid container spacing={3} className="grid-example">
                        <Grid item xs={12}>
                            <h2 className={classes.heading}>ARTIKEL</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <Pagination count={totalPage} page={page} onChange={handleChange} />
                        </Grid>
                        {isLoading ? (
                            <>
                                <Loading />
                            </>
                        ) : article && article.map((item, key) => (
                            <Grid item xs={11} sm={3} key={key}>
                                <Paper className={classes.paper}>
                                    <img className="body__article__img"src={`/uploads/${item.image}`} alt="" />
                                    <div className="body__article">
                                        <h5>{truncate(item.title, 30)}</h5>
                                        <p>{moment(item.created_at).format('Do MMMM YYYY')}</p>
                                        <p dangerouslySetInnerHTML={{ __html: truncate(item.content, 120) }}></p>
                                        <Link to={`/article/${item.slug}`}>Read More</Link>
                                    </div>
                                </Paper>
                            </Grid>
                        ))
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading,
})

const reduxDispatch = (dispatch) => ({
    getArticles: (data) => dispatch(getArticle(data)),
})

export default connect(reduxState, reduxDispatch)(withRouter(Article));

