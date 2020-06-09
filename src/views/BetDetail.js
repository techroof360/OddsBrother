import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Cards from "./Cards";
// import axios from "axios";
// import apiEndpoints from "../resources/apiEndpoins";
import { Container, Col, Row } from "reactstrap";
// import Twitter from "@material-ui/icons/Twitter";
import Card from "@material-ui/core/Card";
// import DateTime from "../components/DateTime";
import img from '../images/22bet.png';

const ColorButton = withStyles(theme => ({
  root: {
    color: "limegreen",
    marginTop: 25,
    backgroundColor: "limegreen",
    "&:hover": {
      backgroundColor: "forestgreen"
    }
  }
}))(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(3)
  }
}));

const BetDetail = props => {


  return (
    <Container>
      <Row >
        <Col xs="9">
          <Card className="bonus-card">
            <div className="bet-detail-divs">
              <div className="helper"></div>
              <div></div>
              <img
                className="bonus-image-icon"
                src={img}
                alt={"item.title"}
              />
            </div>

            <div className="bet-detail-divs">
              <p className="bet-detail-text-label" style={{ fontSize: 14 }}>
                BET: bet
              </p>
              <p className="bet-detail-text-label">match des</p>
              <p className="bonus-text-heading">Time: datetime</p>
              <p>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: "bold"
                  }}
                >
                  Odds: odds
                </p>
                <p className="bonus-text-heading">Units:  bet shake/10</p>
              </p>
            </div>

            <div className="bet-detail-divs">
              <p className="bet-detail-text-label">Bet Description</p>
              <p className="bet-detail-text-value"> bet des</p>
            </div>
          </Card>

          <Card className="bonus-card">
            <div className="bet-detail-bonus-divs">
              <div className="helper"></div>
              <img
                className="bonus-image-icon"
                src={img}
                alt={"item.title"}
              />
            </div>

            <div className="bet-detail-bonus-divs"></div>
            <div className="bet-detail-bonus-divs"></div>

      

            <div className="bet-detail-bonus-divs" style={{ marginTop: 10 }}>
              <p>
                <a
             
                  target={"_blank"}
                  style={{ textDecoration: "none" }}
                >
                  <ColorButton
                    className="bonus-button"
                    variant="contained"
                    color="primary"
                  >
                    Join Bet
                  </ColorButton>
                </a>
              </p>
            </div>
          </Card>
        </Col>
        <Col>
          <Cards />
        </Col>
      </Row>
    </Container>
  );
};

export default BetDetail;
