import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import apiEndpoints from "../resources/apiEndpoins";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Cards from "./Cards";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import appConstants from "../resources/AppConstants";

import DateTime from "../components/DateTime";
import Coverflow from "react-coverflow";

const ColorButton = withStyles(theme => ({
  root: {
    color: "#4490ba", //theme.palette.getContrastText(purple[500]),
    backgroundColor: "#4490ba", //purple[500],
    "&:hover": {
      backgroundColor: "#4991A8" //purple[700]
    }
  }
}))(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(3)
  },
  root: {
    flexGrow: 1
  },

  cCard: {
    height: "65%"
  },
  error: {
    color: "#FF0000"
  },
  cardMedia: {
    maxWidth: "90%",
    marginTop: 5
  },
  cardText: {
    position: "absolute",
    width: "100%",
    bottom: 2
  },

  match: {
    color: "black",
    fontSize: 18
  },
  bet: {
    color: "black",
    fontSize: 30
  },
  oddsStake: {
    color: "black",
    fontSize: 22
  },
  blackText: {
    color: "black"
  },
  desc: {
    color: "black",
    fontSize: 13
  },
  popup: {
    minWidth: 600
  }
}));

const Home = props => {
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
    league: ""
  });

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

  // const onRowClick = event => {
  //   let dateTime = "--/-- --:--";
  //   if (event.data.kickOffDate && event.data.kickOffTime) {
  //     let dateArr = event.data.kickOffDate.split("-");
  //     let date = dateArr[1] + "/" + dateArr[2];
  //     let timeArr = event.data.kickOffTime.split(":");
  //     let time = timeArr[0] + ":" + timeArr[1];

  //     dateTime = date + " " + time;
  //   }

  //   setContent({
  //     ...content,
  //     match: event.data.matchDesc,
  //     bet: event.data.betDesc,
  //     odds: event.data.odds,
  //     stake: event.data.stake,
  //     sport: event.data._embedded.sport.name,
  //     league: event.data._embedded.league.name,
  //     type: event.data.betType,
  //     desc: event.data.description,
  //     dateTime: dateTime
  //   });

  //   setOpen(true);
  // };

  const fn = () => {};
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios.get(apiEndpoints.NEW_BET_API).then(newBetsRes => {
      setBets(newBetsRes.data);
    });

    axios.get(apiEndpoints.SETTLED_BET_API).then(settledBetsRes => {
      setSettledBets(settledBetsRes.data);
    });
  }, []);

  return (
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
              {" "}
              <span className={classes.bet}>{content.bet}</span>{" "}
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

      <Row style={{ marginLeft: 12, marginRight: 12 }}>
        <Col xs="9">
          {/* <HomeBetsGrid bets={bets} onRowClick={onRowClick} /> */}
          <p
            style={{
              fontFamily: "Nunito Sans",
              color: "#adadad",
              fontSize: "0.875rem",
              marginLeft: 5,
              marginBottom: 5
            }}
          >
            New Bets
          </p>

          <Coverflow
            width={960}
            height={480}
            displayQuantityOfSide={2}
            navigation={false}
            enableHeading={false}
          >
            {bets.map((item, key) => (
              <Grid key={key} item>
                <Paper
                  className="home-paper"
                  style={{
                    width: 152,
                    height: 300
                  }}
                >
                  <a
                    href=""
                    //onClick={e => handleClickOpen(e, item)}
                    onClick={() => fn()}
                    onKeyDown={() => fn()}
                    role="menuitem"
                    tabIndex={key}
                    style={{
                      display: "block",
                      width: "100%",
                      textDecoration: "none"
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Nunito Sans",
                        color: "#4490ba",
                        fontSize: "0.875rem"
                      }}
                    >
                      MATCH
                    </div>

                    <div
                      style={{
                        fontFamily: "Alegreya Sans",
                        fontSize: "0.875rem",
                        ///color: "#424242"
                        fontWeight: "bold",
                        color: "#000000"
                      }}
                    >
                      {item.matchDesc}
                    </div>

                    <div
                      style={{
                        fontFamily: "Nunito Sans",
                        color: "#adadad",
                        //fontSize: "0.875rem"
                        fontSize: 10
                      }}
                    >
                      Time:{" "}
                      <DateTime
                        date={item.kickOffDate}
                        time={item.kickOffTime}
                      />
                    </div>

                    <div style={{ height: 80, width: 138 }}>
                      <img
                        style={{
                          marginLeft: 7,
                          maxWidth: "100%",
                          maxHeight: "100%"
                        }}
                        src={appConstants.IMAGES_PATH + item.image}
                      />
                    </div>

                    <div
                      style={{
                        fontFamily: "Muli ",
                        color: "#4490ba",
                        fontSize: "14px"
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
                        fontSize: "0.875rem"
                      }}
                    >
                      {item.betDesc}
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Alegreya Sans",
                        color: "#adadad",
                        fontSize: "0.875rem"
                      }}
                    >
                      Units: {item.stake}/10
                    </div>

                    <div
                      style={{
                        textAlign: "center",
                        color: "#000000",
                        fontFamily: "Alegreya Sans",
                        fontSize: "0.875rem"
                      }}
                    >
                      Odds
                    </div>

                    <div
                      style={{
                        fontFamily: "Muli ",
                        color: "#4490ba",
                        fontSize: "0.875rem",
                        border: "solid",
                        marginLeft: 50,
                        marginRight: 50
                      }}
                    >
                      {item.odds}
                    </div>
                  </a>

                  {/* <img
                      style={{ maxHeight: "5%" }}
                      src={require(`../image-uploads/` +
                        item._embedded.bookie.poster)}
                    />
                    <br /> */}

                  <ColorButton
                    size="small"
                    style={{
                      color: "white",
                      width: "80%",
                      marginTop: 8,
                      height: 27
                      //marginLeft: "20%"
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      window.open(item._embedded.bookie.urlRegistration);
                    }}
                  >
                    Join bet
                  </ColorButton>
                </Paper>
              </Grid>
            ))}

            {/* <img
        src="images/album-1.png"
        alt="Album one"
        data-action="https://facebook.github.io/react/"
      />
      <img
        src="images/album-2.png"
        alt="Album two"
        data-action="http://passer.cc"
      />
      <img
        src="images/album-3.png"
        alt="Album three"
        data-action="https://doce.cc/"
      />
      <img
        src="images/album-4.png"
        alt="Album four"
        data-action="http://tw.yahoo.com"
      /> */}
          </Coverflow>

          {/* <Grid item xs={12}>
            <Grid container justify="center" spacing={4}>
              {bets.map((item, key) => (
                <Grid key={key} item>
                  <Paper className="home-paper">
                    
                    <a
                      href=""
                      onClick={e => handleClickOpen(e, item)}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Nunito Sans",
                          color: "#4490ba",
                          fontSize: "0.875rem"
                        }}
                      >
                        MATCH
                      </div>

                      <div
                        style={{
                          fontFamily: "Alegreya Sans",
                          fontSize: "0.875rem",
                          ///color: "#424242"
                          fontWeight: "bold",
                          color: "#000000"
                        }}
                      >
                        {item.matchDesc}
                      </div>

                      <div
                        style={{
                          fontFamily: "Nunito Sans",
                          color: "#adadad",
                          //fontSize: "0.875rem"
                          fontSize: 10
                        }}
                      >
                        Time:{" "}
                        <DateTime
                          date={item.kickOffDate}
                          time={item.kickOffTime}
                        />
                      </div>

                      <div style={{ height: 160, width: 215 }}>
                        <img
                          style={{
                            marginLeft: 7,
                            maxWidth: "100%",
                            maxHeight: "100%"
                          }}
                          src={appConstants.IMAGES_PATH + item.image}
                        />
                      </div>

                      <div
                        style={{
                          fontFamily: "Muli ",
                          color: "#4490ba",
                          fontSize: "14px"
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
                          fontSize: "0.875rem"
                        }}
                      >
                        {item.betDesc}
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          fontFamily: "Alegreya Sans",
                          color: "#adadad",
                          fontSize: "0.875rem"
                        }}
                      >
                        Units: {item.stake}/10
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          color: "#000000",
                          fontFamily: "Alegreya Sans",
                          fontSize: "0.875rem"
                        }}
                      >
                        Odds
                      </div>

                      <div
                        style={{
                          fontFamily: "Muli ",
                          color: "#4490ba",
                          fontSize: "0.875rem",
                          border: "solid",
                          marginLeft: 90,
                          marginRight: 90
                        }}
                      >
                        {item.odds}
                      </div>
                    </a>

                    

                    <ColorButton
                      size="small"
                      style={{
                        color: "white",
                        width: "80%",
                        marginTop: 8,
                        height: 45
                        //marginLeft: "20%"
                      }}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        window.open(item._embedded.bookie.urlRegistration);
                      }}
                    >
                      Join bet
                    </ColorButton>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid> */}
          <p
            style={{
              fontFamily: "Nunito Sans",
              color: "#adadad",
              fontSize: "0.875rem",
              marginTop: 10,
              marginBottom: 4,
              marginLeft: 2
            }}
          >
            Settled Bets
          </p>
          <Paper id="home-settle-bets">
            <Table>
              <TableHead>
                <TableRow
                  style={{
                    fontFamily: "Nunito Sans",
                    color: "#bdbdbd",
                    marginLeft: 10,
                    paddingTop: 5
                  }}
                >
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Game</TableCell>
                  <TableCell align="center">Bet</TableCell>
                  <TableCell align="left">Stake</TableCell>
                  <TableCell align="left">Odds</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settledBets.map(row => {
                  let dotColor = "grey";
                  if (row.status === "LOST") {
                    dotColor = "red";
                  } else if (row.status === "WON") {
                    dotColor = "green";
                  }

                  return (
                    <TableRow
                      align="right"
                      key={row.name}
                      style={{
                        fontFamily: "Nunito Sans",
                        color: "#757575",
                        marginLeft: 10
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <DateTime
                          date={row.kickOffDate}
                          time={row.kickOffTime}
                          style={{
                            marginLeft: 20
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <span
                          style={{
                            marginLeft: 20
                          }}
                        >
                          {row.matchDesc}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          style={{
                            marginLeft: 20
                          }}
                        >
                          {row.betDesc}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          style={{
                            marginLeft: 5
                          }}
                        >
                          {row.stake}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          style={{
                            marginLeft: 5
                          }}
                        >
                          {row.odds}
                        </span>
                      </TableCell>
                      <TableCell>
                        <FiberManualRecord
                          style={{
                            color: dotColor,
                            fontSize: 15,
                            marginLeft: 7
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Col>
        <Col style={{ marginTop: 25 }}>
          <Cards />
        </Col>
      </Row>
    </Container>
  );
};

Home.propTypes = {
  onChange: PropTypes.func
};

export default Home;
