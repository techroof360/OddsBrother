import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
// import Cards from "./Cards";
import Card from "@material-ui/core/Card";
import apiEndpoints from "../resources/apiEndpoins";
import { Container, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
// import Footer from "./footer";

const ColorButton = withStyles(theme => ({
  root: {
    color: "limegreen",
    // marginTop: 15,
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

const Bonuses = props => {
  // const classes = useStyles();

  const [bonuses, setBonuses] = useState([]);
  const [imagesPath, setImagesPath] = useState();
  useEffect(() => {
    axios.get(apiEndpoints.IMAGES_PATH).then(res => {
      setImagesPath(res.data);
    });
    axios.get(apiEndpoints.BONUSES_API + "?sort=rank,asc").then(res => {
      setBonuses(res.data._embedded.bonuses);
    });
  }, []);

  return (
    <div >
    <Container>
      <Row>
        <Col xs="12" id="bonus-left-col">
          {bonuses.map((item, key) => (
            <Card className="bonus-card" key={key}>
              <div className="image-col-divs">
                <div className="helper"></div>

                <img
                  className="bonus-image-icon"
                  src={imagesPath + item._embedded.bookie.poster}
                  alt={item.title}
                />
              </div>

              <div style={{ marginTop: 10 }} className="bonus-col-divs">
                <p className="bonus-text-heading">Bonus offer</p>
                <p className="bonus-text-value bonus-title">{item.title}</p>
              </div>

              <div style={{ marginTop: 10 }} className="bonus-col-divs">
                <p className="bonus-text-heading">Turnover Required</p>
                <p className="bonus-text-value">{item.wagering}x</p>
              </div>

              <div style={{ marginTop: 10 }} className="bonus-col-divs">
                <p className="bonus-text-heading">Lowest Odds</p>
                <p className="bonus-text-value">{item.odds}</p>
              </div>

              <div className="image-col-divs">
                <div className="helper"></div>
                <p style={{ display: "inline-block" }}>
                  <a
                    href={item.affiliateUrlHome}
                    target={"_blank"}
                    style={{ textDecoration: "none" }}
                  >
                    <ColorButton
                      className="bonus-button"
                      variant="contained"
                      color="primary"
                    >
                      {item.bonusText}
                    </ColorButton>
                  </a>
                </p>
                <div className="bonus-text-url">
                  {item._embedded.bookie.urlHome}
                </div>
              </div>
            </Card>
          ))}
        </Col>
   
      </Row>
    </Container>

    </div>
  );
};

Bonuses.propTypes = {
  onChange: PropTypes.func
};

export default Bonuses;
