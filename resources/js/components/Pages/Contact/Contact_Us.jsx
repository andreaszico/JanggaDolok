import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import './contact_us.css';
import PhoneIcon from '@material-ui/icons/Phone';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: "center",
        background: 'white',
        marginTop: '17vh',
    },
    heading: {
        fontWeight: '700'
    }
}));

function Contact_Us() {
    
    const classes = useStyles();


    return (
        <Container maxWidth="lg" className={classes.paper}>
            <Grid container spacing={0}>
                <div className="box-contact">
                    <h1>Hubungi Kami</h1><br/><br/>
                    <h5 className={classes.heading}>No Telepon</h5>
                    <a href="https://wa.me/6281362398993">
                        <span>
                        <PhoneIcon /> +62 813 6239 8993
                        </span>
                    </a> <br/><br/>
                    <h5 className={classes.heading}>Alamat Email</h5>
                    <a href="mailto:janggadolok@gmail.com"><MailIcon /> &nbsp;janggadolok@gmail.com</a>
                </div>
            </Grid>
        </Container>
    )
}

export default Contact_Us
