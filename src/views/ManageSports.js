import React, { useState, useEffect } from "react";
import axios from "axios";
import DataGrid from "../components/DataGrid";
import content from "../resources/properties";
import apiEndpoints from "../resources/apiEndpoins";
import AppConstants from "../resources/AppConstants";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {addSport , getSport , deleteSport, updateSport} from '../redux/actions/ManageSportAction';
import Header from './Header';
import {  toast } from 'react-toastify';
import '../style/responsive.css';
import Footer from "./footer";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const useStyles = makeStyles(theme => ({
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

const ManageSports = props => {
  const classes = useStyles();


  const onGridReady = params => {
    params.api.sizeColumnsToFit();
  };

  const [data, setData] = useState({
    newda:[]
  });
  const [editSport, setEditSport] = useState({});
  const [addSport, setAddSport] = useState({
    name:""
  });

  const [isAddSportOpen, setIsAddSportOpen] = useState(false);
  const [isEditSportOpen, setIsEditSportOpen] = useState(false);

  const [delConfirmation, setDelConfirmation] = useState({
    state: false,
    id: 0
  });
  const hideField =  props.auth.type == "1"   ? false : true;
  //  hide: hideField, 
  const columnDefs = [
    { headerName: "Name", field: "name", minWidth: 50 },

    {
      headerName: "Action",
      field: "sportId",
      hide:hideField,
      minWidth: 100,
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

  const toggleConfirmation = () => {
    setDelConfirmation(!delConfirmation);
  };
  const toggleAddSport = () => {
    setIsAddSportOpen(!isAddSportOpen);
  };

  const toggleEditSport = () => {
    setIsEditSportOpen(!isEditSportOpen);
  };

  const deleteSport = () => {

  };

  const onDeleteEditAddClick = (editSport, action) => {
    switch (action) {
      case AppConstants.ADD_ACTION:
        toggleAddSport();
        break;

      case AppConstants.DELETE_ACTION:
        // console.log('spors', editSport.id)
        props.deleteSport(editSport.id)
     
        break;

      case AppConstants.EDIT_ACTION:
        setEditSport(editSport);
        toggleEditSport();
        break;
      default:
        alert("No implementation");
        break;
    }
  };

  const onEditSportSubmit = () => {
    props.updateSport(editSport)
    toggleEditSport();

  };

  const onAddSportSubmit = () => {
   if(addSport.name == ""){
    toast.error("Required")
   }else {
// console.log('sport', addSport)
      props.addSport(addSport)
      toggleAddSport();
   }
 
  };

  const handleInputChangeEdit = event => {
    const { name, value } = event.target;
    setEditSport({ ...editSport, [name]: value });
  };

  const handleInputChangeAdd = e => {
    
    setAddSport({ ...addSport, [e.target.name]: e.target.value });
  };

  useEffect(() => {  
    props.getSport()
    let newdata =props.sports.sports
    // setData(props.sports.sports)
      setData((data)=> ({...data, newda:newdata}))

  }, []);
// console.log('props sprots', props.sports.sports)
  return (
    <div>
      <Header />

  
    <Container >
      {/* Delete confirmation */}
      <Modal
        size="lg"
        isOpen={delConfirmation.state}
        toggle={toggleConfirmation}
      >
        <ModalHeader toggle={toggleConfirmation}>
          {content.confirmationTitle}
        </ModalHeader>
        <ModalBody>
          <Alert color="warning">{content.deleteConfirmationMsg}</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteSport}>
            {content.confirmMsg}
          </Button>{" "}
          <Button color="secondary" onClick={toggleConfirmation}>
            {content.cancelMsg}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Add Sport */}

      <Modal size="lg" isOpen={isAddSportOpen}>
        <ModalHeader>Add Sport</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={8}>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="name-id">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name-id"
                        value={addSport.name}
                        onChange={e => handleInputChangeAdd(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAddSportSubmit}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggleAddSport}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit Bookie */}

      <Modal size="lg" isOpen={isEditSportOpen}>
        <ModalHeader>Edit Sport</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={8}>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="name-id">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name-id"
                        value={editSport.name}
                        onChange={handleInputChangeEdit}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onEditSportSubmit}>
            Update
          </Button>
          <Button color="secondary" onClick={toggleEditSport}>
           Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Row>
        <Col>
         
        {props.auth.type == "1"     ?   <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => onDeleteEditAddClick(null, AppConstants.ADD_ACTION)}
          >
            Add
          </Button> : null }
           <DataGrid
            data={props.sports.sports.length > 0 ? props.sports.sports : null }
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          /> 
        </Col>
      </Row>
    </Container>
    <Footer/>
      </div>
  );
};
ManageSports.propTypes = {
  onChange: PropTypes.func
};
const mapStateToProps = store =>{
  return {
    sports : store.sportReducer,
    auth:store.auth
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    addSport : data => dispatch(addSport(data)),
    getSport: ()=> dispatch(getSport()),
    deleteSport : (data) => dispatch(deleteSport(data)),

    updateSport :  (data) => dispatch(updateSport(data))
  }
}                                                                                                                      
export default connect(mapStateToProps, mapDispatchToProps)(ManageSports);
