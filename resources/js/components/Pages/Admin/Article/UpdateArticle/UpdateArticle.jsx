import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Sidebar from '../../../../component/Sidebar/Sidebar';
import Loading from '../../../../component/Loading/Loading';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { useForm } from '../../../../Utils/Utils';
import { connect } from 'react-redux';
import { getSingleArticle, UpdateSingleArticle } from '../../../../redux/action';
import { setLoading } from '../../../../redux/reducer/LoadingReducer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: 'Poppins',
        fontWeight: theme.typography.fontWeightBold
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
    grid: {
        flexGrow: 1,
        marginTop: '50px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    }
}));

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
}

const format = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

function UpdateArticle({ isLoading, match, UpdateSingleArticle, getSingleArticles }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const slug = match.params.slug;
    let history = useHistory();

    const [text, setText] = useState('');
    const [image, setImage] = useState();
    const [file, setFile] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        async function fetchData() {
            dispatch(setLoading({
                isLoading: true
            }))
            const singlePost = await getSingleArticles(slug).catch(err => console.log(err));
            if (singlePost) {
                setTitle(singlePost.data.title);
                setImage(singlePost.data.image);
                setText(singlePost.data.content)
            }
        };
        fetchData();
    }, [slug])

    const { onChange, onSubmit, values } = useForm(createPostCallback, {
        title: '',
    });

    function createPostCallback() {
        UpdateArticles();
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const onChangeHandle = (e) => {
        setText(e);
    }
    const onChangeFile = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        setImage(files[0])
        setFile(URL.createObjectURL(files[0]));
    }

    const UpdateArticles = async () => {
        var formdata = new FormData();
        formdata.append('image', image);
        formdata.append('title', title);
        formdata.append('content', text);
        const res = await UpdateSingleArticle(formdata, slug).catch(err => err)
        if (res.success) {
            swal({
                title: "sGood job!",
                text: res.message,
                icon: "success",
                button: "Lihat Artikel",
            }).then((res) => {
                if(res){
                    history.push('/dashboard/article')
                }
            })
        }
    }
    return (
        <div className={classes.root}>
            <Sidebar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className="heading-page">EDIT ARTIKEL</h1>
                {
                    isLoading ? (<Loading />) : (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <form onSubmit={onSubmit} encType="multipart/form-data">
                                    <Paper className={classes.paper}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Title"
                                            variant="outlined"
                                            name="title"
                                            onChange={onChangeTitle}
                                            // defaultValue={title}
                                            value={
                                                title
                                            }
                                        />
                                        <img
                                            src={`/uploads/${image}`}
                                            alt=""
                                            style={{
                                                objectFit: 'contain',
                                                marginTop: '30px',
                                                marginBottom: '30px',
                                            }}
                                        />
                                        <Button
                                            style={{ marginTop: '20px' }}
                                            variant="contained"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Image
                                    <input
                                                type="file"
                                                name="image"
                                                onChange={onChangeFile}
                                                hidden
                                            />
                                        </Button>
                                        <ReactQuill
                                            style={{ marginTop: '20px' }}
                                            theme="snow"
                                            modules={modules}
                                            formats={format}
                                            value={text}
                                            onChange={(e) => onChangeHandle(e)}
                                        />
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.button}
                                            onClick={UpdateArticles}
                                            onSubmit={onSubmit}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Edit Article
                                </Button>
                                    </Paper>
                                </form>
                            </Grid>
                        </Grid>
                    )
                }
            </main>
        </div >
    )
}
const reduxState = (state) => ({
    isLoading: state.loading.isLoading,

})

const reduxDispatch = (dispatch) => ({
    UpdateSingleArticle: (data, slug) => dispatch(UpdateSingleArticle(data, slug)),
    getSingleArticles: (data) => dispatch(getSingleArticle(data)),
})

export default connect(reduxState, reduxDispatch)(withRouter(UpdateArticle));
