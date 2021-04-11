import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Sidebar from '../../../../component/Sidebar/Sidebar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { useForm } from '../../../../Utils/Utils';
import { connect } from 'react-redux';
import { storeArticle } from '../../../../redux/action';
import swal from '@sweetalert/with-react'
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

function CreateArticle({ storeArticle }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();
    const [text, setText] = useState('');
    const [image, setImage] = useState();
    const [file, setFile] = useState();

    const { onChange, onSubmit, values } = useForm(createPostCallback, {
        title: '',
    });

    function createPostCallback() {
        PostArticle();
    }

    const onChangeHandle = (e) => {
        setText(e);
    }
    const onChangeFile = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        setImage(files[0]);
        setFile(URL.createObjectURL(e.target.files[0]))
        
    }

    const PostArticle = async () => {
        var formdata = new FormData();
        formdata.append('image', image);
        formdata.append('title', values.title);
        formdata.append('content', text);
        const res = await storeArticle(formdata).catch(err => err)
        if (res.success) {
            swal({
                title: "Good job!",
                text: res.message,
                icon: "success",
                button: "Lihat Artikel",
            }).then((res) => {
                if (res) {
                    history.push('/dashboard/article')
                }
            })
        }
    }
    return (
        <WrapperDashboard>
            <h1 className="heading-page">TAMBAH ARTIKEL</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <Paper className={classes.paper}>
                            <TextField
                                id="outlined-basic"
                                label="Title"
                                variant="outlined"
                                name="title"
                                onChange={onChange}
                            />
                            <img
                                src={file}
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
                                onClick={PostArticle}
                                onSubmit={onSubmit}
                                startIcon={<CloudUploadIcon />}
                            >
                                Tambah Article
                                </Button>
                        </Paper>
                    </form>
                </Grid>
            </Grid>
        </WrapperDashboard>
    )
}
const reduxState = (state) => ({
    isLoading: state.comment.isLoading,

})

const reduxDispatch = (dispatch) => ({
    storeArticle: (data) => dispatch(storeArticle(data))
})

export default connect(reduxState, reduxDispatch)(withRouter(CreateArticle));
