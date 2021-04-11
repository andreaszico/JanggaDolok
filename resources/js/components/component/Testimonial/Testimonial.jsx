import React from 'react';
import './testimonial.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import SliderTestimonial from './SliderTestimonial';
import 'react-animated-slider/build/horizontal.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 450,
        width: 525,
        boxShadow: 'none',
        background: 'transparent'
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function Testimonial() {
    const classes = useStyles();

    return (
        <div className="card-testimonial" style={{ marginTop: 250, marginBottom: 100 }}>
            <Grid container className={classes.root} spacing={2} style={{ marginTop: 20 }}>
                <Grid item lg={12}>
                    <Grid container justify="center" spacing={2}>
                        <Grid key={1} item lg={6}>
                            <Paper className={classes.paper + " content-paper"}>
                                <div>
                                    <p className="paper-title">Testimonial</p>
                                    <span className="paper-heading-1">What's the people</span>
                                    <p className="paper-heading-2">Say About Us</p>
                                </div>
                                <div className="slider-testimonials">
                                    <SliderTestimonial />
                                </div>
                            </Paper>
                        </Grid>
                        <Grid className="grid-image-testimonial" key={2} item lg={6} padding={2}>
                            <Paper className={classes.paper}>
                                <div className="image-testimonial">
                                    <img src="https://www.tirtoutomo.org/wp-content/uploads/2018/10/IMG_8587-1200x800.jpg" alt="" />
                                    <img src="https://www.tirtoutomo.org/wp-content/uploads/2018/10/IMG_8587-1200x800.jpg" alt="" />
                                    <img src="https://www.tirtoutomo.org/wp-content/uploads/2018/10/IMG_8587-1200x800.jpg" alt="" />
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Testimonial
