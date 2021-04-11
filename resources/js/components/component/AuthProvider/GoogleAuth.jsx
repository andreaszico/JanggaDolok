import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginSocial } from '../../redux/action/SocialAction';


function GoogleAuth(props) {
    const [googleLoginUrl, setGoogleLoginUrl] = useState('');

    useEffect(() => {
        async function GoogleAuthLogin () {
            const data = {
                params: props.location.search
            }
            const res = await props.loginSocialite(data).catch(err => err);
            if(res){
                setGoogleLoginUrl(res.url);
            }
        }
        GoogleAuthLogin();
    }, [])


    return (
        <div>
            <a href={googleLoginUrl}>DAMN</a>        
        </div>
    )
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading,

})

const reduxDispatch = (dispatch) => ({
    loginSocialite: (data) => dispatch(loginSocial(data)), 
})

export default connect(reduxState, reduxDispatch)(withRouter(GoogleAuth));
