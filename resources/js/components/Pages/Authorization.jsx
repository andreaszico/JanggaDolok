import React, {Component} from 'react';
import Footer from '../component/Footer/Footer';
import HeaderPages from '../component/Header/HeaderPages';
import NotFound from '../component/NotFound/NotFound';
import WrapperPages from '../component/Wrapper/WrapperPages';
/**
 * Get User from Local Storage
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
 * @return {obeject} UserData
 * {
 *  username: string,
 *  role: string
 * }
 */
const GetUser = () => {
    const fromStorage = JSON.parse(localStorage.getItem("users"));
    return !!fromStorage ? fromStorage : {user: '', role: 'guest'};
}

/**
 * Checking role its valid
 * @param {object}
 * {
 *   role: string,
 *   allowedRoles: array,
 * }
 * @return {boolean} 
 */
const isValidRole = ({role, allowedRoles}) => allowedRoles.includes(role);

/**
 * Authorization (High Order Component Concept)
 * @param {array} allowedRoles
 * @param {object} WrappedComponent
 * @return {object} React.Component
 *
 * Example:
 *    # set AllowedRoles with Component
 *    const AuthComponent = Authorization(['user','admin','superman'])(MyComponent)
 *
 *    # set AllowedRoles without Component
 *    const AuthHOC = Authorization(['user','admin','superman'])
 *    const MyComponent = () => <h1> Hello </h1>
 *    const AuthComponent = AuthHOC(MyComponent);
 *
 *    ReactDOM.render( <AuthComponent/>, target);
 */
const Authorization = allowedRoles => WrappedComponent => class withAuth extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: GetUser(), // state user assign value from GetUser function
        }
    }        
    
    render(){
        const role = this.state.user.user;
        return isValidRole({role: role.role, allowedRoles: allowedRoles}) ?
            <WrappedComponent/> :
            <WrapperPages>
                <NotFound/>
            </WrapperPages>
    }
}


/**
 * define administrator role
 * use: Admin(<Component/>)
 */
export const Admin = Authorization(['admin']);

/**
 * define user role
 * use: User(<Component/>)
 */
export const User = Authorization(['admin','user']);

export default {
    Admin,
    User,
}