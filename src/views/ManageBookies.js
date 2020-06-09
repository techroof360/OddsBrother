import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DataGrid from "../components/DataGrid";
import content from "../resources/properties";
// import apiEndpoints from "../resources/apiEndpoins";
import AppConstants from "../resources/AppConstants";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {connect} from 'react-redux';
import {addBookie , getBookie ,  deleteBookie , updateBookie} from '../redux/actions/ManageBookieAction';
 import img from '../images/nfl.jpg'; 
import { toast } from "react-toastify";
import '../style/responsive.css';
import Header from './Header';
import Footer from "./footer";
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  // Button,
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
// import { addLeague } from "../redux/actions/ManageLeagueAction";

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

const ManageBookies = props => {
  const classes = useStyles();
  // const initialFormState = {
  //   name: "",
  //   urlRegistration: "",
  //   urlRegistration: "",
  //   image: ""
  // };

  // const onGridReady = params => {
  //   params.api.sizeColumnsToFit();
  // };

  const [data, setData] = useState();
  // console.log('checking', data)
  const [editBookie, setEditBookie] = useState({
    name:"",
    url_registration: "",
    url_home: "",
    image: "",
  });
  const [addBookie, setAddBookie] = useState({
    name:"",
    url_registration: "",
    url_home: "",
    image: "",
  });
 


  const [isAddBookieOpen, setIsAddBookieOpen] = useState(false);
  const [isEditBookieOpen, setIsEditBookieOpen] = useState(false);

  const [delConfirmation, setDelConfirmation] = useState({
    state: false,
    id: 0
  });
  


//  const hideField = props.auth.type == "1"   ? false : true;
//  hide: hideField, 
//  console.log('hideField', hideField)
  // const columnDefs = [
  //   { headerName: "Name", field: "name", minWidth: 50 },
  //   { headerName: "URL Home", field: "url_home", minWidth: 50 },
  //   { headerName: "URL Registration", field: "url_registration", minWidth: 50 },
  //   {
  //     headerName: "Logo",
  //     field: "image",
  //     minWidth: 50,
  //     cellRendererFramework: function(params) {
  //       return (
  //         <img
  //           className={classes.imagepreview}
  //           src= {img}
  //           alt="img"
  //         />
  //       );
  //     }
  //   },

  // { 
  //     headerName: "Action",
  //     field: "id",
  //     minWidth: 100,
  //    hide: hideField, 
  //     cellRendererFramework: function(params) {
  //       return (
  //         <div className="icons-block">
  //             <IconButton
  //             aria-label="delete"
  //             className={classes.margin}
  //             onClick={() =>
  //               onDeleteEditAddClick(params.data, AppConstants.DELETE_ACTION)
  //             }
  //           >
  //             <DeleteIcon fontSize="small" />
  //           </IconButton>
      
         
  //            <IconButton
  //             aria-label="delete"
  //             className={classes.margin}
  //             onClick={() =>
  //               onDeleteEditAddClick(params.data, AppConstants.EDIT_ACTION)
  //             }
  //           >
  //             <EditIcon fontSize="small" />
  //           </IconButton>
         
  //         </div>
  //       );
  //     }
  //   } 
  // ];

  const toggleConfirmation = () => {
    setDelConfirmation(!delConfirmation);
  };
  const toggleAddBookie = () => {
    setIsAddBookieOpen(!isAddBookieOpen);
  };

  const toggleEditBookie = editItem => {
    
    // console.log('editBookie', editItem)
    const CurrentPost = props.bookies.filter((item)=>{
      return item.id === editItem
    });
    let obj = CurrentPost[0]
    // console.log('editBookie obj', obj)
    if(obj === undefined){
      console.log('e')
    }else{

    setEditBookie((editBookie)=>({
      ...editBookie,
      id:obj.id,
      name:obj.name,
      image:"",
      url_home:obj.url_home,
      url_registration:obj.url_registration

    }))
  }
    if (isEditBookieOpen) {
      clearStates();
    } else {
      // setEditBookie(editItem);

      let name = imagesPath + editItem.poster;

      setFileEdit({
        ...fileEdit,
        imageUrl: name,
        file: null
      });
    }
    setIsEditBookieOpen(!isEditBookieOpen);
  };

  const clearStates = () => {
    // setAddBookie(initialFormState);
    // setEditBookie(initialFormState);
  };

  const deleteBookie = () => {
    // axios
    //   .delete(apiEndpoints.BOOKIE_API + delConfirmation.id)
    //   .then(res => {
    //     setDelConfirmation({
    //       state: !delConfirmation.state,
    //       id: 0
    //     });
    //     setData(data.filter(bookie => bookie.bookieId !== delConfirmation.id));
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
  };

  const onDeleteEditAddClick = (editBookie, action) => {
   
    switch (action) {
      case AppConstants.ADD_ACTION:
        toggleAddBookie();
        break;

      case AppConstants.DELETE_ACTION:
        // console.log('bookie id', editBookie.id)
        props.deleteBookie(editBookie.id)
        // setDelConfirmation({
        //   state: !delConfirmation.state,
        //   id: editBookie.bookieId
        // });
        break;

      case AppConstants.EDIT_ACTION:
        setEditBookie(editBookie);
        toggleEditBookie(editBookie);
       
        break;
      default:
        alert("No implementation");
        break;
    }
  };

  const onEditBookieSubmit = () => {
    if (
      editBookie.name === "" ||
      editBookie.image === "" ||
      editBookie.url_home === "" ||
      editBookie.url_registration === "" 
    ) {
      toast.error("Please fill all fields");
  //  console.log('update err', editBookie)
     
    }else{

 
  //  console.log('update bookie', editBookie)
    const reqdata = new FormData();
    reqdata.append("name", editBookie.name);
    reqdata.append("url_home", editBookie.url_home);
    reqdata.append("url_registration", editBookie.url_registration);
    reqdata.append("image", editBookie.image);
    props.updateBookie(editBookie, reqdata )   }
    // axios
    //   .post(apiEndpoints.UPDATE_BOOKIE_API, reqdata)
    //   .then(res => {
    //     setData(
    //       data.map(item =>
    //         item.bookieId === editBookie.bookieId ? editBookie : item
    //       )
    //     );
    //     toggleEditBookie();
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
  };

  const onAddBookieSubmit = () => {
    
    if (
      addBookie.image === "" ||
     
      addBookie.name === "" ||
      addBookie.url_home === "" ||
      addBookie.url_registration === ""
    ) {
      // alert("Please fill all fields");
      toast.error("Please fill all fields");
      
   
    } else {
    console.log('addBookie', addBookie)
    const formData = new FormData();
    formData.append("image", addBookie.image);
    formData.append("name", addBookie.name);
    formData.append("url_home", addBookie.url_home);
    formData.append("url_registration", addBookie.url_registration);
    
    props.addBookie(formData); 
    toggleAddBookie();
    // toggleConfirmation()
    }
    // axios
    //   .post(apiEndpoints.SAVE_BOOKIE_API, data)
    //   .then(res => {
    //     let bookie = res.data;
    //     setData(data => [...data, bookie]);

    //     toggleAddBookie();
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
  };

  const handleInputChangeEdit = event => {
    
    setEditBookie({ ...editBookie, [event.target.name]: event.target.value });
  };

  const handleInputChangeAdd = event => {
    

    setAddBookie({ ...addBookie, [event.target.name]: event.target.value });
  };

  // const handleFileChangeAdd = ({ target: { files } }) => {
  //   const [{ name }] = files;
  //   let file = files[0];
  //   if (checkMimeType(file, "edit") && checkFileSize(file, "edit")) {
  //     setFileAdd({ ...fileAdd, file: file });
  //   }
  // };

  // const checkMimeType = (file, action) => {
  //   let err = "";
  //   const types = AppConstants.SUPPORTED_IMAGE_TYPES;
  //   if (types.every(type => file.type !== type)) {
  //     err = file.type + " is not a supported format\n";
  //     action === "add"
  //       ? setAddBookie({ ...addBookie, ["error"]: err })
  //       : setEditBookie({ ...editBookie, ["error"]: err });
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const checkFileSize = (file, action) => {
  //   let size = AppConstants.MAX_FILE_SIZE;
  //   let err = "";
  //   if (file.size / 1000 > size) {
  //     err += file.type + " is too large, please pick a smaller file\n";
  //   }
  //   if (err !== "") {
  //     action === "add"
  //       ? setAddBookie({ ...addBookie, ["error"]: err })
  //       : setEditBookie({ ...editBookie, ["error"]: err });
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const [fileAdd, setFileAdd] = useState({
    imageUrl: "",
    isPreviewHidden: true,
    file: null
  });

  const [fileEdit, setFileEdit] = useState({
    imageUrl: "",
    file: null
  });

  const handleFileChangeAdd = (e) => {
     const image = e.target.files[0];
 
     let size = AppConstants.MAX_FILE_SIZE;
     const types = AppConstants.SUPPORTED_IMAGE_TYPES;
    //  let err = "";
      if (image.size / 1000 > size) {
        toast.error(" is too large, please pick a smaller file");
      } 
     else if(types.every(type => image.type !== type)){
       toast.error(AppConstants.IMAGES_VALIDATE)
      }else {
     setAddBookie({...addBookie, image})
      }
    // const [{ name }] = files;
    // let file = files[0];

    // if (checkMimeType(file, "add") && checkFileSize(file, "add")) {
    //   let reader = new FileReader();

    //   reader.onload = function(e) {
    //     setFileAdd({
    //       ...fileAdd,
    //       imageUrl: e.target.result,
    //       file: file,
    //       isPreviewHidden: false
    //     });
    //   };

    //   reader.readAsDataURL(file);
    // }
  };
const handleFileChangeEdit =(e)=>{
  const image = e.target.files[0];
 
  let size = AppConstants.MAX_FILE_SIZE;
  const types = AppConstants.SUPPORTED_IMAGE_TYPES;
  // let err = "";
   if (image.size / 1000 > size) {
     toast.error(" is too large, please pick a smaller file");
   } 
  else if(types.every(type => image.type !== type)){
    toast.error(AppConstants.IMAGES_VALIDATE)
   }else {
  // console.log('file', image)
  setEditBookie({...editBookie, image})
   }
}
 

  var imagesPath;

  useEffect(() => {
    props.getBookie()
    setData(props.bookies)

  }, []);

  return (
    <div>
      <Header/>

    
    <Container > 
      {/* Delete confirmation */}
      <Modal
        size="lg"
        isOpen={delConfirmation.state}
        toggle={toggleConfirmation}
      >
        <ModalHeader toggle={toggleConfirmation}>
        Confirmation
        </ModalHeader>
        <ModalBody>
          <Alert color="warning">{content.deleteConfirmationMsg}</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteBookie}>
          Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggleConfirmation}>
          Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Add Bookie */}

      <Modal size="lg" isOpen={isAddBookieOpen}>
        <ModalHeader>Add Bookie</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="add-image">
                        Add logo image (Max dimensions 110 x 50){" "}
                        <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="file"
                        id="add-image"
                        name="image"
                        label={addBookie.image || "choose an image file"}
                        onChange={(e)=>handleFileChangeAdd(e)}
                      />
                      <p className={classes.error}>{addBookie.error}</p>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <img
                        hidden={fileAdd.isPreviewHidden}
                        className={classes.imagepreview}
                        src={fileAdd.imageUrl}
                        alt="img"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="name-id">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        value={addBookie.name}
                        onChange={handleInputChangeAdd}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="webLink-id">URL Home</Label>
                      <Input
                        type="text"
                        name="url_home"
                        value={addBookie.url_home}
                        onChange={handleInputChangeAdd}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="webLink-id">URL Registration</Label>
                      <Input
                        type="text"
                        name="url_registration"
                        value={addBookie.url_registration}
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
          <Button color="primary" onClick={onAddBookieSubmit}>
           ADD
          </Button>
          <Button color="secondary" onClick={toggleAddBookie}>
          Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit Bookie */}

      <Modal size="lg" isOpen={isEditBookieOpen}>
        <ModalHeader>Edit Bookie</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="add-image">
                        Update logo image (Max dimensions 110 x 50){" "}
                        <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="file"
                        id="add-image"
                        name="image"
                        label={ "choose an image file"}
                        onChange={(e)=> handleFileChangeEdit(e)}
                      />
                      <p className={classes.error}>{editBookie.error}</p>
                    </FormGroup>
                  </Col>
                </Row>

          

                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="name-id">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        value={editBookie.name}
                        onChange={handleInputChangeEdit}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="webLink-id">URL Home</Label>
                      <Input
                        type="text"
                        name="url_home"
                        value={editBookie.url_home}
                        onChange={handleInputChangeEdit}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="webLink-id">URL Registration</Label>
                      <Input
                        type="text"
                        name="url_registration"
                        value={editBookie.url_registration}
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
          <Button color="primary" onClick={onEditBookieSubmit}>
            {content.updateMsg}
          </Button>{" "}
          <Button color="secondary" onClick={toggleEditBookie}>
            {content.cancelMsg}
          </Button>
        </ModalFooter>
      </Modal>

      <Row>
        <Col>
       
          {props.auth.type == "1"   ?    
          <Button
           id="handelToggleBtn"
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => onDeleteEditAddClick(null, AppConstants.ADD_ACTION)}
          >
            ADD
          </Button>
           : null }
             <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      <TableHead id="handelMobileView" style={{backgroundColor:'#000000'}}>
          <TableRow>
            <TableCell style={{color:'white'}}>Name</TableCell>
            <TableCell style={{color:'white'}}>URL Home</TableCell>
            <TableCell  style={{color:'white'}}>URL Registration</TableCell>
            <TableCell  style={{color:'white'}}>Logo</TableCell>
           
            {props.auth.type == "1" ?        <TableCell  style={{color:'white'}}>Action</TableCell> : null}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.bookies.map((row) => (
            <TableRow key={row.name}>
           
              <TableCell >{row.name}</TableCell>
              <TableCell id="handelMobileView">{row.url_home}</TableCell>
              <TableCell id="handelMobileView">{row. url_registration}</TableCell>
              <TableCell ><img alt="bookies"  width="100px" src={row.image} /></TableCell>
              {props.auth.type == "1"   ?     <TableCell>
              <span style={{ display:'flex', flexDirection:'row-reverse' }}>
                 <IconButton
                      aria-label="delete"
                      className={classes.margin}
                       onClick={() =>
                     
                         props.deleteBookie(row.id)
                      //   onDeleteEditAddClick(params.data, AppConstants.DELETE_ACTION)
                       }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      aria-label="edit"
                      className={classes.margin}
                      onClick={() =>
                        toggleEditBookie(row.id)
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    </span>
              </TableCell> : null}
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    </TableContainer>
          {/* <DataGrid
            data={props.bookies.length > 0 ? props.bookies : null}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          /> */}
        </Col>
      </Row>
  
    </Container>
    <Footer/>
    </div>
  );
};

ManageBookies.propTypes = {
  onChange: PropTypes.func
};
const mapDispatchToProps = dispatch =>{
  return{
    addBookie: data => dispatch(addBookie(data)),
    getBookie : () => dispatch(getBookie()) ,
    deleteBookie : data => dispatch(deleteBookie(data)),
    updateBookie : (editBookie, reqdata) => dispatch(updateBookie(editBookie, reqdata)),
  }
}
 const mapStateToProps =  store =>{
   return {
   bookies: store.bookieReducer.bookies,
   auth:store.auth
   }
 }
export default connect(mapStateToProps, mapDispatchToProps)(ManageBookies);
