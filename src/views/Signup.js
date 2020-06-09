import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import FormErrors from "../components/FormErrors";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import content from "../resources/properties";
import apiEndpoints from "../resources/apiEndpoins";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  facebook: {
    marginRight: theme.spacing(1),
    width: "100%",
    height: 60
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "89%",
    left: "23%"
  },
  twitter: {
    marginRight: theme.spacing(1),
    width: "100%",
    height: 60,
    backgroundColor: "rgb(64, 169, 243)",
    marginTop: theme.spacing(4),
    "&:hover": {
      backgroundColor: "rgb(64, 150, 243)"
    }
  },
  textField: {
    width: "100%"
  },
  formErrors: {
    color: "red"
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(4),
    height: 60
  },
  socialBox: {
    marginTop: theme.spacing(5),
    textAlign: "center"
  },

  dataBox: {
    marginTop: theme.spacing(4)
  },
  typo1: {
    marginTop: theme.spacing(5)
  },
  typo2: {
    marginBottom: theme.spacing(5)
  }
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      successConfirmation: false,
      responseMsg: "",
      name: "",
      email: "",
      password: "",
      rPassword: "",
      country: "",
      formErrors: {
        email: "",
        password: "",
        name: "",
        cPassword: "",
        country: ""
      },
      emailValid: false,
      nameValid: false,
      passwordValid: false,
      rPasswordValid: false,
      countryValid: false,
      formValid: false
    };
    this.closePopup = this.closePopup.bind(this);
    this.hide = this.hide.bind(this);
  }

  submitUser = () => {
    if (this.state.formValid === false || this.state.formValid === null) {
      alert("Please correct errors and then submit");
      return;
    }

    this.setState({
      loading: true
    });

    axios
      .post(apiEndpoints.REGISTER_API, this.state)
      .then(res => {
        this.closePopup();
        this.setState({
          successConfirmation: true,
          loading: false,
          responseMsg: res.data
        });
      })
      .catch(error => {
        this.setState({
          successConfirmation: true,
          responseMsg: error
        });
      });
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let rPasswordValid = this.state.rPasswordValid;
    let countryValid = this.state.countryValid;

    switch (fieldName) {
      case "name":
        nameValid = value.match(/^[A-Za-z ]+$/i);
        fieldValidationErrors.name = nameValid ? "" : " is invalid";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "rPassword":
        rPasswordValid = value === this.state.password;
        fieldValidationErrors.cPassword = rPasswordValid ? "" : " do not match";
        break;
      case "country":
        countryValid = value.match(/^[A-Za-z ]+$/i);
        fieldValidationErrors.country = countryValid ? "" : " is invalid";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        nameValid: nameValid,
        rPasswordValid: rPasswordValid,
        countryValid: countryValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.nameValid &&
        this.state.countryValid &&
        this.state.rPasswordValid
    });
  }

  closePopup() {
    this.resetState();
    this.props.closePopup();
  }

  resetState() {
    this.setState({
      name: "",
      email: "",
      password: "",
      rPassword: "",
      country: "",
      formErrors: {
        email: "",
        password: "",
        name: "",
        cPassword: "",
        country: ""
      },
      emailValid: false,
      nameValid: false,
      passwordValid: false,
      rPasswordValid: false,
      countryValid: false,
      formValid: false
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  hide() {
    this.setState({
      successConfirmation: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal size="lg" isOpen={this.state.successConfirmation}>
          <ModalHeader>{content.confirmationTitle}</ModalHeader>
          <ModalBody>
            <Alert color="warning">{this.state.responseMsg}</Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.hide}>
              {content.okMsg}
            </Button>
          </ModalFooter>
        </Modal>

        <Modal /*size="lg"*/ isOpen={this.props.isOpen}>
          <ModalHeader>{content.signupMsg}</ModalHeader>
          <ModalBody>
            <FormErrors formErrors={this.state.formErrors} />
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.dataBox}>
                <TextField
                  required
                  id="name"
                  label="Full Name"
                  name="name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleUserInput}
                  margin="normal"
                  //error={!this.state.nameValid}
                  //   variant="outlined"
                />
                <TextField
                  required
                  id="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  name="email"
                  onChange={this.handleUserInput}
                  margin="normal"
                  //error={!this.state.emailValid}
                  //   variant="outlined"
                />
                <TextField
                  required
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleUserInput}
                  //error={!this.state.passwordValid}
                  margin="normal"
                  //   variant="outlined"
                />
                <TextField
                  required
                  id="rPassword"
                  name="rPassword"
                  type="password"
                  label="Retype password"
                  className={classes.textField}
                  value={this.state.rPassword}
                  onChange={this.handleUserInput}
                  //error={!this.state.rPasswordValid}
                  margin="normal"
                  //   variant="outlined"
                />
                <TextField
                  required
                  id="outlined-name"
                  name="country"
                  label="Country"
                  className={classes.textField}
                  value={this.state.country}
                  onChange={this.handleUserInput}
                  //error={!this.state.countryValid}
                  margin="normal"
                  //   variant="outlined"
                />

                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // disabled={!this.state.formValid}
                    onClick={this.submitUser}
                    disabled={this.state.loading}
                  >
                    {content.signupAddMsg}
                  </Button>

                  {this.state.loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>

              {/* <Grid item xs={6} className={classes.socialBox}>
                <Typography variant="h6" className={classes.typo2}>
                  {content.signupSocialMsg}
                </Typography>

                <Fab
                  variant="extended"
                  color="primary"
                  aria-label="add"
                  className={classes.facebook}
                >
                  {content.fbLoginMsg}
                </Fab>

                <Fab
                  variant="extended"
                  color="primary"
                  aria-label="add"
                  className={classes.twitter}
                >
                  {content.twitterLoginMsg}
                </Fab>

                <Typography
                  variant="body2"
                  gutterBottom
                  className={classes.typo1}
                >
                  {content.signupTermCondMsg}
                </Typography>
              </Grid> */}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.closePopup}>
              {content.cancelMsg}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Signup);
//export default Signup;
