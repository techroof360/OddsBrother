import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./views/Home";
import ManageBets from "./views/ManageBets";
// import AppHeader from "./components/AppHeader";
import ManageBookies from "./views/ManageBookies";
import ManageLeagues from "./views/ManageLeagues";
import ManageSports from "./views/ManageSports";
import ManageArticles from "./views/ManageArticles";
import ManageBanners from "./views/ManageBanners";
import ManageBonuses from "./views/ManageBonuses";
import Articles from "./views/Articles";

import ArticleDetail from "./views/ArticleDetail";
import { loadUser } from "./redux/actions/authAction";
import BetDetail from "./views/BetDetail";
import Spreadsheet from "./views/Spreadsheet";
import { Row, Col } from "reactstrap";
import Bonuses from "./views/Bonuses";
// import { Helmet } from "react-helmet";
// import content from "./resources/properties";
// import OurCarousel from "./components/OurCarousel";
// import Footer from './views/footer';
import ShowArtical from "./views/showArtical";
// import Header from "./views/Header";
// import Cards from "./views/Cards";

import SignUpPage from "./views/SignUpPage/SignUpPage.component";
import LoginPage from "./views/LoginPage/LoginPage.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style/responsive.css";
import BetDetails from "./views/BetDetails";
// import LoginPageComponent from "./views/LoginPage/LoginPage.component";

import { connect } from "react-redux";

const App = (props) => {
  const [isAdminHidden, setIsAdminHidden] = useState(true);

  const toggleAdminMenuShow = () => {
    setIsAdminHidden(!isAdminHidden);
  };
  useEffect(() => {
    // Redirect

    let token = localStorage.getItem("token");
    // console.log('token ', token)
    if (token) {
      props.loadUser(token);
 
      setIsAdminHidden();
    }
  }, []);


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <div style={{ background: "#f5f5f5" }}>
          <Row>
            <Col>
          
              <Route exact path="/" component={Home} />
              <Route exact path="/articles-details" component={Articles} />

              <Route exact path="/bets" component={ManageBets} />

              <Route exact path="/bet-details/:id" component={BetDetails} />
              <Route exact path="/spreadsheet" component={Spreadsheet} />

              <Route exact path="/articles" component={ManageArticles} />

              <Route exact path="/showArtical/:id" component={ShowArtical} />

              {props.auth.type == "1" ? (
                <Route exact path="/banners" component={ManageBanners} />
              ) : (
                <Redirect push to="/" />
              )}

              <Route exact path="/bonuses" component={ManageBonuses} />

              {props.auth.type == "1" ? (
                <Route exact path="/sports" component={ManageSports} />
              ) : (
                <Redirect push to="/" />
              )}

              {props.auth.type == "1" ? (
                <Route exact path="/leagues" component={ManageLeagues} />
              ) : (
                <Redirect push to="/" />
              )}

              {props.auth.type == "1" ? (
                <Route exact path="/bookies" component={ManageBookies} />
              ) : (
                <Redirect push to="/" />
              )}

              <Route exact path="/article-detail" component={ArticleDetail} />
              <Route exact path="/bet-detail" component={BetDetail} />
              <Route exact path="/bonuses" component={Bonuses} />
            </Col>
          </Row>
          <ToastContainer />
    
        </div>
      </Switch>
    </BrowserRouter>
  );
};
const mapStateToProps = (store) => {
  return {
    auth: store.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (data) => dispatch(loadUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
