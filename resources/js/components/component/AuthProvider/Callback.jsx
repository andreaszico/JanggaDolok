import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginSocialCallback } from '../../redux/action/SocialAction';


function Callback(props) {
    const [data, setData] = useState({
        name: '',
        email: '',
        picture: '',
    })

    useEffect(() => {
        const data = {
            params: props.location.search
        }
        async function fetchData(){
            const res = await props.loginSocialite(data).catch(err => err);
            if(res){
                console.log(res);
                setData({
                    ...data,
                    name: res.name,
                    email: res.email,
                    picture: res.user.picture
                })
            }
        }

        fetchData();

    }, [])

    return (
        <div>
            <h1>{data.name}</h1>
            <h3>{data.email}</h3>
            {
                data.picture && (
                    <img src={data.picture} alt=""/>
                )
            }
        </div>
    )
}


const reduxState = (state) => ({
    isLoading: state.loading.isLoading,

})

const reduxDispatch = (dispatch) => ({
    loginSocialite: (data) => dispatch(loginSocialCallback(data))
})

export default connect(reduxState, reduxDispatch)(withRouter(Callback));
