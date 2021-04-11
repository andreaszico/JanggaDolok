import React, { useEffect, useState } from 'react';
import { Fab, Grid, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Sidebar from '../../../../component/Sidebar/Sidebar'
import './articleAdmin.css'
import Search from '../../../../component/Search/Search';
import AddIcon from '@material-ui/icons/Add';
import { connect, useDispatch } from 'react-redux';
import { setLoading } from '../../../../redux/reducer/LoadingReducer';
import { searchArticle } from '../../../../redux/action';
import CardPost from '../../../../component/CardPost/CardPost';
import Loading from '../../../../component/Loading/Loading';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import { setArticle } from '../../../../redux/reducer/articleReducer';
import WrapperDashboard from '../../../../component/Wrapper/WrapperDashboard';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
    grid: {
        flexGrow: 1,
        marginTop: '50px',
        minHeight: '100vh',
        position: 'relative'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    pagination: {
        marginTop: '20px'
    }
}));

function ArticleAdmin({ loading, getArticles, article=[], paginate }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            dispatch(setArticle({
                article: [],
                paginate: {
                    last_page: 1
                }
            }))
            dispatch(setLoading({
                isLoading: true
            }))
            const res = await getArticles({
                search: 'a'
            }).catch(err => console.log(err))
        };
        fetchData();
    }, [])

    const handlePageChange = (event, value) => {
        console.log(value)
    }


    return (
        <WrapperDashboard>
            <h1 className="heading-page">DAFTAR ARTIKEL</h1>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Search />
                    <Pagination
                        count={paginate.last_page}
                        color="primary"
                        className={classes.pagination}
                        size='large'
                        onChange={handlePageChange}
                    />
                </Grid>
            </Grid>
            <div className={classes.grid}>
                {
                    loading ? (
                        <Loading />
                    ) : (
                            <Grid container spacing={3}>
                                {
                                    article.length === 0 ? <i style={{ marginLeft: '30px'}}>No Result Found</i> : article.map((item, key) => (
                                        <Grid item xs={12} sm={3} key={key}>
                                            <CardPost
                                                id={item.id}
                                                title={item.title}
                                                content={item.content}
                                                slug={item.slug}
                                                image={item.image}
                                            />
                                        </Grid>
                                    ))
                                }


                            </Grid>
                        )
                }
            </div>
            <Link to='/dashboard/create'>
                <Tooltip title="Tambah Artikel" aria-label="add">
                    <Fab color="primary" aria-label="add" className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Link>
        </WrapperDashboard>
    )
}

const reduxState = (state) => ({
    loading: state.loading.isLoading,
    article: state.article.article,
    paginate: state.article.paginate
})

const reduxDispatch = (dispatch) => ({
    getArticles: (data) => dispatch(searchArticle(data))
})

export default connect(reduxState, reduxDispatch)(ArticleAdmin);
