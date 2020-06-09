import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
// import axios from "axios";
// import apiEndpoints from "../resources/apiEndpoins";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";

// import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Cards from "./Cards";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { Link, Redirect } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import appConstants from "../resources/AppConstants";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../images/nfl.jpg";
import DateTime from "../components/DateTime";
import Loader from "react-spinners/RingLoader";
import { css } from "@emotion/core";
import { connect } from "react-redux";
import Header from "./Header";
import { getBit } from "../redux/actions/ManageBitAction";
import { getBonus } from "../redux/actions/ManageBouncesAction";
import { loadUser } from "../redux/actions/authAction";
import "../style/responsive.css";
// import TwoBet from '../images/22bet.png';
// import betway from '../images/betway.png';
// import leovegas from '../images/leovegas.png';
// import bethard from '../images/bethard.png';
// import expert from '../images/expert.png';
// import bet365 from '../images/bet365.png';
import Footer from "./footer";
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#4490ba", //theme.palette.getContrastText(purple[500]),
    backgroundColor: "#4490ba", //purple[500],
    "&:hover": {
      backgroundColor: "#4991A8", //purple[700]
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },

  cCard: {
    height: "65%",
  },
  error: {
    color: "#FF0000",
  },
  cardMedia: {
    maxWidth: "90%",
    marginTop: 5,
  },
  cardText: {
    position: "absolute",
    width: "100%",
    bottom: 2,
  },

  match: {
    color: "black",
    fontSize: 18,
  },
  bet: {
    color: "black",
    fontSize: 30,
  },
  oddsStake: {
    color: "black",
    fontSize: 22,
  },
  blackText: {
    color: "black",
  },
  desc: {
    color: "black",
    fontSize: 13,
  },
  popup: {
    minWidth: 600,
  },
  table: {
    minWidth: 650,
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [bets, setBets] = useState([]);

  const [settledBets, setSettledBets] = useState([]);

  const [open, setOpen] = useState(false);

  const [content, setContent] = useState({
    match: "",
    bet: "",
    odds: "",
    stake: "",
    sport: "",
    league: "",
  });
  const override = css`
    margin-left: calc(50% - 100px);
    border-color: red;
  `;

  const handleClickOpen = (e, bet) => {
    // let src = require("../image-uploads/" + article.imageName);
    // setImageSrc(src);
    // setArticle(article);
    // setOpen(true);
    e.preventDefault();
    let url = window.location.href.split("/");

    url = url[0] + "/bet-detail/" + bet.betId;

    window.open(url, "_self");
  };

  useEffect(() => {
    // Redirect
    let token = localStorage.getItem("token");
    // console.log('token ', token)
    if (token) {
      // props.loadUser(token)
      setTimeout(function () {
        props.loadUser(token);
        // alert('its work')
      }, 3000);
    }
  }, []);

  // console.log('props.settledBets', props.settledBets)

  const settings = {
    dots: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings1 = {
    dots: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    props.getBit();
    props.getBonus();
  }, []);
  // console.log('props.settledBets', props.settledBets)
  return (
    <div>
      <Header />
      <Container>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent className={classes.popup}>
            <DialogContentText id="alert-dialog-description">
              <p>{content.dateTime}</p>

              <p className={classes.match}>{content.match}</p>
              <p>
                <span className={classes.bet}>{content.bet}</span>
                <span className={classes.oddsStake}>
                  @ {content.odds} ({content.stake} units)
                </span>
              </p>
              <p>
                <Row>
                  <Col>Sport</Col>
                  <Col>Leage</Col>
                  <Col>Type</Col>
                </Row>

                <Row className={classes.blackText}>
                  <Col>{content.sport}</Col>
                  <Col>{content.league}</Col>
                  <Col>{content.type}</Col>
                </Row>
              </p>
              <p>
                <Row>
                  <Col>Description</Col>
                </Row>
                <Row className={classes.desc}>
                  <Col>{content.desc}</Col>
                </Row>
              </p>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        {props.settledBets.length > 0 ? (
          <Row>
            <Col xs="12">
              {/* <HomeBetsGrid bets={bets} onRowClick={onRowClick} /> */}
              {/* <p
            style={{
              fontFamily: "Nunito Sans",
              color: "#adadad",
              fontSize: "0.875rem",
              marginLeft: 5,
              marginBottom: 5
            }}
          > */}
              <h3 id="handelHeading" className="font">
                {" "}
                New Bets{" "}
              </h3>
              {/* </p> */}
              <div className="container">
                <Slider {...settings}>
                  {props.settledBets.map((item, key) => (
                    <Paper
                      className="home-paper-new"
                      id="paper_slider_bottom_padding"
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Nunito Sans",
                          color: "#4490ba",
                          fontSize: "0.875rem",
                          textAlign: "center",
                        }}
                      >
                        MATCH
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          fontFamily: "Alegreya Sans",
                          fontSize: "0.875rem",
                          ///color: "#424242"
                          fontWeight: "bold",
                          color: "#000000",
                        }}
                      >
                        {item.match_desc}
                      </div>

                      <div
                        style={{
                          fontFamily: "Nunito Sans",
                          color: "#adadad",
                          //fontSize: "0.875rem"
                          fontSize: 10,
                          textAlign: "center",
                        }}
                      >
                        Time:{" "}
                        <DateTime
                          date={item.kick_off_date}
                          time={item.kick_off_time}
                        />
                      </div>

                      <Link
                        to={`/bet-details/${item.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        <div style={{ width: "95%" }}>
                          <img
                            style={{
                              marginLeft: 7,
                              maxWidth: "100%",
                              maxHeight: "100%",
                              height: 180,
                              display: "inline-block",
                            }}
                            src={item.image}
                          />
                        </div>
                      </Link>

                      <div
                        style={{
                          fontFamily: "Muli ",
                          color: "#4490ba",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        Bet
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          fontFamily: "Alegreya Sans",
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: "0.875rem",
                        }}
                      >
                        {item.betDesc}
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          fontFamily: "Alegreya Sans",
                          color: "#adadad",
                          fontSize: "0.875rem",
                        }}
                      >
                        Units: {item.stake}/10
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          color: "#000000",
                          fontFamily: "Alegreya Sans",
                          fontSize: "0.875rem",
                        }}
                      >
                        Odds
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          fontFamily: "Muli ",
                          color: "#4490ba",
                          fontSize: "0.875rem",
                          border: "solid",
                          marginLeft: "40%",
                          marginRight: "40%",
                          // width:'30%'
                        }}
                      >
                        {item.odds}
                      </div>
                      {/* </a> */}

                      <Link to={"/bets"} style={{ textDecoration: "none" }}>
                        <ColorButton
                          size="small"
                          style={{
                            color: "white",
                            width: "80%",
                            marginTop: 8,
                            height: 45,
                            marginLeft: "10%",
                            marginBottom: 7,
                          }}
                          variant="contained"
                          color="primary"
                        >
                          Join bet
                        </ColorButton>
                      </Link>
                    </Paper>
                  ))}
                </Slider>
              </div>

              {/* odds Bounces  */}
              <div style={{ marginTop: 50, marginBottom: 50 }}>
                <h3 id="handelHeading">Welcome Bonus</h3>

                <div className="container" style={{ textAlign: "center" }}>
                  <Slider {...settings1}>
                    {props.bonus.map((item, key) => (
                      <Paper className="home-paper-new" key={key} id="id_pad">
                        <img
                          style={{
                            display: "inline-block",

                            width: "100%",
                            height: "200px",
                          }}
                          src={item.image}
                        />

                        <div
                          style={{
                            textAlign: "center",
                            color: "#000000",
                            fontFamily: "Alegreya Sans",
                            fontSize: "0.875rem",
                          }}
                        >
                          {item.name}
                        </div>
                        <a
                          href={`${item.url_home}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          <ColorButton
                            size="small"
                            style={{
                              color: "white",
                              width: "80%",
                              marginTop: 8,
                              height: 45,

                              marginBottom: 7,
                            }}
                            variant="contained"
                            color="primary"
                          >
                            CLAIM BONUS
                          </ColorButton>
                        </a>
                      </Paper>
                    ))}
                  </Slider>
                </div>
              </div>

              <h3 id="handelHeading">Settled Bets</h3>

              <TableContainer component={Paper}>
                <Table style={{ width: "100%" }}>
                  <TableHead style={{ backgroundColor: "black" }}>
                    <TableRow
                      style={{
                        fontFamily: "Nunito Sans",
                        color: "#bdbdbd",
                        marginLeft: 10,
                        paddingTop: 5,
                      }}
                    >
                      <TableCell style={{ color: "white" }}>Time</TableCell>
                      <TableCell style={{ color: "white" }}>Game</TableCell>
                      <TableCell style={{ color: "white" }}>Bet</TableCell>
                      <TableCell style={{ color: "white" }}>Stake</TableCell>
                      <TableCell style={{ color: "white" }}>Odds</TableCell>
                      <TableCell style={{ color: "white" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.settledBets.map((row) => {
                      let dotColor = "grey";
                      if (row.status === "2") {
                        dotColor = "red";
                      } else if (row.status === "1") {
                        dotColor = "green";
                      }

                      return (
                        <TableRow
                          align="right"
                          key={row.name}
                          className="table-row"
                        >
                          <TableCell>
                            <DateTime
                              date={row.kick_off_date}
                              time={row.kick_off_time}
                              style={{
                                marginLeft: 20,
                              }}
                            />
                          </TableCell>

                          <TableCell>{row.match_desc}</TableCell>
                          <TableCell>{row.bet_desc}</TableCell>
                          <TableCell>{row.stake}</TableCell>
                          <TableCell>{row.odds}</TableCell>
                          <TableCell>
                            <FiberManualRecord
                              style={{
                                color: dotColor,
                                fontSize: 15,
                                marginLeft: 7,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* </Paper> */}
            </Col>
            <Col style={{ marginTop: 25 }}>
              <Cards />
            </Col>
          </Row>
        ) : (
          <div className="sweet-loading">
            <Loader css={override} size={180} color={"#4991A8"} />
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
};

Home.propTypes = {
  onChange: PropTypes.func,
};
const mapStateToProps = (store) => {
  return {
    settledBets: store.betsReducer.manageBits,
    bonus: store.bonusReducer.bonus,
    auth: store.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBit: () => dispatch(getBit()),
    getBonus: () => dispatch(getBonus()),
    loadUser: (data) => dispatch(loadUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
