import React, { useState } from "react";
import clsx from "clsx";
import {
  // Link,
  Redirect
} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
// core components
import GridContainer from "./Grid/GridContainer.js";
import GridItem from "./Grid/GridItem.js";
import Grid from "@material-ui/core/Grid";
import Button from "./CustomButtons/Button.js";
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import CardHeader from "./Card/CardHeader.js";
import CardFooter from "./Card/CardFooter.js";
// import CustomInput from "../../Components/CustomInput/CustomInput.js";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


//redux
import { connect } from "react-redux";

// import { setAlert } from "../../redux/alert/alertActions";

import styles from "./SignUpPage.styles";

import image from "./bg7.jpg";
import {register} from '../../redux/actions/authAction';
const useStyles = makeStyles(styles);

const SignUpPage = (props) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    type:''
  });
  const { username, email, password, showPassword } = formData;

  const handleChange = prop => event => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const onSubmit = e => {
    e.preventDefault();
   
   props.register(formData)
    // register({ name, email, password });
  };

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  // //Redirect
  // if (isAuthenticated) {
  //   return <Redirect to="/" />;
  // }
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
                  <CardHeader color="primary" className={classes.cardHeader} >
                    <h4>Sign Up</h4>
                  </CardHeader>
                  <CardBody>
                    <Grid item xs={12}>
                      <TextField
                        labelText="Name"
                        className={clsx(classes.margin, classes.textField)}
                        id="name"
                        label="Name"
                        value={username}
                        type="text"
                        required
                        onChange={handleChange("username")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        labelText="Email"
                        className={clsx(classes.margin, classes.textField)}
                        id="email"
                        label="Email"
                        required
                        value={email}
                        onChange={handleChange("email")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
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
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple type="submit" color="primary" size="lg" >
                      Sign Up
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});
const mapDispatchToProps = dispatch =>{
  return {
    register : data => dispatch(register(data))
  }
}
export default connect(null , mapDispatchToProps)(SignUpPage);
