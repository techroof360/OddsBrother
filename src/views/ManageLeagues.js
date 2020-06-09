import React, { useState, useEffect } from "react";
// import axios from "axios";
import DataGrid from "../components/DataGrid";
import content from "../resources/properties";
// import apiEndpoints from "../resources/apiEndpoins";
import AppConstants from "../resources/AppConstants";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {addLeague , getLeague , deleteLeague , updateLeague} from '../redux/actions/ManageLeagueAction';
import Header from './Header';
import '../style/responsive.css';
import {  toast } from 'react-toastify';
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

const ManageLeagues = props => {
  const classes = useStyles();
 
  const onGridReady = params => {
    
    params.api.sizeColumnsToFit();
  };

  const [data,  setData] = useState([]);
  const [editItem, setEditItem] = useState({
    name:""
  });
  const [addItem, setAddItem] = useState({
    name:""
  });

  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);

  const [delConfirmation, setDelConfirmation] = useState({
    state: false,
    id: 0
  });
  const hideField = props.auth.type == "1"   ? false : true;
  //  hide: hideField, 
  const columnDefs = [
    { headerName: "Name", field: "name", minWidth: 50 },

    {
      headerName: "Action",
      field: "id",
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
              aria-label="edit"
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
  const toggleAdd = () => {
    setIsAddItemOpen(!isAddItemOpen);
  };

  const toggleEdit = () => {
    setIsEditItemOpen(!isEditItemOpen);
  };

  const deleteItem = () => {
    
 
  };

  const onDeleteEditAddClick = (editItem, action) => {
    // console.log('action', action)
    // console.log('editItem', editItem.id)
    switch (action) {
      case AppConstants.ADD_ACTION:
        toggleAdd();
        break;

      case AppConstants.DELETE_ACTION:
        // alert('delete')
        props.deleteLeague(editItem.id)
      
        break;

      case AppConstants.EDIT_ACTION:
  
         setEditItem(editItem);
         toggleEdit();
         break;
      default:
     
        break;
    }
  };

  const onEditItemSubmit = () => {
  
     props.updateLeague(editItem)
     toggleEdit();
 
  };

  const onAddItemSubmit = () => {
   
    if(addItem.name === ""){
      toast.error("Required")
    }else{

      props.addLeague(addItem)
      toggleAdd();
    }
 
  };

  const handleInputChangeEdit = event => {
    const { name, value } = event.target;
    setEditItem({ ...editItem, [name]: value });
  };

  const handleInputChangeAdd = event => {
    setAddItem({ ...addItem, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    props.getLeague()
   
      setData(props.league);
    

  }, []);
console.log('props.league', props.league)

  return (
    <div>
      <Header />

    <Container>
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
          <Alert color="warning">Are you sure you want to delete ?</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteItem}>
            Conform
          </Button>
          <Button color="secondary" onClick={toggleConfirmation}>
           Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Add  */}

      <Modal size="lg" isOpen={isAddItemOpen}>
        <ModalHeader>Add League</ModalHeader>
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
                        value={addItem.name}
                        onChange={handleInputChangeAdd}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAddItemSubmit}>
           ADD
          </Button>{" "}
          <Button color="secondary" onClick={toggleAdd}>
           Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit */}

      <Modal size="lg" isOpen={isEditItemOpen}>
        <ModalHeader>Edit League</ModalHeader>
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
                        value={editItem.name}
                       
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
          <Button color="primary" onClick={onEditItemSubmit}>
            Update
          </Button>
          <Button color="secondary" onClick={toggleEdit}>
            cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Row>
        <Col>
          {/* <AppHeader /> */}
          { props.auth.type == "1"   ?      <Button
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => onDeleteEditAddClick(null, AppConstants.ADD_ACTION)}
          >
            ADD
          </Button> : null }
          <DataGrid
            data={props.league}
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
ManageLeagues.propTypes = {
  onChange: PropTypes.func
};
const mapDispatchToProps = (dispatch)=>{
  return {
    addLeague : data => dispatch(addLeague(data)), 
    getLeague: () => dispatch(getLeague()),
    deleteLeague:id => dispatch(deleteLeague(id)),
    updateLeague : data => dispatch(updateLeague(data))
  }
}  
const mapStateToProps = store =>{
  return {
league: store.leagueReducer.league ,
auth:store.auth
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageLeagues);
