import React, { useState, useEffect } from "react";
import axios from "axios";
import apiEndpoints from "../resources/apiEndpoins";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DataGrid from "../components/DataGrid";
import AppConstants from "../resources/AppConstants";
import Dialog from "@material-ui/core/Dialog";
import "../style/grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appConstants from "../resources/AppConstants";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { faMinusCircle, faTimesCircle, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {getBookie} from '../redux/actions/ManageBookieAction';
import {getLeague} from '../redux/actions/ManageLeagueAction';
import {getSport} from '../redux/actions/ManageSportAction';
import { CustomInput, FormGroup,Label,Input,Button,Modal,Form,ModalHeader, ModalBody,ModalFooter,Container,Row,Col,Alert} from "reactstrap";
import {connect} from 'react-redux';
import Header from './Header'
import {addBit, getBit , deleteBet , updateBets , updateBetsStatus} from '../redux/actions/ManageBitAction';
import { toast } from "react-toastify";
import '../style/responsive.css';
import Footer from "./footer";


const useStyles = makeStyles(theme => ({
  modal: {
    height: 500
  },
  imagepreview: {
    maxWidth: "30%"
  },
  margin: {
    margin: theme.spacing(0)
  },
  addButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  error: {
    color: "#FF0000"
  }
}));

const ManageBets = props => {
  const classes = useStyles();

  const [gridApi, setGridApi] = useState([]);

  const onGridReady = params => {
    params.api.sizeColumnsToFit();
    setGridApi(params.api);
  };

  function tConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[3] = ""; // remove seconds
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  const hideField =   props.auth.type == "1"   ? false : true;
  //  hide: hideField, 
  const columnDefs = [
    {
      headerName: "Kickoff",
      field: "kick_off_date",
      minWidth: 50,
 
    },
    { headerName: "Match", field: "match_desc", minWidth: 50 },
    { headerName: "Bet", field: "bet_desc", minWidth: 50 },
    { headerName: "Odds", field: "odds", minWidth: 50 },
    { headerName: "Stake", field: "stake", minWidth: 50 },
    {
      headerName: "Status",
      field: "status",
      minWidth: 100,
      hide: hideField,
      cellRendererFramework: function(params) {
        let wonIconColor, lostIconColor, voidIconColor;
        let iconSize = "fa-lg";
        switch (params.data.status) {
          case appConstants.WON_STATUS: {
            wonIconColor = "green";
            lostIconColor = voidIconColor = "grey";
            break;
          }
          case appConstants.LOST_STATUS: {
            lostIconColor = "red";
            wonIconColor = voidIconColor = "grey";
            break;
          }
          case appConstants.VOID_STATUS: {
            voidIconColor = "blue";
            wonIconColor = lostIconColor = "grey";
            break;
          }

          default: {
            wonIconColor = lostIconColor = voidIconColor = "grey";
            break;
          }
        }

        return (
          <div className="icons-block">
            <a
              href="#"
              //  onClick={() => onActionBet(params.data, appConstants.WON_STATUS)}
              // onClick={()=> console.log('params', params.data ,  appConstants.WON_STATUS )}
              onClick={()=>props.updateBetsStatus(params.data, appConstants.WON_STATUS)}
            >
              <FontAwesomeIcon
                className={iconSize}
                color={wonIconColor}
                icon={faCheckCircle}
              />
            </a>{" "}
            <a
              href="#"
              // onClick={() => onActionBet(params.data, appConstants.LOST_STATUS)}
              onClick={()=>props.updateBetsStatus(params.data, appConstants.LOST_STATUS)}
            >
              <FontAwesomeIcon
                className={iconSize}
                color={lostIconColor}
                icon={faTimesCircle}
              />
            </a>{" "}
            <a
              href="#"
              // onClick={() => onActionBet(params.data, appConstants.VOID_STATUS)}
              onClick={()=>props.updateBetsStatus(params.data, appConstants.VOID_STATUS)}

            >
              <FontAwesomeIcon
                className={iconSize}
                color={voidIconColor}
                icon={faMinusCircle}
              />
            </a>
          </div>
        );
      }
    },
    {
      headerName: "Action",
      field: "stake",
      minWidth: 100,
      hide:hideField,
      cellRendererFramework: function(params) {
        return (
          <div className="icons-block">
            <IconButton
              aria-label="delete"
              className={classes.margin}
              onClick={() =>
                onDeleteEditAddClick(params.data, AppConstants.DELETE_ACTION)
              }
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              className={classes.margin}
              onClick={() =>
                onDeleteEditAddClick(params.data, AppConstants.EDIT_ACTION)
              }
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        );
      }
    }
  ];

  const [data, setData] = useState([]);

  const initialFormState = {
    match_desc: "",
    bet_desc: "",
    bet_type: "",
    odds: "",
    stake: "",
    description: "",
    kick_off_time: "",
    kick_off_date: "",
    bookie: "",
    sport: "",
    league: "",
    status:"1",
    is_premium:"",
    image:""
  };

  const [editBet, setEditBet] = useState({
    image:"",
    description: "",
    kick_off_date:"",
    kick_off_time:"",
    match_desc:"",
    bet_desc:"",
    bet_type:"",
    odds:"",
    stake:"",
    status:"",
    is_premium:false
  });
  const [addBet, setAddBet] = useState(initialFormState);

  const [isAddBetOpen, setIsAddBetOpen] = useState(false);
  const [isEditBetOpen, setIsEditBetOpen] = useState(false);

  // const [bookiesList, setBookiesList] = useState([]);
  // const [leaguesList, setLeaguesList] = useState([]);
  // const [sportsList, setSportsList] = useState([]);

  const [delConfirmation, setDelConfirmation] = useState({
    state: false,
    id: 0
  });

  const [actionConfirmation, setActionConfirmation] = useState({
    state: false,
    bet: null
  });

  // var imagesPath;

  const toggleActionConfirmation = () => {
    setActionConfirmation(!actionConfirmation);
  };

  const toggleConfirmation = () => {
    setDelConfirmation(!delConfirmation);
  };

  const toggleAddBet = () => {
    if (!isAddBetOpen) {
      setFileAdd(initialFileState);
    }

    setIsAddBetOpen(!isAddBetOpen);
  };

  const toggleEditBet = () => {
    setIsEditBetOpen(!isEditBetOpen);
  };

  

  const checkMimeType = (file, action) => {
    let err = "";
    const types = AppConstants.SUPPORTED_IMAGE_TYPES;
    if (types.every(type => file.type !== type)) {
      err = file.type + " is not a supported format\n";
      action === "add"
        ? setAddBet({ ...addBet, ["error"]: err })
        : setEditBet({ ...editBet, ["error"]: err });
      return false;
    } else {
      return true;
    }
  };

  const checkFileSize = (file, action) => {
    let size = AppConstants.MAX_FILE_SIZE;
    let err = "";
    if (file.size / 1000 > size) {
      err += file.type + " is too large, please pick a smaller file\n";
    }
    if (err !== "") {
      action === "add"
        ? setAddBet({ ...addBet, ["error"]: err })
        : setEditBet({ ...editBet, ["error"]: err });
      return false;
    } else {
      return true;
    }
  };

  const initialFileState = {
    imageUrl: "",
    isPreviewHidden: true,
    file: null
  };

  const initialFileStateEdit = {
    imageUrl: "",
    isPreviewHidden: true,
    file: null,
    hasFileChanged: false
  };

  const [fileAdd, setFileAdd] = useState(initialFileState);

  const [fileEdit, setFileEdit] = useState(initialFileStateEdit);

  const handleFileChangeAdd = ({ target: { files } }) => {
    //const [{ name }] = files;

    let file = files[0];

    if (checkMimeType(file, "add") && checkFileSize(file, "add")) {
      let reader = new FileReader();

      reader.onload = function(e) {
        setFileAdd({
          ...fileAdd,
          imageUrl: e.target.result,
          file: file,
          isPreviewHidden: false
        });
      };

      reader.readAsDataURL(file);
    }
  };


const handleFileChangeEdit = e =>{
  
  const image = e.target.files[0];
  let size = AppConstants.MAX_FILE_SIZE;
  const types = AppConstants.SUPPORTED_IMAGE_TYPES;
  let err = "";
   if (image.size / 1000 > size) {
     toast.error(" is too large, please pick a smaller file");
   } 
  else if(types.every(type => image.type !== type)){
    toast.error(AppConstants.IMAGES_VALIDATE)
   }else {

  setEditBet({...editBet, image})
}
}

  const deleteBet = () => {

  };

  const onDeleteEditAddClick = (betObj, action) => {
    switch (action) {
      case AppConstants.ADD_ACTION:
        toggleAddBet();
      
        // setTimeout(() => {
        //   setFormDate({ ...formData,
        //     image:"",
        //     description: "",
        //     kick_off_date:"",
        //     kick_off_time:"",
        //     match_desc:"",
        //     bet_desc:"",
        //     bet_type:"",
        //     odds:"",
        //     stake:"",
        //     status:"",
        //     is_premium:false });
        // }, 9000);
        break;

      case AppConstants.DELETE_ACTION:
        // console.log('bet id', betObj.id)
        props.deleteBet(betObj.id)
     
        break;

      case AppConstants.EDIT_ACTION: {
    
        setEditBet(betObj);

        setIsEditBetOpen(!isEditBetOpen);
        break;
      }
    }
  };

  const onActionBet = (betObj, status) => {
    betObj.status = status;
    setActionConfirmation({
      state: true,
      bet: betObj
    });
  };

  const actionBet = () => {
    let bet = actionConfirmation.bet;

    let id, link;

    id = bet._embedded.bookie.bookieId;
    link = apiEndpoints.BOOKIE_API + id;
    bet.bookie = link;
    id = bet._embedded.league.leagueId;
    link = apiEndpoints.LEAGUE_API + id;
    bet.league = link;
    id = bet._embedded.sport.sportId;
    link = apiEndpoints.SPORT_API + id;
    bet.sport = link;

    // axios.post(apiEndpoints.BET_API, actionConfirmation.bet).then(res => {
    //   setActionConfirmation({
    //     state: !actionConfirmation,
    //     bet: null
    //   });

    //   gridApi.gridOptionsWrapper.gridOptions.api.setRowData(
    //     data.map(bet => (bet.betId === res.data.betId ? res.data : bet))
    //   );
    // });
  };

  const [formData, setFormDate] = useState({
    image:"",
    description: "",
    kick_off_date:"",
    kick_off_time:"",
    match_desc:"",
    bet_desc:"",
    bet_type:"",
    odds:"",
    stake:"",
    status:'1',
    is_premium:false
  });
  const onAddBetSubmit = () => {
    if (
      // formData.image == null ||
      formData.match_desc === "" ||
      formData.bet_desc === "" ||
      formData.bet_type === "" ||
      formData.odds === "" ||
      formData.stake === "" ||
      formData.description === "" ||
      formData.kick_off_time === "" ||
      formData.kick_off_date === ""
    ) {
      toast.error("Please fill all fields & add image");
      // console.log('add bit err', formData)
    }else {
      // console.log('add bit send', formData)
      let data =  new FormData();
      data.append('image', formData.image);
      data.append('description', formData.description);
      data.append('kick_off_date', formData.kick_off_date);
      data.append('kick_off_time', formData.kick_off_time);
      data.append('match_desc', formData.match_desc);
      data.append('bet_desc', formData.bet_desc);
      data.append('bet_type', formData.bet_type);
      data.append('odds', formData.odds);
      data.append('stake', formData.stake);
      data.append('status', formData.status);
      data.append('is_premium', formData.is_premium);
      props.addBit(data)
      console.log('formData',formData)
      toggleAddBet();
    }
    var now = new Date();
    var date = new Date(addBet.kickOffDate);
    now.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    if (date < now) {
      toast.warn("Please select a future date");
    }
  };

  const onEditBetsSubmit = () => {
    if (
      editBet.match_desc === "" ||
      editBet.bet_desc === "" ||
      editBet.bet_type === "" ||
      editBet.odds === "" ||
      editBet.stake === "" ||
      editBet.description === "" ||
      editBet.kick_off_time === "" ||
      editBet.kick_off_date === "" ||
      editBet.is_premium === null
    ) {
      toast.error("Please fill all fields");

     }else{
      //  console.log('edit bit', editBet)
      let data =  new FormData();
      data.append('image', editBet.image);
      data.append('match_desc', editBet.match_desc);
      data.append('bet_desc', editBet.bet_desc);
      data.append('bet_type', editBet.bet_type);
      data.append('odds', editBet.odds);
      data.append('stake', editBet.stake);
      data.append('status', editBet.status);
      data.append('is_premium', editBet.is_premium);
      
      data.append('description', editBet.description);
      data.append('kick_off_time', editBet.kick_off_time);
      data.append('kick_off_date', editBet.kick_off_date);
      
      props.updateBets(editBet, data)
      setIsEditBetOpen(!isEditBetOpen);
    }

    // let id, link;

 



  };

  const onSelectChange = (action, event) => {
    let itemId = event.target.value;
    let name, link;
    if (action === "bookie") {
      name = "bookie";
      link = apiEndpoints.BOOKIE_API + itemId;
    } else if (action === "sport") {
      name = "sport";
      link = apiEndpoints.SPORT_API + itemId;
    } else if (action === "league") {
      name = "league";
      link = apiEndpoints.LEAGUE_API + itemId;
    }
    setEditBet({ ...editBet, [name]: link });
  };

  const onSelectChangeAdd = (action, event) => {
    let itemId = event.target.value;
    let name, link;
    if (action === "bookie") {
      name = "bookie";
      link = apiEndpoints.BOOKIE_API + "/" + itemId;
    } else if (action === "sport") {
      name = "sport";
      link = apiEndpoints.SPORT_API + "/" + itemId;
    } else if (action === "league") {
      name = "league";
      link = apiEndpoints.LEAGUE_API + "/" + itemId;
    }

    setAddBet({ ...addBet, [name]: link });
  };

  const handleInputChange = event => {
    // console.log(event.target);
    const { name, value } = event.target;

    setEditBet({ ...editBet, [name]: value });
  };

  const handleInputChangeAdd = event => {
    // console.log(event.target);
    const { name, value } = event.target;

    setAddBet({ ...addBet, [name]: value });
  };

  const handleInputCheck = event => {
    // console.log(event.target.checked);
    const { name, checked } = event.target;

    setEditBet({ ...editBet, [name]: checked });
  };

  const handleInputCheckAdd = event => {
    const { name, checked } = event.target;

    setFormDate({ ...formData, [name]: checked });
  };

  const reloadData = () => {
  
  };

  useEffect(() => {
    setData(props.bets);
    props.getBit();
    props.getBookie();
    props.getLeague();
    props.getSport();
  
  }, []);
  

const filehandler = e => {
  //  console.log('file', e.target.files[0])
  const image = e.target.files[0];
  let size = AppConstants.MAX_FILE_SIZE;
  const types = AppConstants.SUPPORTED_IMAGE_TYPES;
  // let err = "";
   if (image.size / 1000 > size) {
     toast.error(" is too large, please pick a smaller file");
   } 
  else if(types.every(type => image.type !== type)){
    toast.error(AppConstants.IMAGES_VALIDATE)
   }
   else {
 
  setFormDate({ ...formData, image });
  
   }
};
const onChange = e => {
  setFormDate({...formData, [e.target.name]:e.target.value})
};

  return (
    <div>

      <Header/>

    <Container>
      {/* bet action model  */}
      <Modal size="lg" isOpen={actionConfirmation.state}>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalBody>
          <Alert color="warning">Are you sure you want to action this bet ?</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={actionBet}>
          Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggleActionConfirmation}>
          Cancel
          </Button>
        </ModalFooter>
      </Modal>
{/* delete bet model  */}
      <Modal
        size="lg"
        isOpen={delConfirmation.state}
        toggle={toggleConfirmation}
      >
        <ModalHeader toggle={toggleConfirmation}>
        Confirmation
        </ModalHeader>
        <ModalBody>
          <Alert color="warning">Are you sure you want to delete ?</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteBet}>
          Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggleConfirmation}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
{/* add bit edit modelbox */}
      <Dialog size="lg" open={isEditBetOpen} fullScreen>
        <ModalHeader toggle={toggleEditBet}>
          Edit Bet
         
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="add-image">
                        Update image <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="file"
                        id="edit-image"
                        name="image"
                        label={editBet.image || "choose an image file"}
                        onChange={e =>handleFileChangeEdit(e)}
                      />
                      <p className={classes.error}>{editBet.error}</p>
              
                    </FormGroup>
                  </Col>

                  <Col md={8}>
                    <FormGroup>
                      <Label for="exampleText">Description</Label>
                      <Input
                        type="textarea"
                        name="description"
                        id="exampleText"
                        value={editBet.description}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="kickoff-id">Kickoff</Label>
                      <Input
                        type="date"
                        name="kick_off_date"
                        id="kickoff-id"
                        disabled
                        value={editBet.kick_off_date}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="time"
                        name="kick_off_time"
                        id="kickoff-time-id"
                        disabled
                        value={editBet.kick_off_time}
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
                        name="match_desc"
                        id="match-id"
                        value={editBet.match_desc}
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
                        name="bet_desc"
                        id="game-id"
                        value={editBet.bet_desc}
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
                        name="bet_type"
                        id="gametype-id"
                        value={editBet.bet_type}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="sport-id">Sport</Label>
                   

                      <Input
                        type="select"
                        name="sport"
                        id="sport-edit"
                        defaultValue={editBet.id}
                        onChange={e => onSelectChange("sport", e)}
                      >
                        {props.sports.length > 0 && props.sports.map((item, key) => (
                          <option
                            id={key}
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="league-id">League</Label>
              
                      <Input
                        type="select"
                        name="league"
                        id="league-edit"
                        defaultValue={editBet.id}
                        onChange={e => onSelectChange("league", e)}
                      >
                        {props.league.length > 0 && props.league.map((item, key) => (
                          <option
                            id={key}
                            key={item.id}
                            value={item.id}
                          >
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
                        name="odds"
                        id="odds-id"
                        value={editBet.odds}
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
                        value={editBet.stake}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="stake-id">Bookmaker</Label>
                   
                      <Input
                        type="select"
                        name="bookie"
                        id="bookie-edit"
                        defaultValue={editBet.id}
                        onChange={e => onSelectChange("bookie", e)}
                      >
                        {props.bookies.length > 0 &&  props.bookies.map((item, key) => (
                          <option
                            id={key}
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        ))}
                      </Input>

                 
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup check>
                      <CustomInput
                        type="checkbox"
                        name="is_premium"
                        id="ispremium-id"
                        bsSize="lg"
                        label="Premium"
                        checked={editBet.is_premium}
                        onChange={handleInputCheck}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
         
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>onEditBetsSubmit()}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggleEditBet}>
            Cancel
          </Button>
        </ModalFooter>
      </Dialog>
 {/* add bet modelbox */}
      <Dialog size="lg" open={isAddBetOpen} fullScreen>
        <ModalHeader toggle={toggleAddBet}>Add Bet </ModalHeader>
        
        <ModalBody >
          {/* <AddBetForm ref={addBetRef} onSave={onAddBetSubmit} /> */}
          <Form>
            <Row form>
              <Col>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="add-image">
                        Add image <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="file"
                        id="add-image"
                        name="image"
                        label={ "choose an image file"}
                         onChange={(e)=>filehandler(e)}
                      />
                      <p className={classes.error}>{addBet.error}</p>
                      <img
                        hidden={fileAdd.isPreviewHidden}
                        className={classes.imagepreview}
                        src={fileAdd.imageUrl}
                        alt="img"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="exampleText">Description</Label>
                      <Input
                        type="textarea"
                        name="description"
                        id="exampleText"
                        value={formData.description}
                        onChange={e=>onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="kickoff-id">Kickoff</Label>
                      <Input
                        type="date"
                        name="kick_off_date"
                        id="kickoff-id"
                        value={formData.kick_off_date}
                        onChange={e=>onChange(e)}
                      />

                      <Input
                        type="time"
                        name="kick_off_time"
                        id="kickoff-time-id"
                        value={formData.kick_off_time}
                        onChange={e=>onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="match-id">Match</Label>
                      <Input
                        // valid
                        type="text"
                        name="match_desc"
                        id="match-id"
                        value={formData.match_desc}
                        onChange={e=>onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="game-id">Bet</Label>
                      <Input
                        // invalid
                        type="text"
                        name="bet_desc"
                        id="game-id"
                        value={formData.bet_desc}
                        onChange={e=>onChange(e)}
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
                        name="bet_type"
                        id="gametype-id"
                        value={formData.bet_type}
                        onChange={e=>onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="sport-id">Sport</Label>
                
                      <Input
                        type="select"
                        name="sport"
                        id="sport-add"
                        onChange={e => onSelectChangeAdd("sport", e)}
                      >
                        {props.sports.length > 0 && props.sports.map((item, key) => (
                          <option
                            id={key}
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        ))}
                      </Input>

              
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="league-id">League</Label>

                      <Input
                        type="select"
                        name="league"
                        id="league-add"
                        onChange={e => onSelectChangeAdd("league", e)}
                      >
                        {props.league.length > 0 &&  props.league.map((item, key) => (
                          <option
                            id={key}
                            key={item.id}
                            value={item.id}
                          >
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
                        name="odds"
                        id="odds-id"
                        value={formData.odds}
                        onChange={e=>onChange(e)}
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
                        value={formData.stake}
                        onChange={e=>onChange(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="stake-id">Bookmaker</Label>
                      <Input
                        type="select"
                        name="bookie"
                        id="bookie-add"
                        onChange={e => onSelectChangeAdd("bookie", e)}
                      >
                        {props.bookies.length > 0 &&  props.bookies.map((item, key) => (
                          <option
                            id={key}
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        ))}
                      </Input>

                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup check>
                      <CustomInput
                        type="checkbox"
                        name="is_premium"
                        id="ispremium-id"
                        bsSize="lg"
                        label="Premium"
                        onChange={handleInputCheckAdd}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAddBetSubmit}>
            Add
          </Button>
          <Button color="secondary" onClick={toggleAddBet}>
           Cancel
          </Button>
        </ModalFooter>
      </Dialog>

      <Row>
        <Col>
         {props.auth.type == "1"    ?   
           <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => onDeleteEditAddClick(null, AppConstants.ADD_ACTION)}
          >
            ADD
          </Button>
           : null } 
          <DataGrid
            data={props.bets}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          />
        </Col>
      </Row>
    </Container> 
    <br></br>
    <Footer/>
    </div>
  );

};
ManageBets.propTypes = {
  onChange: PropTypes.func
};


const mapStateToProps = store =>{
  return{
    sports : store.sportReducer.sports,
    league: store.leagueReducer.league,
    bookies: store.bookieReducer.bookies,
    bets:store.betsReducer.manageBits,
    auth:store.auth
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    getBookie : () => dispatch(getBookie()),
    getSport: ()=> dispatch(getSport()),
    getLeague: () => dispatch(getLeague()),
    addBit : data => dispatch(addBit(data)),
    getBit : () => dispatch(getBit()),
    deleteBet : data => dispatch(deleteBet(data)),
    updateBets : (data , id) => dispatch(updateBets(data , id)) ,
    updateBetsStatus: (data , id) => dispatch(updateBetsStatus(data , id))

  }
}
export default connect(mapStateToProps , mapDispatchToProps)(ManageBets);
