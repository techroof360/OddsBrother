import React from "react";

import TextField from "@material-ui/core/TextField";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import FormErrors from "../components/FormErrors";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import content from "../resources/properties";

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formErrors: {
        username: "",
        password: ""
      }
    };
    this.closePopup = this.closePopup.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser = () => {
    if (this.validateLogin()) {
      this.props.doLogin(this.state);
      // this.resetState();
    }
  };

  handleUserInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateLogin() {
    let usernameValid,
      passwordValid = false;
    let fieldValidationErrors = this.state.formErrors;

    usernameValid = this.state.username.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );

    fieldValidationErrors.username = usernameValid ? "" : " is invalid";

    passwordValid = this.state.password.length >= 6;

    fieldValidationErrors.password = passwordValid ? "" : " is too short";

    if (usernameValid && passwordValid) {
      this.setState({
        formErrors: {
          username: "",
          password: ""
        }
      });
      return true;
    } else {
      this.setState({
        formErrors: fieldValidationErrors
      });
      return false;
    }
  }

  resetState() {
    this.setState({
      username: "",
      password: "",

      formErrors: {
        username: "",
        password: ""
      }
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  closePopup() {
    this.resetState();
    this.props.closePopup();
  }

  componentDidMount() {
    this.resetState();
  }

  render() {
    const { classes } = this.props;
    return (
      <Modal size="lg" isOpen={this.props.isOpen}>
        <ModalHeader>{content.loginMsg}</ModalHeader>
        <ModalBody>
          <FormErrors formErrors={this.state.formErrors} />
          <Grid container spacing={3}>
            <Grid item xs={6} className={classes.dataBox}>
              <TextField
                required
                id="username"
                label="Username"
                className={classes.textField}
                value={this.state.username}
                name="username"
                onChange={this.handleUserInput}
                margin="normal"
                // error={!this.state.usernameValid}
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
                // error={!this.state.passwordValid}
                margin="normal"
                //   variant="outlined"
              />

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.loginUser}
              >
                {content.loginMsg}
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.socialBox}>
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

              {/* <Typography
                variant="body2"
                gutterBottom
                className={classes.typo1}
              >
                {content.signupTermCondMsg}
              </Typography> */}
            </Grid>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.closePopup}>
            {content.cancelMsg}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default withStyles(styles)(Login);
