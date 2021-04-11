import axios from 'axios';

import {
    setLoading
} from '../reducer/LoadingReducer';
import { setUser } from '../reducer/loginReducer';

export const loginSocial = () => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        axios.get(`/api/v1/auth/login/provider/`, { 
            headers: new Headers({ 
                accept: 'application/json' 
            }) 
        }).then(response => {
            return response;
        }).then(json => {
            resolve(json.data);
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                }
                reject(errors);
            }
        })
    })
}
export const loginSocialCallback = (data) => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        axios.get(`/api/v1/auth/login/google/callback${data.params}`, { 
            headers: new Headers({ 
                accept: 'application/json' 
            }) 
        }).then(response => {
            return response;
        }).then(json => {
            let appState = {
                isLoggedIn: true,
                provider_user: json.data.provider_user,
                expires_token: json.data.expires_at,
                access_token: json.data.access_token,
                token_type: json.data.token_type,
                user: json.data.user
            };
            localStorage.setItem('users', JSON.stringify(appState));
            resolve(appState);
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                }
                reject(errors);
            }
        })
    })
}
export const loginFacebookCallback = (data) => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        axios.get(`/api/v1/auth/login/facebook/callback${data.params}`, { 
            headers: new Headers({ 
                accept: 'application/json' 
            }) 
        }).then(response => {
            return response;
        }).then(json => {
            let appState = {
                isLoggedIn: true,
                provider_user: json.data.provider_user,
                expires_token: json.data.expires_at,
                access_token: json.data.access_token,
                token_type: json.data.token_type,
                user: json.data.user
            };
            localStorage.setItem('users', JSON.stringify(appState));
            dispatch(setLoading({
                isLoading: false
            }))
            dispatch(setUser({
                user: {
                    data: appState
                }
            }))
            resolve(appState);
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                }
                reject(errors);
            }
        })
    })
}