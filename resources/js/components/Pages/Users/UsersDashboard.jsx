import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import WrapperDashboard from '../../component/Wrapper/WrapperDashboard'
import { getDataUser } from '../../redux/reducer/loginReducer';

function UsersDashboard() {

    const dispatch = useDispatch();
    const [user, setUser] = useState({
        user: ''
    });
    useEffect(() => {
        const user = dispatch(getDataUser());
        setUser(user);
    }, [])

    return (
        <WrapperDashboard>
            <h3>SELAMAT DATANG DI DESA JANGGA, {user.user && user.user.first_name}</h3>
        </WrapperDashboard>
    )
}

const reduxState = (state) => ({
    isLoading: state.loading.isLoading,
})

const reduxDispatch = (dispatch) => ({
   
})

export default connect(reduxState, reduxDispatch)(withRouter(UsersDashboard));

