import React, { useState, useEffect } from "react";
import {
  CustomInput,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import axios from "axios";
import apiEndpoints from "../resources/apiEndpoins";

const EditBetForm = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    call() {
      props.onSave(bet, bookiesList, leaguesList, sportsList);
    }
  }));

  const [bet, setBet] = useState(props.bet);
  const [bookiesList, setBookiesList] = useState([]);
  const [leaguesList, setLeaguesList] = useState([]);
  const [sportsList, setSportsList] = useState([]);

  const onSelectChange = (action, event) => {
    let itemId = event.target.value;
    let name, link;
    if (action == "bookie") {
      name = "bookie";
      link = apiEndpoints.BOOKIE_API + "/" + itemId;
    } else if (action == "sport") {
      name = "sport";
      link = apiEndpoints.SPORT_API + "/" + itemId;
    } else if (action == "league") {
      name = "league";
      link = apiEndpoints.LEAGUE_API + "/" + itemId;
    }

    setBet({ ...bet, [name]: link });
  };

  const handleInputChange = event => {
    // console.log(event.target);
    const { name, value } = event.target;

    setBet({ ...bet, [name]: value });
  };

  const handleInputCheck = event => {
    //console.log(event.target);
    const { name, checked } = event.target;

    setBet({ ...bet, [name]: checked });
  };

  useEffect(() => {
    axios
      .get(apiEndpoints.BOOKIE_API)
      .then(res => {
        setBookiesList(res.data._embedded.bookies);
      })
      .catch(error => {
        alert(error);
      });

    axios
      .get(apiEndpoints.LEAGUE_API)
      .then(res => {
        setLeaguesList(res.data._embedded.leagues);
      })
      .catch(error => {
        alert(error);
      });

    axios
      .get(apiEndpoints.SPORT_API)
      .then(res => {
        setSportsList(res.data._embedded.sports);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  return (
    <Form>
      <Row form>
        <Col md={8}>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="kickoff-id">Kickoff</Label>
                <Input
                  type="date"
                  name="kickOffDate"
                  id="kickoff-id"
                  value={bet.kickOffDate}
                  onChange={handleInputChange}
                />
                <Input
                  type="time"
                  name="kickOffTime"
                  id="kickoff-time-id"
                  value={bet.kickOffTime}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="match-id">Match</Label>
                <Input
                  //valid
                  type="text"
                  name="matchDesc"
                  id="match-id"
                  value={bet.matchDesc}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="game-id">Bet</Label>
                <Input
                  //invalid
                  type="text"
                  name="betDesc"
                  id="game-id"
                  value={bet.betDesc}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="gametype-id">Bet Type</Label>
                <Input
                  type="text"
                  name="betType"
                  id="gametype-id"
                  value={bet.betType}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="sport-id">Sport</Label>
                {/* <Input
                  type="text"
                  name="sport"
                  id="sport-id"
                  value={bet.sport}
                  onChange={handleInputChange}
                /> */}

                <Input
                  type="select"
                  name="sport"
                  id="sport-edit"
                  defaultValue={bet.sportId}
                  onChange={e => onSelectChange("sport", e)}
                >
                  {sportsList.map((item, key) => (
                    <option id={key} key={item.sportId} value={item.sportId}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="league-id">League</Label>
                {/* <Input
                  type="text"
                  name="league"
                  id="league-id"
                  value={bet.league}
                  onChange={handleInputChange}
                /> */}

                <Input
                  type="select"
                  name="league"
                  id="league-edit"
                  defaultValue={bet.leagueId}
                  onChange={e => onSelectChange("league", e)}
                >
                  {leaguesList.map((item, key) => (
                    <option id={key} key={item.leagueId} value={item.leagueId}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="odds-id">Odds</Label>
                <Input
                  type="number"
                  name="oddsPrice"
                  id="odds-id"
                  value={bet.odds}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="stake-id">Stake</Label>
                <Input
                  type="number"
                  name="stake"
                  id="stake-id"
                  value={bet.stake}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="stake-id">Bookmaker</Label>

                {/* <Input
                  type="text"
                  name="bookie"
                  id="bookie-id"
                  value={bet.bookie}
                  onChange={handleInputChange}
                /> */}
                <Input
                  type="select"
                  name="bookie"
                  id="bookie-edit"
                  defaultValue={bet.bookieId}
                  onChange={e => onSelectChange("bookie", e)}
                >
                  {bookiesList.map((item, key) => (
                    <option id={key} key={item.bookieId} value={item.bookieId}>
                      {item.name}
                    </option>
                  ))}
                </Input>

                {/* <AutoSuggestField
                  onChange={handleInputAutoSuggest}
                  list={bookiesList}
                  label={"name"}
                  id={"bookieId"}
                /> */}
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup check>
                <CustomInput
                  type="checkbox"
                  name="isPremium"
                  id="ispremium-id"
                  bsSize="lg"
                  label="Premium"
                  checked={bet.isPremium}
                  onChange={handleInputCheck}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleText">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="exampleText"
              value={bet.description}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
});

export default EditBetForm;
