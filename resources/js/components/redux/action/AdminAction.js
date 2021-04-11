import axios from 'axios';
import {
    setLoading as Loading
} from '../reducer/LoadingReducer';
import { getDataUser } from '../reducer/loginReducer';

export const deleteUser = (data) => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        const users = dispatch(getDataUser());
        axios.post(`/api/v1/admin/deleteUsers/${data}`, {
            id: data
        }, {
            headers: {
                'Authorization': `Bearer ${users.access_token}`,    
            }
        }).then(response => {
            return response;
        }).then(json => {
            if (json.data) {
                dispatch(Loading({
                    isLoading: false
                }))
                resolve(json.data);
            }
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                }
                reject(errors);
            }
        })
    })
}
export const getAllData = () => (dispatch) => {
    return new Promise((
        resolve,
        reject
    ) => {
        const users = dispatch(getDataUser());
        axios.get(`/api/v1/admin/getdataweb`,{
            headers: {
                'Authorization': `Bearer ${users.access_token}`,    
            }
        }).then(response => {
            return response;
        }).then(json => {
            if (json.data) {
                dispatch(Loading({
                    isLoading: false
                }))
                resolve(json.data);
            }
        }).catch(error => {
            if (error.response) {
                let err = error.response.data;
                const errors = {
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                }
                reject(errors);
            }
        })
    })
}