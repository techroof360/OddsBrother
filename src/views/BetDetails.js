import React, { useState, useEffect } from "react";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import appConstants from "../resources/AppConstants";
// import Cards from "./Cards";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import Footer from "./footer";
import "../style/responsive.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Header from "./Header";
import img from "../images/sportliver.png";
 import TwoBet from "../images/22bet.png";
 import betway from "../images/betway.png";
import leovegas from "../images/leovegas.png";


import bethard from '../images/bethard.png';
import expert from '../images/expert.png';
import bet365 from '../images/bet365.png';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(3),
  },
  redCls: {
    color: "red",
  },
  greenCls: {
    color: "green",
  },
  greyCls: {
    color: "grey",
  },
  heading: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    textAlign: "center",
    width: "100%",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "bold",
  },
  value: {
    fontSize: "0.875rem",
    color: "grey",
  },
}));
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#4490ba", //theme.palette.getContrastText(purple[500]),
    backgroundColor: "#4490ba", //purple[500],
    "&:hover": {
      backgroundColor: "#4991A8", //purple[700]
    },
  },
}))(Button);
const rows = [
  {Bookmaker:TwoBet, Bonus:'Oddsbonus: 100% opptil 1.200kr',Omsetningskrav:"5x bonus", odds:'1.40 x 3'},
  {Bookmaker:expert, Bonus:'Oddsbonus: 100% opptil 1.000kr',Omsetningskrav:"6x bonus", odds:'1.75'},
  {Bookmaker:leovegas, Bonus:'Oddsbonus: 100% opptil 3.000kr',Omsetningskrav:"4x bonus", odds:'1.80'},
  {Bookmaker:bethard, Bonus:'Oddsbonus: 100% opptil 1.000kr',Omsetningskrav:"8x bonus", odds:'1.80'},
  {Bookmaker:expert, Bonus:'Oddsbonus: 100% opptil 500kr',Omsetningskrav:"10x bonus", odds:'1.80'},
  {Bookmaker:bet365, Bonus:'Oddsbonus: 100% opptil 1.000kr',Omsetningskrav:"10x bonus", odds:'1.80'},
  {Bookmaker:TwoBet, Bonus:'Oddsbonus: 500% opptil 500kr',Omsetningskrav:"6x bonus", odds:'1.75'},
  {Bookmaker:bet365, Bonus:'Oddsbonus: 100% opptil 500kr',Omsetningskrav:"8x bonus", odds:'1.80'},
  {Bookmaker:expert, Bonus:'Oddsbonus: 100% opptil 500kr',Omsetningskrav:"8x bonus", odds:'1.60'},
  {Bookmaker:TwoBet, Bonus:'Oddsbonus: 1.000kr i gratisspill',Omsetningskrav:"3x bonus", odds:'1.50'},
  {Bookmaker:expert, Bonus:'Oddsbonus: 100% opptil 1.200kr',Omsetningskrav:"5x bonus", odds:'1.50'},
  {Bookmaker:TwoBet, Bonus:'Oddsbonus: 100% opptil 1.000kr + 250 kr gratisspill',Omsetningskrav:"6x bonus", odds:'1.50'},
  {Bookmaker:leovegas, Bonus:'Oddsbonus: 500% opptil 500kr',Omsetningskrav:"5x bonus", odds:'1.40 x 3'},
  {Bookmaker:TwoBet, Bonus:'Oddsbonus: Sett inn 200kr, få 250kr gratisspill - helt til du vinner',Omsetningskrav:"1x bonus", odds:'1.50'},  
  {Bookmaker:TwoBet, Bonus:'Oddsbonus: 100% opptil 1.000kr',Omsetningskrav:"10x bonus", odds:'1.80'},
  {Bookmaker:leovegas, Bonus:'Oddsbonus: 100% opptil 5.000kr',Omsetningskrav:"16x bonus", odds:'2.00'}, 
  {Bookmaker:TwoBet, Bonus:'Oddsbonus: 100% opptil 1.000kr',Omsetningskrav:"10x bonus", odds:'1.50'},
  {Bookmaker:expert, Bonus:'Oddsbonus: Sett inn 200kr, få 3 x 200kr gratisspill',Omsetningskrav:"Ingen krav", odds:'1.50 '},
  {Bookmaker:bet365, Bonus:'Oddsbonus: 5 x 100kr gratisspill',Omsetningskrav:"Ingen krav", odds:'1.80'},
  {Bookmaker:expert, Bonus:'Oddsbonus: 1.000 kr gratisspillr',Omsetningskrav:"Ingen krav", odds:'1.80'},
  {Bookmaker:TwoBet, Bonus:'Oddsbonus: 100% opptil 900kr',Omsetningskrav:"5x bonus", odds:'1.40'},
  {Bookmaker:expert, Bonus:'Oddsbonus: 100% opptil €100',Omsetningskrav:"6x bonus", odds:'1.70'},
  {Bookmaker:bet365, Bonus:'Oddsbonus: 50% opptil 250kr',Omsetningskrav:"8x bonus", odds:'1.50'},

]
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
function BetDetails(props) {
  const classes = useStyles();

  useEffect(() => {
    let { id } = props.match.params;
  }, []);

// console.log('bonus', props.bonus)
  return (
    <div>
      <Header />
      <Container>
        <h1>Bet Details</h1>
        <Row
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Col sm>
            <Row style={{ justifyContent: "center" }}>
              <img width="250px" src={img} />
            </Row>
          </Col>
          <Col sm style={{ textAlign: "center" }}>
            <h3 className="stats-card-content">Bet: Liverpool to win!</h3>
            <Row>
              <Col>
                <span className={classes.label}>Match:</span>
              </Col>
              <Col>
                <span className={classes.value}>Liverpool – Chelsea</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className={classes.label}>Time:</span>
              </Col>
              <Col>
                <span className={classes.value}>10.02.20 18.00</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className={classes.label}>Odds: </span>
              </Col>

              <Col>
                <span className={classes.value}>1.55</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className={classes.label}>Stake:</span>
              </Col>
              <Col>
                <span className={classes.value}>9</span>
              </Col>
            </Row>
          </Col>

          <Col sm style={{ marginLeft: 5, marginRight: 5 }}>
            <h3 className="stats-card-content">Bet Description</h3>

            <Row>
              <Col>
                <span className={classes.value}>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam.
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: 40,
            marginBottom: 40,
            textAlign: "center",
            padding: 10,
          }}
        >
          <Col sm>
            <img src={leovegas} alt="leovegas" />
          </Col>
          <Col>
            <span>Bonus</span>
            <h3>100% BONUS UP TO 300€</h3>
          </Col>
          <Col sm>
            <ColorButton
              size="small"
              style={{
                fontSize: 10,
                color: "white",
                width: "80%",
                marginTop: 8,
                height: 30,
                marginBottom: 7,

                height: 50,
              }}
              variant="contained"
              color="primary"
            >
              JOIN BET
            </ColorButton>
            <span style={{ fontSize: 12 }}>www.leovegas.com</span>
          </Col>
        </Row>
        <div className="container" style={{ textAlign: "center" }}>
          <Slider {...settings1}>
            {props.bonus.length > 0 && props.bonus.map((item, key) => (
              <Paper className="home-paper-new" key={key}>
                <div style={{ width: "90%", padding: 8, textAlign: "center" }}>
                  <img
                    style={{
                      display: "inline-block",
                      width: "100px",
                      height:'80px'
                    }}
                    src={item.image}
                  />
                </div>
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
                <ColorButton
                  size="small"
                  style={{
                    color: "white",
                    width: "80%",
                    marginTop: 8,
                    height: 45,

                    marginBottom: 7,
                  }}
                  // style={{
                  //   fontSize: 10,
                  //   color: "white",
                  //   width: "80%",
                  //   marginTop: 8,
                  //   height: 30,
                  //   marginBottom: 7,
                  // }}
                  variant="contained"
                  color="primary"
                  // onClick={e => handleClickOpen(e, item)}
                >
                  CLAIM BONUS
                </ColorButton>
              </Paper>
            ))}
          </Slider>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
const mapStateToProps = (store) => {
  return {
    bonus: store.bonusReducer.bonus,

  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addBonus: (data) => dispatch(addBonus(data)),
//     getBonus: () => dispatch(getBonus()),
//     deleteBounces: (data) => dispatch(deleteBounces(data)),
//     getBookie: () => dispatch(getBookie()),
//     updateBonus: (data, id) => dispatch(updateBonus(data, id)),
//   };
// };
export default connect(mapStateToProps , null)(BetDetails);
