import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios";
import Card from "@material-ui/core/Card";
import apiEndpoints from "../resources/apiEndpoins";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";


const ColorButton = withStyles(theme => ({
  root: {

    backgroundColor: "limegreen",
    "&:hover": {
      backgroundColor: "forestgreen"
    }
  }
}))(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },

  error: {
    color: "#FF0000"
  },

  cardText: {
    position: "absolute",
    width: "100%",
    bottom: 2
  }
}));

const Cards = props => {


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
    <Container id="right-cards">
      {bonuses.map((item, key) => (
        <Card className="right-bonus-card" key={key}>
          <div
            style={{
              height: "25%"
            }}
          >
            <img
              style={{
                maxHeight: "100%",
                marginTop: 5
              }}
              alt={item.title}
              src={imagesPath + item._embedded.bookie.poster}
            />
          </div>

          <div className="card-title">{item.title}</div>

          <div
            style={{
              height: "35%",
              marginTop: 0
            }}
          >
            <a
              href={item.affiliateUrlHome}
              target={"_blank"}
              style={{ textDecoration: "none" }}
            >
              <ColorButton
                size="small"
                style={{
                  tex: "white",
                  width: "60%",
                  height: "90%",
                  fontFamily: "Nunito Sans",
                  fontSize: "0.875rem"
                }}
                variant="contained"
                color="primary"
              >
                {item.bonusText}
              </ColorButton>
            </a>
          </div>
        </Card>
      ))}
    </Container>
  );
};

Cards.propTypes = {
  onChange: PropTypes.func
};

export default Cards;
