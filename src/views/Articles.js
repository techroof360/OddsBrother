import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Cards from "./Cards";
import axios from "axios";
import apiEndpoints from "../resources/apiEndpoins";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(1)
  },
  root: {
    flexGrow: 1
  },
  imagepreview: {
    //width: "100%",
    maxHeight: 500,
    marginBottom: 10
  },
  articlePopup: {
    minWidth: 350
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Articles = props => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const [open, setOpen] = React.useState(false);

  const [pagination, setPagination] = useState({});

  const [imageSrc] = React.useState({});

  const [article] = React.useState({});

  const handleClickOpen = (e, article) => {
    // let src = require("../image-uploads/" + article.imageName);
    // setImageSrc(src);
    // setArticle(article);
    // setOpen(true);
    e.preventDefault();
    let url = window.location.href.split("/");

    url = url[0] + "/article-detail/" + article.articleId;

    window.open(url, "_self");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadData = pageNo => {
    axios
      .get(
        apiEndpoints.ARTICLE_API +
          "?page=" +
          pageNo +
          "&size=5&sort=articleId,desc"
      )
      .then(res => {
        setData(res.data._embedded.articles);

        setPagination({
          ...pagination,
          ["totalPages"]: res.data.page.totalPages - 1,
          ["currentPage"]: res.data.page.number
        });
      });
  };

  const doPagination = (e, action) => {
    e.preventDefault();
    //console.log(pagination);
    if (action === "next") {
      if (pagination.currentPage === pagination.totalPages) {
        return;
      }
      loadData(pagination.currentPage + 1);
    } else {
      if (pagination.currentPage === 0) {
        return;
      }
      loadData(pagination.currentPage - 1);
    }
  };

  const [imagesPath, setImagesPath] = useState();
  useEffect(() => {
    loadData(0);
    axios.get(apiEndpoints.IMAGES_PATH).then(res => {
      setImagesPath(res.data);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col xs="9" id="articles-left-col">
          {data.map((article, index) => {
            if (index === 0)
              return (
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  {/* <a
                    href=""
                    onClick={e => handleClickOpen(e, article)}
                    style={{ textDecoration: "none" }}
                  > */}
                  <div
                    //onClick={() => handleClickOpen(article)}
                    className="one-col-grid-item"
                  >
                    <img
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      src={imagesPath + article.imageName}
                      title={article.title}
                      alt={article.title}
                    />

                    <div
                      style={{
                        fontFamily: "Alegrya Sans",
                        color: "#424242",
                        height: "20%",
                        textAlign: "left"
                      }}
                    >
                      <p style={{ fontSize: "14px", marginTop: 5 }}>
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
                        <span style={{ marginLeft: 5, marginRight: 5 }}>|</span>
                        <span
                          style={{
                            fontFamily: "Nunito Sans",
                            color: "#000000"
                          }}
                        >
                          {" "}
                          {article.leagueName}{" "}
                        </span>
                      </p>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "14px",
                          fontFamily: "Nunito Sans",
                          fontWeight: "bold",
                          color: "#212121"
                        }}
                      >
                        {article.title}
                      </p>
                    </div>
                  </div>
                  {/* </a> */}
                </Grid>
              );
          })}

          <Grid container className={classes.root} id="articles-grid">
            <Grid item xs={12}>
              <Grid container justify="center" spacing={4}>
                {data.map((article, index) => {
                  if (index < 5 && index > 0)
                    return (
                      <Grid
                        key={article.articleId}
                        item
                        className="two-col-grid-item"
                      >
                        <a
                          href=""
                          onClick={e => handleClickOpen(e, article)}
                          style={{ textDecoration: "none" }}
                        >
                          <div>
                            <img
                              style={{
                                maxHeight: "100%",
                                maxWidth: "100%"
                              }}
                              src={imagesPath + article.imageName}
                              title={article.title}
                            />

                            <div
                              style={{
                                fontFamily: "Alegrya Sans",
                                color: "#424242",

                                maxHeight: 50
                              }}
                            >
                              <p style={{ fontSize: "14px", marginTop: 5 }}>
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
                                  {" "}
                                  {article.leagueName}{" "}
                                </span>
                              </p>
                              <p
                                style={{
                                  textAlign: "center",
                                  fontSize: "14px",
                                  fontFamily: "Nunito Sans",
                                  fontWeight: "bold",
                                  color: "#212121"
                                }}
                              >
                                {article.title}
                              </p>
                            </div>
                          </div>
                        </a>
                      </Grid>
                    );
                })}
              </Grid>
            </Grid>
          </Grid>

          <div className="articles-pagination">
            <a href="#" onClick={e => doPagination(e, "previous")}>
              Previous
            </a>
            <span>
              {" "}
              [{pagination.currentPage} of {pagination.totalPages}]{" "}
            </span>
            <a href="#" onClick={e => doPagination(e, "next")}>
              Next
            </a>
          </div>

          {/* <div style={{ marginTop: 50, marginLeft: 60 }}>
            {data.map((article, index) => {
              if (index > 5)
                return (
                  <div key={index}>
                    <span style={{ fontSize: 12 }}>
                      <a
                        href=""
                        onClick={e => handleClickOpen(e, article)}
                        style={{ width: "100%" }}
                      >
                        {article.title}
                      </a>
                    </span>
                  </div>
                );
            })}
          </div> */}
        </Col>

        <Col>
          <Cards />
        </Col>
      </Row>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogTitle id="responsive-dialog-title">{article.title}</DialogTitle>
        <DialogContent className={classes.articlePopup}>
          <DialogContentText>
            <img
              className={classes.imagepreview}
              src={imageSrc}
              alt={article.imageName}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: article.category
              }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Articles;
