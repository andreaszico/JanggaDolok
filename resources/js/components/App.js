import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './component/Header/Header';
import Login from './Pages/LoginRegister/Login';
import About from './Pages/About/About';
import Home from './Pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/config';
import Dashboard from './Pages/Admin/Dashboard';
import PrivateRoute from './Pages/PrivateRoute';
import AuthRoute from './Pages/Routes/AuthRoute';
import Article from './Pages/Article/Article';
import HeaderPages from './component/Header/HeaderPages';
import ScrollToTop from './Utils/scrollToTop';
import Footer from './component/Footer/Footer';
import SingleArticle from './Pages/Article/SingleArticle/SingelArticle';
import Register from './Pages/LoginRegister/Register';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import ArticleAdmin from './Pages/Admin/Article/ArticleAdmin/ArticleAdmin';
import CreateArticle from './Pages/Admin/Article/CreateArticle/CreateArticle';
import UpdateArticle from './Pages/Admin/Article/UpdateArticle/UpdateArticle';
import { Admin, User } from './Pages/Authorization';
import UsersDashboard from './Pages/Users/UsersDashboard';
import NotFound from './component/NotFound/NotFound';
import Users from './Pages/Admin/UsersData/Users';
import WrapperPages from './component/Wrapper/WrapperPages';
import Pesanan from './Pages/Users/Pesanan/Pesanan';
import GoogleAuth from './component/AuthProvider/GoogleAuth';
import Callback from './component/AuthProvider/Callback';
import CallbackFacebook from './component/AuthProvider/CallbackFacebook';
import About_Admin from './Pages/Admin/About/About_Admin';
import Contact_Us from './Pages/Contact/Contact_Us';

function App() {
  const THEME = createMuiTheme({
    typography: {
      "fontFamily": `"Poppins", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
    }
  });
  return (
    <MuiThemeProvider theme={THEME}>
      <Provider store={store}>
        <div className="App">
          <Router
           hashType='hashbang'
          >
            <ScrollToTop />
            <Switch>
              <Route exact path="/article/:postSlug">
                <HeaderPages option={true} scroll={-1} />
                <SingleArticle />
                <Footer />
              </Route>
              <Route exact path="/about-us">
                <HeaderPages option={true} scroll={-1} />
                <About />
                <Footer />
              </Route>
              <Route exact path="/contact-us">
                <HeaderPages option={true} scroll={-1} />
                <Contact_Us />
                <Footer />
              </Route>
              <Route exact path="/article">
                <HeaderPages option={true} scroll={-1} />
                <Article />
                <Footer />
              </Route>
              <AuthRoute exact path="/login" component={Login} />
              {/* <AuthRoute exact path="/register" component={Register} /> */}

              <PrivateRoute exact role="admin" path='/dashboard/create' component={Admin(CreateArticle)} />
              <PrivateRoute exact role="admin" path='/dashboard/update/:slug' component={Admin(UpdateArticle)} />
              <PrivateRoute exact role="admin" path='/dashboard/article' component={Admin(ArticleAdmin)} />
              <PrivateRoute exact role="admin" path='/dashboard/comment' component={Admin(Users)} />
              {/* <PrivateRoute exact role="admin" path='/dashboard/about' component={Admin(About_Admin)} /> */}
              <PrivateRoute exact path='/dashboard/admin' component={Admin(Dashboard)} />

              <AuthRoute exact path="/login/google" component={Callback} />
              <AuthRoute exact path="/login/facebook" component={CallbackFacebook} />

              {/* <Route exact path="/dashboard/user" component={User(UsersDashboard)} /> */}
              <Route exact path="/dashboard/pesanan" component={User(Pesanan)} />

              <Route path="/">
                <Header option={false} scroll={250} />
                <Home />
              </Route>
              <Route>
                <WrapperPages>
                  <NotFound />
                </WrapperPages>
              </Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;


if (document.getElementById('example')) {
  ReactDOM.render(<App />, document.getElementById('example'));
}
