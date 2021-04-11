import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import './Login.css';
import {
    connect,
    useDispatch
} from 'react-redux';
import { useForm } from '../../Utils/Utils';
import { loginUserAPI } from '../../redux/action';
import { setLoading } from '../../redux/reducer/LoadingReducer';
import Loading from '../../component/Loading/Loading';
import { getDataUser } from '../../redux/reducer/loginReducer';
import { loginSocial } from '../../redux/action/SocialAction';

function Login(props) {
    let arr = [];
    const dispatch = useDispatch();
    const [errorValid, setErrorValid] = useState([]);
    const { history } = props;
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });
    const [providerURL, setProviderURL] = useState({
        google: '',
        facebook: ''
    })

    function loginUserCallback() {
        userSignIn();
    }

    const userSignIn = async () => {
        dispatch(setLoading({
            isLoading: true
        }))
        const res = await props.loginAPI(
            values
        ).catch(err => err)
        if (res.user) {
            location.reload();
        } else {

        }
        res ? (setErrorValid(res)) : setErrorValid([]);
    }


    useEffect(() => {
        const AuthProvided = () => {
            const users = dispatch(getDataUser());
            const { prevLocation } = { prevLocation: { pathname: `/dashboard` } };
            if (prevLocation && props.isLoading) {
                history.push(prevLocation);
            }
        }
        AuthProvided();
    }, [])
    useEffect(() => {
        async function AuthProvidedURL (){
            const res = await props.loginSocialite().catch(err => err);
            if(res){
                setProviderURL(res);
            }
        }
        AuthProvidedURL();
    }, [])

    if (errorValid.errorMessage) {
        let errorMessage = errorValid.errorMessage;
        Object.values(errorMessage).forEach((value) => (
            arr.push(value)
        ));
    }


    return (
        <div className="login">
            {props.isLoading ? (
                <Loading />
            ) : ('')}
            <div className="content-login">
                <div className="title-login">
                    <h1 className="head-title-login">DESA  <br />JANGGA DOLOK</h1>
                    <p className="content-title-login">
                        Desa Jangga adalah sebuah desa yang teletak di kecamatan Lumban Julu, kabupaten Toba. Desa ini berjarak 1km dari
                        jalan raya yang dikelilingi dengan hamparan sawah dan bukit-bukit yang luas. Desa ini telah ditetapkan
                        sebagai desa wisata pada tahun 2018 dan sudah dikunjungi oleh turis-turis Eropa dan Eco Tourisemt.
                    </p>
                    <Link to="/">
                        <button>BACK TO HOME</button>
                    </Link>
                </div>
                <div className="box__form">
                    <div className="form">
                        <h3>LOGIN</h3>
                        <div className="form-group-login">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="login-input-form"
                                name="email"
                                value={values.email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group-login">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="login-input-form"
                                name="password"
                                value={values.password}
                                onChange={onChange}
                            />
                        </div>
                        {
                            errorValid.errorMessage ? (
                                <div className="error-message">
                                    {
                                        arr.map((error, id) => (
                                            <li key={id}>{error}</li>
                                        ))
                                    }
                                </div>
                            ) : ('')
                        }
                        {
                            errorValid.error && errorValid.errorMessage === undefined ? (
                                <div className="error-message">
                                    <li>{errorValid.error}</li>
                                </div>
                            ) : ('')
                        }
                        <button
                            className="button-login"
                            onClick={userSignIn}
                            onSubmit={onSubmit}
                        >SIGN IN</button>
                    </div>
                    {/* <div className="auth-provider">
                        <a href={providerURL.google}>
                            <button className="button-login-provider">
                                <img 
                                    src="https://i.postimg.cc/gcy7512y/512px-Google-G-Logo-svg.png" 
                                    alt=""
                                    
                                />
                                &nbsp;&nbsp;&nbsp; Login with Google
                            </button>
                        </a>
                        <a href={providerURL.facebook}>
                            <button className="button-login-provider" style={{ marginTop: '10px'}}>
                                <img 
                                    src="https://i.postimg.cc/RFvns3Fz/58e91965eb97430e819064f5.png" 
                                    alt=""
                                />
                                &nbsp;&nbsp;&nbsp; Login with Facebook
                            </button>
                        </a>
                    </div>
                    <Link to='/register' className="link-register">
                        Belum punya akun ?
                    </Link> */}
                </div>
            </div>
        </div>
    )
}
const reduxState = (state) => ({
    isLoading: state.loading.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data)),
    loginSocialite: () => dispatch(loginSocial())
})

export default connect(reduxState, reduxDispatch)(withRouter(Login));

