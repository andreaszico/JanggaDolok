import {
    Button,
    createMuiTheme,
    makeStyles,
    TextField,
    ThemeProvider
} from '@material-ui/core'

import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postComment } from '../../redux/action';
import { useForm } from '../../Utils/Utils';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0),
        marginTop: '10px',
        width: 150
    },
}));
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#039a4e',
            dark: '#002884',
            contrastText: '#fff',
        },
    },
});
function Form_Comment({ isLoading, article_id, postComment, parent_id=null }) {
    const classes = useStyles();

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        username: '',
        comment: ''
    });

    function loginUserCallback() {
        userPostComment();
    }

    const userPostComment = async (e) => {
        e.preventDefault();
        const sendData = {
            'id' : article_id,
            'parent_id' : parent_id,
            'email' : values.email,
            'username' : values.username,
            'comment' : values.comment
        }
        const res = await postComment( sendData ).catch(err => err)
        if(res){
            location.reload();
        }
    }
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div className="form-controls">
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined"
                    name="email" 
                    onChange={onChange}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined"
                    name="username" 
                    onChange={onChange}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    name="comment"
                    onChange={onChange}
                />
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.margin}
                        onClick={userPostComment}
                        onSubmit={onSubmit}
                    >
                        Kirim
                    </Button>
                </ThemeProvider>
            </div>
        </form>
    )
}
const reduxState = (state) => ({
    isLoading: state.comment.isLoading,
    
})

const reduxDispatch = (dispatch) => ({
    postComment: (data) => dispatch(postComment(data))
})

export default connect(reduxState, reduxDispatch)(withRouter(Form_Comment));
