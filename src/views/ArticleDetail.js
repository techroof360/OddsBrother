import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cards from "./Cards";
import axios from "axios";
import apiEndpoints from "../resources/apiEndpoins";
import { Container, Col, Row } from "reactstrap";
import Twitter from "@material-ui/icons/Twitter";

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(3)
  },

  imagepreview: {
    maxHeight: 500,
    maxWidth: "100%",
    marginBottom: theme.spacing(2)
  }
}));

const ArticleDetail = props => {
  const [article, setArticle] = React.useState({});
  const [imageSrc, setImageSrc] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    let url = window.location.href.split("/");
    let articleId = url[4];

    axios.get(apiEndpoints.IMAGES_PATH).then(resPath => {
      axios.get(apiEndpoints.ARTICLE_API + articleId).then(res => {
        setArticle(res.data);
        setImageSrc(resPath.data + res.data.imageName);
      });
    });
  }, []);

  return (
    <Container>
      
      <Row className={classes.margin}>
        <Col xs="9">
          <div>
            <div style={{ width: "100%", textAlign: "left" }}>
              <img
                className={classes.imagepreview}
                src={imageSrc}
                alt={article.imageName}
              />
            </div>
            <p style={{ fontSize: "14px", marginTop: 5, textAlign: "left" }}>
              <span
                style={{
                  color: "#9e9e9e",
                  fontFamily: "Nunito Sans",
                  fontWeight: "normal",
                  textDecoration: "underline"
                }}
              >
                {article.oddsText}
              </span>
              <span
                style={{
                  marginLeft: 5,
                  marginRight: 5
                }}
              >
                |
              </span>
              <span
                style={{
                  fontFamily: "Nunito Sans",
                  color: "#000000"
                }}
              >
                {article.leagueName}
              </span>
              <Twitter style={{ color: "grey", marginLeft: 5 }} />
            </p>

            <div
              style={{
                background: "#ffffff",
                padding: 10,
                marginBottom: 10,
                fontWeight: "bold"
              }}
            >
              <p> {article.title} </p>
              <p> {article.heading} </p>
            </div>

            <div
              style={{
                width: "10%",
                border: "solid 1px",
                color: "grey",
                marginBottom: 10
              }}
            ></div>

            <div
              style={{
                background: "#ffffff",
                padding: 10,
                marginBottom: 10
              }}
              dangerouslySetInnerHTML={{
                __html: article.category
              }}
            />
          </div>
        </Col>
        <Col>
          <Cards />
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleDetail;
