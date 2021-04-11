import { Grid } from '@material-ui/core';
import React from 'react'
import './maps.css';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 550,
        width: '100vw',
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function Maps() {

    const classes = useStyles();
    return (
        <div className="maps">
            <h1>KUNJUNGI KAMI</h1>
            <Grid container key={2} wrap='wrap' className={classes.root} spacing={2} style={{ marginTop: 20 }}>
                <Grid item xl={12}>
                    <Grid container wrap='wrap' justify="center" spacing={3}>
                        <Grid key={1} item>
                            <Paper className={classes.paper}>
                                <iframe tabIndex={2} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31886.242185591134!2d99.05137381822834!3d2.5780028797802452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031fa706e04b3fd%3A0xac53ac2caf514e77!2sJangga%20Dolok%2C%20Lumban%20Julu%2C%20Kabupaten%20Toba%20Samosir%2C%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1605251111536!5m2!1sid!2sid" frameBorder={0} style={{ border: 0 }} allowFullScreen={true} aria-hidden={"false"} ></iframe>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Maps
