import React, { useState , useEffect } from "react";
import clsx from "clsx";
import {
   Link,
  Redirect 
} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

// core components
import GridContainer from "../SignUpPage/Grid/GridContainer.js";
import GridItem from "../SignUpPage/Grid/GridItem.js";
import Grid from "@material-ui/core/Grid";
import Button from "../SignUpPage/CustomButtons/Button.js";
import Card from "../SignUpPage/Card/Card.js";
import CardBody from "../SignUpPage/Card/CardBody.js";
import CardHeader from "../SignUpPage/Card/CardHeader.js";
import CardFooter from "../SignUpPage/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import FacebookLogin from 'react-facebook-login';
// import  GoogleLogin  from 'react-google-login';
import './style.css';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

//redux
// import moduleName from 'react-redux';

import { connect } from "react-redux";
 import store from '../../redux/store';
import styles from "./LoginPage.styles";

import image from "../SignUpPage/bg7.jpg";
import TwitterLogin from "react-twitter-login";
import {login} from '../../redux/actions/authAction';
const useStyles = makeStyles(styles);

const LoginPage = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const [visible, setvisible] = useState({
  showPassword: false
})

  const {showPassword} = visible 
  const { email, password } = formData;
  const handleChange = prop => event => {
    setFormData({ ...formData, [prop]: event.target.value });
  };
  
  // {state.response != null && state.response.accessToken === false ? null : state.response.name  }
  const handleClickShowPassword = () => {
    setvisible({ ...formData, showPassword: !formData.showPassword });
  };
   const [state, setState] = useState()
    // console.log('state', state)
  const responseFacebook = (response) => {
//  console.log('facebook responce',response);
//      console.log('facebook name',response.name);
//      console.log('facebook responce',response.accessToken);
     if(response.accessToken != undefined){
      setState(state => ({
        ...state, response
      }))
      store.dispatch({
        type:"LOGIN_SUCCESS_FACEBOOK",
        response
      })
     }
   
  }
  // const responseGoogle = (response) => {
  //   console.log('google',response);
  // }
  
  // const MyFacebookButton = ({ onClick }) => (
  //   <Button onClick={onClick}   style={{backgroundColor:'#1774EB', borderRadius:50, height:40, width:216,textTransform:'initial', fontSize:'initial'}}    color="primary" >
  //     Login with Facebook
  //   </Button>
  
  // );
  
  //  localStorage.setItem('token',state !== undefined && state.response.accessToken)
  // // localStorage.setItem('fbToken',state.response != null && state.response.accessToken)
  // let ftoken = localStorage.getItem("fbToken");
  // // console.log('fb token', ftoken)


  const authHandler = (err, data) => {
    // console.log(err, data);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onSubmit = e => {
    e.preventDefault();
    
   props.login(formData);
  };

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  // Redirect
   if (props.auth.isAuthenticated === true  )  {
     return <Redirect to="/" />
   }
 


// console.log('user', props.auth.isAuthenticated)
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]} style = {{ backgroundColor: "white"}}>
                <form className={classes.form} onSubmit={e => onSubmit(e)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <CardBody>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        label="Email"
                        className={clsx(classes.margin, classes.textField)}
                        value={email}
                        type="email"
                        required
                        onChange={handleChange("email")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AccountCircle />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-adornment-password"
                        className={clsx(classes.margin, classes.textField)}
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        value={formData.password}
                        onChange={handleChange("password")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {formData.showPassword ? (
                                  <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple type="submit" color="primary" size="lg">
                      Login
                    </Button>
                   
                    <Link to="/signup">
                     <Button simple type="submit" color="primary" size="lg">
                      Register
                     </Button>
                    </Link>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
              <CardFooter>
                
        <FacebookLogin
          appId="2734157480201751" // client new
        // appId="2264215990554263" // client old
      // appId="2236300453339584" // me
        autoLoad={true}
        autoLoad={false}
        fields="name,email,picture"
        // scope="public_profile,user_friends,user_actions.books"
        callback={responseFacebook}
        render={(renderProps) => (
          <Button  
            // className={classes.fbLoginButton}
            onClick={() => renderProps.onClick()}
            startIcon={<i class="fa fa-facebook"></i>}
            style={{
              backgroundColor: "#1774EB",
              borderRadius: 50,
              height: 50,
              width: 216,
              fontWeight: "bold",
              textTransform: "initial",
              fontSize: "initial",
            }}
            color="primary"
          >
            Login with Facebook
          </Button>
        )}
      />
                </CardFooter> 
             </CardFooter>
              {/* <CardFooter className={classes.cardFooter}  id="loginWithGoogle">
              <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
               </CardFooter>  */}
                </form>
              </Card>
            </GridItem>
            {/* <Row id="socialIcon" style={{  width:55, float:'right'}}> */}
       
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch =>{
  return {
    login : data => dispatch(login(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
