import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import './sidebar.css';
import { Link, withRouter } from 'react-router-dom';
import SidebarTop from './SidebarTop';
import { connect, useDispatch } from 'react-redux';
import { getDataUser, setUser } from '../../redux/reducer/loginReducer';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: 'Poppins',
        fontWeight: theme.typography.fontWeightBold
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        fontFamily: 'Poppins',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        fontFamily: 'Poppins',
    },
    menuButton: {
        marginRight: 0,
        fontFamily: 'Poppins',
    },
    hide: {
        display: 'none',
        fontFamily: 'Poppins',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        fontFamily: 'Poppins',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        fontFamily: 'Poppins',
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up(' ')]: {
            width: theme.spacing(9) + 1,
        },
        fontFamily: 'Poppins',
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
    },
}));

function Sidebar({ getUsersData, user }) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        const res = getUsersData();
        dispatch(setUser({
            user: res.user
        }));
    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className="testsssss">
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <SidebarTop />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        Desa Jangga Dolok
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <div className="logo-drawer">
                        <img src="https://i.postimg.cc/RFCcDcf6/Logo.png" alt="" className={`header-sidebar ${open ? '' : 'clicked'}`} />
                    </div>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <Link to={`/dashboard/admin`}>
                                <ListItemText primary={'Dashboard'} className="list-item-text" />
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <LibraryBooksIcon />
                            </ListItemIcon>
                            <Link to={`/dashboard/article`}>
                                <ListItemText primary={'Article'} className="list-item-text" />
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <Link to={`/dashboard/comment`}>
                                <ListItemText primary={'Comments'} className="list-item-text" />
                            </Link>
                        </ListItem>

                    </List>
                    <Divider />
                </Drawer>
            </div>
        </div>
    );
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading,
    user: state.user.user
})

const reduxDispatch = (dispatch) => ({
    getUsersData: () => dispatch(getDataUser()),
})

export default connect(reduxState, reduxDispatch)(withRouter(Sidebar));