import { Container, makeStyles } from '@material-ui/core'
import Grid from "@material-ui/core/Grid";
import React from 'react'
import { useEffect } from 'react';
import {
    connect
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getArticle } from '../../redux/action';
import { store } from '../../redux/store/store';
import Loading from '../../component/Loading/Loading';
import { useState } from 'react';
import './about.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    heading: {
        fontWeight: '800'
    },
    imageL: {
        width: '50%',
    },
    grid: {
        justifyContent: 'center'
    }
}));

function About({ isLoading, getArticles }) {
    const classes = useStyles();
    const [article, setArticle] = useState([]);

    useEffect(() => {
        async function fetchData() {
            store.dispatch(setLoading({
                isLoading: true
            }))
            const res = await getArticles().catch(err => console.log(err))
            if (res) {
                setArticle(res.data)
            }
        };
        fetchData();
    }, [])

    return isLoading ? (
        <>
            <Loading />
            <div className="article" style={{ minHeight: '300vh', marginTop: '15vh' }}>
            </div>
        </>
    ) : (
            <div className="article" style={{ minHeight: '100vh', marginTop: '17vh' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid container spacing={3} className="grid-example">
                            <Grid item xs={12} className={classes.grid}>
                                <div className="grid-about">
                                    <h1 className={classes.heading}>TENTANG KAMI</h1>
                                    <img
                                        className={classes.imageL}
                                        src="/uploads/About_Image.jpg" alt=""
                                    />
                                    <div className="text_about">
                                        <h4 className={classes.heading}>GEOGRAFIS</h4>
                                        <p>
                                            Desa Jangga Dolok adalah Salah satu desa wisata yang ada di Kecamatan Lumbanjulu, Kabupaten Toba, Provinsi Sumatera Utara, Indonesia. Desa ini berjarak sekitar 40 Km dari kota Balige. Jika ingin mengunjunginya, wisatawan dapat menggunakan transportasi umum kurang lebih selama 1jam. Kemudian wisatawan harus berjalan kaki dari jalan raya dan menuruni jalan yang sudah beraspal mulus, dengan waktu tempuh kurang ih 30 menit hingga tiba didesa jangga dolok.
                                        </p>
                                        <br/>
                                        <h4 className={classes.heading}>PENDUDUK</h4>
                                        <p>
                                            Desa jangga dolok memiliki 3 dusun dengan jumlah penduduk sebanyak 540 dan jumlah KK sebanyak 254. Mayoritas penduduk desa berpenghasilan sebagai petani.
                                        </p>
                                        
                                        <br/>
                                        <h4 className={classes.heading}>PEMERINTAHAN</h4>
                                        <p>
                                        Kepala Desa Jangga Dolok saat ini adalah Rahmat B Manurung
                                        </p>
                                        <br/>
                                        <h4 className={classes.heading}>FESTIVAL</h4>
                                        <p>
                                        Desa jangga mengadakan Festival tahunan yang bernama Harvest Festival (Panen Raya), kegiatan ini diadakan pada masa panen padi sekitar bulan juni-agustus. Para petani akan turun kesawah dan memanen padi secara bersamaan. Biasanya kegiatan ini banyak dihadiri oleh wisatawan lokal dan juga wisatawan mancanegara.
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading,
})

const reduxDispatch = (dispatch) => ({
    getArticles: () => dispatch(getArticle()),
})

export default connect(reduxState, reduxDispatch)(withRouter(About));

