import React from 'react'
import swal from '@sweetalert/with-react'
import { Button, ListItemIcon, Typography } from '@material-ui/core'
import { connect, useDispatch } from 'react-redux';
import { setLoading } from '../../redux/reducer/LoadingReducer';
import { deleteArticle } from '../../redux/action';
import { Link, useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './SweetAlerts.css'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    ListItemIcon: {
        minWidth: '30px'
    },
    Menu: {
        background: '#28abb9',
        '&:hover': {
            background: "#28abb9",
        }
    }
}));

function SweetAlerts({ id, slug, deleteArticle }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const Sweet = async () => {
        setAnchorEl(null);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    dispatch(setLoading({
                        isLoading: true
                    }))
                    const res = await deleteArticle(id).catch(err => err);

                    if (res.success) {

                        swal(res.message, {
                            icon: "success",
                        }).then((res) => {
                            if (res) {
                                dispatch(setLoading({
                                    isLoading: false
                                }))
                                location.reload();
                            }
                        })
                    } else {
                        swal("Article Gagal Dihapus", {
                            icon: "warning",
                        }).then((res) => {
                            if (res) {
                                dispatch(setLoading({
                                    isLoading: false
                                }))
                                history.push('/dashboard/article');
                            }
                        })
                    }

                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.Menu}
            >
                Action
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={Sweet}>
                    <ListItemIcon className={classes.ListItemIcon}>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Delete</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon className={classes.ListItemIcon}>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">
                        <Link to={`/dashboard/update/${slug}`}>
                            Edit
                        </Link>
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    )
}

const reduxState = (state) => ({
    loading: state.loading.isLoading,
})

const reduxDispatch = (dispatch) => ({
    deleteArticle: (data) => dispatch(deleteArticle(data))
})

export default connect(reduxState, reduxDispatch)(SweetAlerts);

