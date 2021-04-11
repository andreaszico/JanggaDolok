import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { loginFacebookCallback } from '../../redux/action/SocialAction';
import { setLoading } from '../../redux/reducer/LoadingReducer';
import Loading from '../Loading/Loading';


function CallbackFacebook({ isLoading, location, loginSocialite, user }) {
    const dispatch = useDispatch();
    
    const [role, setRole] = useState('');

    useEffect(() => {
        const data = {
            params: location.search
        }
        async function fetchData() {
            dispatch(setLoading({
                isLoading: true
            }));
            const res = await loginSocialite(data).catch(err => console.error(err));
            if (res.isLoggedIn) {
                setRole('')
            }
        }

        fetchData();
    }, [])

    return (
        <>
            { isLoading ? (
                <Loading/>
            ) : (
                <Route
                        render={props => user.user && user.user.data.isLoggedIn ?
                        <Redirect to={`/dashboard/${user.user.data.user.role}`} /> : ''
                        }
                    >

                </Route>
            )
            }
        </>
    )
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading,
    user: state.user
})

const reduxDispatch = (dispatch) => ({
    loginSocialite: (data) => dispatch(loginFacebookCallback(data))
})

export default connect(reduxState, reduxDispatch)(withRouter(CallbackFacebook));

