import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import DataGrid from "../components/DataGrid";
// import axios from "axios";
// import apiEndpoints from "../resources/apiEndpoins";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import content from "../resources/properties";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import appConstants from "../resources/AppConstants";
import Cards from "./Cards";
// import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// import img from '../images/nfl.jpg';
import Header from './Header';
import '../style/responsive.css';
import Footer from './footer';
import {connect} from 'react-redux';
import { getBit } from '../redux/actions/ManageBitAction';
const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(3)
  },
  redCls: {
    color: "red"
  },
  greenCls: {
    color: "green"
  },
  greyCls: {
    color: "grey"
  },
  heading: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    textAlign: "center",
    width: "100%"
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "bold"
  },
  value: {
    fontSize: "0.875rem",
    color: "grey"
  }
}));

const Spreadsheet = props => {
  const classes = useStyles();
  // const [bets, setBets] = useState([]);
  const [stats, setStats] = useState([]);

  const onGridReady = params => {
    params.api.sizeColumnsToFit();
    params.api.addEventListener("rowClicked", e => openBetDetail(e.data.betId));
  };

  const openBetDetail = betId => {
    let url = window.location.href.split("/");

    url = url[0] + "/bet-detail/" + betId;

    window.open(url, "_self");
  };

  const columnDefs = [
    {
      headerName: "Time",
      field: "kick_off_date",
      minWidth: 50,
    
    },
    { headerName: "Game", field: "match_desc", minWidth: 50 },
    { headerName: "Bet", field: "bet_desc", minWidth: 50 },
    { headerName: "Stake", field: "stake", minWidth: 50 },
    { headerName: "Odds", field: "odds", minWidth: 50 },

    {
      headerName: "Status",
      field: "status",
      minWidth: 50,
  
    }
  ];

  useEffect(() => {
    props.getBit();
  
  }, []);
// console.log('bets', bets)
  return (
    <div>
      <Header />

    
    <Container>
      <Row>
        <Col xs="12" id="spreadsheet-left-col">
          <h1>Spreadsheet</h1>
          <Row>
            {/* <Col style={{textAlign:'center'}}>
              <img
             style={{borderRadius:'100%' , width:180, height:180}}
                // className="spreadhsheet-image"
                src={img}
                alt="img"
              />
            </Col> */}
            <Col>
              <Card className="stats-card">
                <CardContent>
                  <div className="stats-card-content">Total Bets</div>
                  <Row>
                    <Col>
                      <span className={classes.label}>Bets:</span>
                    </Col>

                    <Col>
                      <span className={classes.value}>{stats.bets}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className={classes.label}>Won:</span>
                    </Col>

                    <Col>
                      <span className={classes.value}>{stats.won}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className={classes.label}>Lost:</span>
                    </Col>

                    <Col>
                      <span className={classes.value}>{stats.lost}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span
                        className={classes.label}
                        style={{
                          color: "#32CD32"
                        }}
                      >
                        Hitrate:
                      </span>
                    </Col>
                    <Col>
                      <span
                        className={classes.value}
                        style={{
                          color: "#32CD32"
                        }}
                      >
                        {stats.hitRate}
                      </span>
                    </Col>
                  </Row>
                </CardContent>
              </Card>
            </Col>

            <Col>
              <Card className="stats-card">
                <CardContent>
                  <div className="stats-card-content">Results</div>

                  <Row>
                    <Col>
                      <span className={classes.label}>Units In:</span>
                    </Col>

                    <Col>
                      <span className={classes.value}>{stats.unitsIn}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className={classes.label}>Units Out:</span>
                    </Col>

                    <Col>
                      <span className={classes.value}>{stats.unitsOut}</span>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <span
                        className={classes.label}
                        style={{
                          color: "#32CD32"
                        }}
                      >
                        Profit:
                      </span>
                    </Col>
                    <Col>
                      <span
                        className={classes.value}
                        style={{
                          color: "#32CD32"
                        }}
                      >
                        {stats.profit}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span
                        className={classes.label}
                        style={{
                          color: "#32CD32"
                        }}
                      >
                        ROI:
                      </span>
                    </Col>

                    <Col>
                      <span
                        className={classes.value}
                        style={{
                          color: "#32CD32"
                        }}
                      >
                        {stats.roi}
                      </span>
                    </Col>
                  </Row>
                </CardContent>
              </Card>
            </Col>
          </Row>
          <Typography variant="h6" className={classes.heading}></Typography>
          <DataGrid
          
            data={props.bets}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          />
        </Col>

        <Col>
          <Cards />
        </Col>
      </Row>
    </Container>
    <Footer/>
    </div>
  );
};

Spreadsheet.propTypes = {
  onChange: PropTypes.func
};
const mapDispatchToProps = (dispatch)=>{
  return {
    getBit : () => dispatch(getBit()),
  }
}  
const mapStateToProps = store =>{
  return {
    bets:store.betsReducer.manageBits,
    auth:store.auth
  }
}
export default connect(mapStateToProps , mapDispatchToProps)(Spreadsheet);
