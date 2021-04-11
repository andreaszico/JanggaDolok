import { Container, makeStyles } from '@material-ui/core'
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from 'react'
import { getArticle, getDataArticle, getSingleArticle } from '../../../redux/action';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../../../component/Loading/Loading';
import { store } from '../../../redux/store/store'
import { setLoading } from '../../../redux/reducer/LoadingReducer';
import { CardPost } from '../../../component/CardPost/CardPost';
import Comments from '../../../component/Comments/comments';
import Form_Comment from '../../../component/Form_Comment/Form_Comment';
import { compose } from '@reduxjs/toolkit';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));
function SingleArticle(props) {
    const classes = useStyles();
    const slug = props.match.params.postSlug;
    const [article, setArticle] = useState({
        comments: []
    });
    const [cardPost, setCardPost] = useState([]);

    useEffect(() => {
        async function fetchData() {
            store.dispatch(setLoading({
                isLoading: true
            }))
            const singlePost = await props.getSingleArticles(slug).catch(err => console.log(err));
            if (singlePost) {
                setArticle(singlePost.data);
            }
        };
        fetchData();
    }, [slug])

    useEffect(() => {
        async function fetchData() {
            store.dispatch(setLoading({
                isLoading: true
            }))
            const cardPosts = await props.getArticles().catch(err => console.log(err));
            if (cardPosts) {
                setCardPost(cardPosts)
            }
        };
        fetchData();
    }, [slug])

    return props.isLoading ? (
        <div className="article" style={{ minHeight: '300vh', marginTop: '15vh' }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Loading />
                    </Grid>
                </Grid>
            </Container>
        </div>
    ) : (
            <div style={{ marginTop: '20vh' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <Paper className={classes.paper} style={{ minHeight: "100vh" }}>
                                <img className="image_single_article" src={`/uploads/${article.image}`} alt={article.image} />
                                <div className="body-article">
                                    <h2>{article.title}</h2>
                                    {article.content && article.content.split('\n').map((item, key) => (
                                        <p key={key} dangerouslySetInnerHTML={{ __html: item}}/>
                                    ))}
                                </div>
                                <div className="form-comments">
                                    <h2>COMMENT</h2>
                                    <div className="single-post__comment">
                                        {article.comments.length === 0 ? <p style={{ textAlign: 'left', fontStyle: 'italic'}}>No Comments</p> : article.comments.map((item, key) => (
                                            <Comments key={key} item={item} article_id={article.id}/>
                                        ))}
                                    </div>
                                    {
                                        props.reply ? ('') : (

                                            <div className="single-post__comment__form">
                                                {article.id && 
                                                    <Form_Comment  
                                                        article_id={article.id}
                                                    />
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <h3>ARTIKEL LAIN</h3>
                            {
                                cardPost && cardPost.map((item, key) => (
                                    article.id === item.id ? (
                                        ' '
                                    ) : (<CardPost title={item.title} key={key} content={item.content} slug={item.slug} image={item.image} />)
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
    reply: state.comment.reply
})

const reduxDispatch = (dispatch) => ({
    getSingleArticles: (data) => dispatch(getSingleArticle(data)),
    getArticles: () => dispatch(getDataArticle()),
})

export default connect(reduxState, reduxDispatch)(withRouter(SingleArticle));

