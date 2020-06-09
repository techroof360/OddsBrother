import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  //Button
} from "reactstrap";
import content from "../resources/properties";
import Signup from "../views/Signup";
import Login from "../views/Login";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Logo from "../images/app_logo.png";
import "../style/App.css";
import PropTypes from "prop-types";
import apiEndpoints from "../resources/apiEndpoins";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import Twitter from "@material-ui/icons/Twitter";
import Facebook from "@material-ui/icons/Facebook";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-force-tabpanel-${index}`}
//       aria-labelledby={`scrollable-force-tab-${index}`}
//       {...other}
//     >
//       <Box p={3}>{children}</Box>
//     </Typography>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired
// };

// function a11yProps(index) {
//   return {
//     id: `scrollable-force-tab-${index}`,
//     "aria-controls": `scrollable-force-tabpanel-${index}`
//   };
// }

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     width: "100%",
//     backgroundColor: theme.palette.background.paper
//   }
// }));

const AppHeader = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginText, setLoginText] = useState();

  const [signupPopupOpen, setSignupPopupOpen] = useState(false);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleSignupPopup = () => {
    setSignupPopupOpen(!signupPopupOpen);
  };

  const toggleLogoutConfirmation = () => {
    setLogoutConfirmation(!logoutConfirmation);
  };

  const toggleLoginPopup = () => {
    setLoginPopupOpen(!loginPopupOpen);
  };

  const doLogin = login => {
    axios
      .post(apiEndpoints.LOGIN_API, login)
      .then(res => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        props.toggleAdminMenuShow();
        setLoginText(content.logoutMsg);
        setLoginPopupOpen(false);
      })
      .catch(error => {
        alert("Wrong username or password provided");
      });
  };

  const onLoginLogoutClick = () => {
    loginText === content.loginMsg
      ? setLoginPopupOpen(!loginPopupOpen)
      : toggleLogoutConfirmation();
  };

  const doLogout = () => {
    localStorage.removeItem("token");
    setLoginText(content.loginMsg);
    props.toggleAdminMenuShow();
    toggleLogoutConfirmation();
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    setLoginText(token ? content.logoutMsg : content.loginMsg);
  }, []);

  return (
    <div>
      <Signup isOpen={signupPopupOpen} closePopup={toggleSignupPopup} />
      <Login
        isOpen={loginPopupOpen}
        closePopup={toggleLoginPopup}
        doLogin={doLogin}
      />

      <Modal size="lg" isOpen={logoutConfirmation}>
        <ModalHeader>{content.confirmationTitle}</ModalHeader>
        <ModalBody>
          <Alert color="warning">{content.logoutConfirmationMsg}</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={doLogout}>
            {content.confirmMsg}
          </Button>{" "}
          <Button color="secondary" onClick={toggleLogoutConfirmation}>
            {content.cancelMsg}
          </Button>
        </ModalFooter>
      </Modal>

      <Navbar
        light
        expand="md"
        style={{
          background: "#ffffff",
          borderRadius: 5,
          marginTop: 5
        }}
      >
        <NavbarBrand href="/">
          <img
            alt={"logo"}
            src={Logo}
            style={{ height: 30, pointerEvents: "none" }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar style={{ marginTop: 50 }}>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                {content.homeMsg}
              </NavLink>
            </NavItem>
            <div className="divider" id="divider">
              |
            </div>
            <NavItem>
              <NavLink tag={Link} to="/articles">
                {content.articlesMsg}
              </NavLink>
            </NavItem>
            <div className="divider">|</div>
            <NavItem>
              <NavLink tag={Link} to="/spreadsheet">
                {content.spreadsheetMsg}
              </NavLink>
            </NavItem>
            <div className="divider">|</div>
            <NavItem>
              <NavLink tag={Link} to="/bonuses">
                {content.BettingBonusMsg}
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar hidden={props.isAdminHidden}>
              <div className="divider-admin">|</div>
              <DropdownToggle nav caret>
                {content.adminMsg}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink tag={Link} to="/manage-bets">
                    {content.manageBetMsg}
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />

                <DropdownItem>
                  <NavLink tag={Link} to="/manage-articles">
                    {content.manageArticleMsg}
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink tag={Link} to="/manage-bonuses">
                    {content.manageBonusMsg}
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink tag={Link} to="/manage-bookies">
                    {content.manageBookieMsg}
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink tag={Link} to="/manage-sports">
                    {content.ManageSportMsg}
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink tag={Link} to="/manage-leagues">
                    {content.manageLeague}
                  </NavLink>
                </DropdownItem>

                <DropdownItem>
                  <NavLink tag={Link} to="/manage-banners">
                    Manage Banners
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={onLoginLogoutClick}
            //className={classes.button}
            startIcon={<AccountBoxIcon />}
          >
            {loginText}
          </Button> */}

          <div className="login">
            <a onClick={onLoginLogoutClick} href="#">
              {loginText}
            </a>
            {loginText == content.logoutMsg ? (
              <LockOpen className="header-icons" />
            ) : (
              <Lock className="header-icons" />
            )}
          </div>

          <div hidden={!props.isAdminHidden} className="signup">
            <a onClick={toggleSignupPopup} href="#">
              {content.signupMsg}
            </a>
            <AccountCircleIcon className="header-icons" />
          </div>

          <div className="social-media-header">
            <a
              target="_blank"
              href="https://www.facebook.com/groups/2146335875599093/?ref=bookmarks"
            >
              <Facebook />
            </a>{" "}
            <a target="_blank" href="https://twitter.com/Sjakktrekk">
              <Twitter />
            </a>
          </div>

          {/* <Button
            variant="contained"
            color="primary"
            hidden={!props.isAdminHidden}
            onClick={toggleSignupPopup}
            style={{
              marginRight: "5%"
            }}
          >
            {content.signupMsg}
          </Button> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

AppHeader.propTypes = {
  onChange: PropTypes.func
};

export default AppHeader;
