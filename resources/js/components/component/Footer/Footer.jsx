import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './footer.css';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden'
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: 100 + '%',
        height: 'auto',
        boxShadow: 'none'
    },
}));
function Footer() {

    const classes = useStyles();
    return (
        <div className="footer">
            <div className={classes.root}>
                <Grid container spacing={1} wrap='wrap'>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <div className="about__footer">
                                <h3>TENTANG KAMI</h3>
                                <p>
                                    Desa Jangga adalah sebuah desa yang teletak di kecamatan Lumban Julu, kabupaten Toba. Desa ini berjarak 1km dari jalan raya yang dikelilingi dengan hamparan sawah dan bukit-bukit yang luas. Desa ini telah ditetapkan sebagai desa wisata pada tahun 2018 dan sudah dikunjungi oleh turis-turis Eropa dan Eco Tourisemt.
                                </p>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.paper}>
                            <div className="address__footer">
                                <h3>ALAMAT</h3>
                                <p>
                                    Jangga Dolok <br />
                                    Lumban Julu, Kabupaten Toba <br />
                                    Samosir, Sumatera Utara, 22386
                                </p>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.paper}>
                            <div className="address__footer">
                                <h3>CONTACT</h3>
                                <p>
                                    +62 813-6239-8993 <br />
                                    janggadolok@gmail.com <br />
                                </p>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <div className="image__footer">
                                <img src="https://i.postimg.cc/N0dQGq7y/Logo-White.png" />
                                <img src="https://i.postimg.cc/5tBm9tXM/Logo-IT-Del.png" />
                            </div>
                            <p className="copyright">Copyright @2020</p>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
