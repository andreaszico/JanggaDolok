import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { truncate } from '../../Utils/Utils'
import './cardPost.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDataUser } from '../../redux/reducer/loginReducer';
import { Button } from '@material-ui/core';
import SweetAlerts from '../SweetAlerts/SweetAlerts';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    CardContent: {
        '&:hover': {
            background: "transparant",
            color: 'black'
        },
        '&:hover::after': {
            background: "transparant",
            color: 'black'
        },
        '&:hover::before': {
            background: "transparant",
            color: 'black'
        }
    },
    Typography:{
        fontWeight: '700'
    }
});



export const CardPost = ({ id, title, content, slug, image }) => {
    const classes = useStyles();
    const [user, setUser] = useState('');
    const dispatch = useDispatch();
    let location = useLocation();
    const ref = (location.pathname.split("/"));

    useEffect(() => {
        const users = dispatch(getDataUser());
        setUser(users.user.role)
    }, [])

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={`/uploads/${image}`}
                />
                <CardContent
                    className={classes.CardContent}
                >
                    <Typography gutterBottom component="h5" className={classes.Typography}>
                        {title}
                    </Typography>
                    <Typography paragraph={true} color="textSecondary" component="p" dangerouslySetInnerHTML={{ __html: truncate(content, 100) }}>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardAction}>
                <Link to={`/article/${slug}`}>
                    <Button variant="contained" color="primary">
                        Read More
                    </Button>
                </Link>
                {
                    user && user === "admin" ? (
                        ref[1] === "dashboard" ? (
                            <SweetAlerts id={id} slug={slug} />
                        ) : null
                    ) : null
                }
            </CardActions>
        </Card>
    )
}

export default CardPost

