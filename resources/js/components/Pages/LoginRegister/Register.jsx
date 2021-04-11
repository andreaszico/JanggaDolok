import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../../component/Loading/Loading';
import { makeStyles } from '@material-ui/core/styles';
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import './Register.css';
import clsx from 'clsx';
import { ErrorMessage } from "@hookform/error-message";
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { SignUpUserAPI } from '../../redux/action';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none',

    },
    Grid: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    TextField: {
        width: '300px'
    },
    TextFieldEmail: {
        width: '100%',
    },
    margin: {
        margin: theme.spacing(0),
        marginTop: '20px'
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    formTextField: {
        display: 'flex',
        flexDirection: 'column',
    },
    formTextFields: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%"
    }
}));
function Register({ isLoading, signUpAPI }) {
    const classes = useStyles();

    const [valueForm, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const { register, errors, handleSubmit, control, watch } = useForm({
        criteriaMode: "all"
    });

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data) => {
        const res = await signUpAPI(data).catch(err => err)
        if(res){
            location.reload();
        }   
    }

    const handleClickShowPassword = () => {
        setValues({ ...valueForm, showPassword: !valueForm.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : ('')}
            <div className="content-login">
                <div className="title-register">
                    <h1 className="head-title-login">DESA  <br />JANGGA DOLOK</h1>
                    <p className="content-title-login">
                        Desa Jangga adalah sebuah desa yang teletak di kecamatan Lumban Julu, kabupaten Toba. Desa ini berjarak 1km dari
                        jalan raya yang dikelilingi dengan hamparan sawah dan bukit-bukit yang luas. Desa ini telah ditetapkan
                                    sebagai desa wisata pada tahun 2018 dan sudah dikunjungi oleh turis-turis Eropa dan Eco Tourisemt.</p>
                    <Link to="/">
                        <button>BACK TO HOME</button>
                    </Link>
                </div>
                <div className="box__form__register">
                    <div className="form">
                        <h3>REGISTER</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="form">
                            <Grid container justify="center">
                                <Grid
                                    item
                                    xs={10}
                                    className={classes.Grid}
                                >
                                    <div className={classes.formTextField}>
                                        <TextField
                                            error={
                                                errors.first_name ? true : false
                                            }
                                            id="outlined-required"
                                            label="Nama Depan"
                                            rowsMax={4}
                                            name="first_name"
                                            variant="outlined"
                                            className={classes.TextField}
                                            inputRef={
                                                register({
                                                    required: "Input nama tidak boleh kosong",
                                                })
                                            }
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="first_name"
                                            render={({ messages }) => {
                                        
                                                return messages
                                                    ? _.entries(messages).map(([type, message]) => (
                                                        <span className="errors__message" key={type}><ErrorOutlineIcon fontSize="small" /> {message}</span>
                                                    ))
                                                    : null;
                                            }}
                                        />
                                    </div>
                                    <div className={classes.formTextField}>
                                        <TextField
                                            error={
                                                errors.last_name ? true : false
                                            }
                                            id="outlined-required"
                                            label="Nama Belakang"
                                            variant="outlined"
                                            name="last_name"
                                            className={classes.TextField}
                                            inputRef={
                                                register({
                                                    required: "Input nama tidak boleh kosong",
                                                })
                                            }
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="last_name"
                                            render={({ messages }) => {
                                        
                                                return messages
                                                    ? _.entries(messages).map(([type, message]) => (
                                                        <span className="errors__message" key={type}><ErrorOutlineIcon fontSize="small" /> {message}</span>
                                                    ))
                                                    : null;
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={10} className={classes.Grid}>
                                    <div className={classes.formTextFields}>
                                        <TextField
                                            error={
                                                errors.email ? true : false
                                            }
                                            id="outlined-required"
                                            label="Email Address"
                                            name="email"
                                            variant="outlined"
                                            className={classes.TextFieldEmail}
                                            inputRef={
                                                register({
                                                    required: "Input Email tidak boleh kosong",
                                                    pattern: {
                                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                                        message: "Email yang digunakan tidak valid"
                                                    },
                                                })
                                            }
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="email"
                                            render={({ messages }) => {
                                        
                                                return messages
                                                    ? _.entries(messages).map(([type, message]) => (
                                                        <span className="errors__message" key={type}><ErrorOutlineIcon fontSize="small" /> {message}</span>
                                                    ))
                                                    : null;
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={10} className={classes.Grid}>
                                    <div className={classes.formTextField}>
                                        <FormControl className={clsx(classes.margin, classes.TextField)} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                error={
                                                    errors.password ? true : false
                                                }
                                                id="outlined-adornment-password"
                                                type={valueForm.showPassword ? 'text' : 'password'}
                                                className={classes.TextField}
                                                inputRef={
                                                    register({
                                                        required: "Input Password tidak boleh kosong",
                                                        minLength: {
                                                            value: 8,
                                                            message: "Input harus lebih dari 8"
                                                        }
                                                    })
                                                }
                                                name="password"
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {valueForm.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={70}
                                            />
                                        </FormControl>
                                        <ErrorMessage
                                            errors={errors}
                                            name="password"
                                            render={({ messages }) => {
                                        
                                                return messages
                                                    ? _.entries(messages).map(([type, message]) => (
                                                        <span className="errors__message" key={type}><ErrorOutlineIcon fontSize="small" /> {message}</span>
                                                    ))
                                                    : null;
                                            }}
                                        />
                                    </div>

                                    <div className={classes.formTextField}>
                                        <FormControl className={clsx(classes.margin, classes.TextField)} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={valueForm.showPassword ? 'text' : 'password'}
                                                className={classes.TextField}
                                                inputRef={
                                                    register({
                                                        required: "Input Password tidak boleh kosong",
                                                        validate: value =>
                                                            value === password.current || "Password Tidak Sama"
                                                    })
                                                }
                                                error={
                                                    errors.password_confirmation ? true : false
                                                }
                                                name="password_confirmation"
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {valueForm.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={70}
                                            />
                                        </FormControl>
                                        <ErrorMessage
                                            errors={errors}
                                            name="password_confirmation"
                                            render={({ messages }) => {
                                        
                                                return messages
                                                    ? _.entries(messages).map(([type, message]) => (
                                                        <span className="errors__message" key={type}><ErrorOutlineIcon fontSize="small" /> {message}</span>
                                                    ))
                                                    : null;
                                            }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>

                            <button
                                type="submit"
                                className="button-login"
                            >SIGN UP</button>
                        </form>
                    </div>
                    <Link to='/login' className="link-login">
                        Sudah punya akun?
                    </Link>
                </div>
            </div>
        </div>
    )
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading
})

const reduxDispatch = (dispatch) => ({
    signUpAPI: (data) => dispatch(SignUpUserAPI(data)),
})

export default connect(reduxState, reduxDispatch)(withRouter(Register));
