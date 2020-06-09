import React, { useState, useEffect } from "react";
// import axios from "axios";
import {Link} from 'react-router-dom'
// import DataGrid from "../components/DataGrid";
import content from "../resources/properties";
// import apiEndpoints from "../resources/apiEndpoins";
import AppConstants from "../resources/AppConstants";
import RichTextEditor from "react-rte";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {connect} from 'react-redux'
import {addArticalAction , getArtical , deleteArtical , updateArtical} from '../redux/actions/ManageArticalAction';
import '../style/responsive.css';
// import img from '../images/nfl.jpg';
// import artical from '../images/articals.jpg'
import Header from './Header';
import Footer from "./footer";

import {
  
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Alert,   Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, 
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import {toast} from 'react-toastify';

const useStyles = makeStyles(theme => ({
  modal: {
    height: 500
  },
  imagepreview: {
    maxHeight: 50
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

const ManageArticles = props => {
  const classes = useStyles();
  const initialFormState = {
    name: "",
    heading: "",
    category: "",
    image: "",
    league_name: "",
    oddsText: ""
  };

  // const onGridReady = params => {
  //   params.api.sizeColumnsToFit();
  // };

   const [data, setData] = useState([]);
  const [editArticle, setEditArticle] = useState({
    id:"",
    name: "",
    heading: "",
    category: "",
    image: "",
    league_name: "",
    oddsText: ""
  });
  // console.log('editArticle', editArticle)
  const [addArticle, setAddArticle] = useState(initialFormState);
  const [navigation, setNavigation] = useState({
    limit:6
  })
//  console.log('artical', props)
const handelLoadMore = () =>{
  setNavigation(navigation =>({
    ...navigation, limit : navigation.limit + 6
  }))
}
  const [fileEdit, setFileEdit] = useState({
    imageUrl: "",
    file: null
  });

  const [fileAdd, setFileAdd] = useState({
    imageUrl: "",
    isPreviewHidden: true,
    file: null
  });

  const [richTextVal, setRichTextVal] = useState(
    RichTextEditor.createEmptyValue()
  );

  const [isAddArticleOpen, setIsAddArticleOpen] = useState(false);
  const [isEditArticleOpen, setIsEditArticleOpen] = useState(false);

  const [delConfirmation, setDelConfirmation] = useState({
    state: false,
    id: 0
  });
  const hideField =  props.auth.user  !== null && props.auth.user.type === 1  ? false : true;
  //  hide: hideField, 
  // const columnDefs = [
  //   { headerName: "Title", field: "name", width: 50 },
  //   { headerName: "League Name", field: "league_name", width: 50 },
  //   { headerName: "Odds Text", field: "oddsText", width: 50 },
  //   // { headerName: "Category", field: "category", width: 100 },
  //   {
  //     headerName: "Image",
  //     field: "image",
  //     width: 50,
  //     height: 200,
  //     cellRendererFramework: function(params) {
  //       return (
  //         <img
  //           className={classes.imagepreview}
  //           src={img}
  //           alt="img"
  //         />
  //       );
  //     }
  //   },
  //   {
  //     headerName: "Action",
  //     field: "id",
  //     width: 50,
  //     hide: hideField, 
  //     cellRendererFramework: function(params) {
  //       // console.log('params', params.data)
  //       return (
  //         <div className="icons-block">
  //           <IconButton
  //             aria-label="delete"
  //             className={classes.margin}
  //             onClick={() =>
  //               onDeleteEditAddClick(params.data, AppConstants.DELETE_ACTION)
  //             }
  //           >
  //             <DeleteIcon fontSize="small" />
  //           </IconButton>

  //           <IconButton
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
  const toggleAddArticle = () => {
    clearStates();
    setIsAddArticleOpen(!isAddArticleOpen);
  };

  //  console.log('artical', props.artical)

  const toggleEditArticle = editArticleItem => {
    //  console.log('editArticleItem', editArticleItem)
    
    let currenttArticals = props.artical.filter(item=> item.id === editArticleItem)
    
      const object = currenttArticals[0];
      //  console.log('currenttArticals obj', object)
      if(object === undefined){
        console.log('e')
      }else{

      
    setEditArticle((editArticle)=>({
      ...editArticle, 
      id:object.id,
      name:object.name,
      heading:object.heading,
      category:object.category,
      image:object.image,
      league_name:object.league_name,
      oddsText:object.oddsText
    }))
 }

    setIsEditArticleOpen(!isEditArticleOpen);
  };

  const clearStates = () => {
    setAddArticle(initialFormState);
    setEditArticle(initialFormState);

    fileAdd.isPreviewHidden = true;
    fileAdd.imageUrl = "";
    fileEdit.isPreviewHidden = true;
    fileEdit.imageUrl = "";

    setFileEdit({
      imageUrl: "",
      file: null
    });

    setFileAdd({
      imageUrl: "",
      isPreviewHidden: true,
      file: null
    });

    setRichTextVal(RichTextEditor.createEmptyValue());
  };

  const deleteArticle = () => {

  };

  const onDeleteEditAddClick = (editArticleItem, action) => {
    switch (action) {
      case AppConstants.ADD_ACTION:
        toggleAddArticle();
        break;

      case AppConstants.DELETE_ACTION:
        // console.log('manage aricals',editArticleItem.id )
        // props.deleteArtical(editArticleItem.id)
        // setDelConfirmation({
        //   state: !delConfirmation.state,
        //   id: editArticleItem.articleId
        // });
        break;

      case AppConstants.EDIT_ACTION:
        // toggleEditArticle(editArticleItem);
        break;
      default:
        alert("No implementation");
        break;
    }
  };

  // const checkMimeType = (file, action) => {
  //   let err = "";
  //   const types = AppConstants.SUPPORTED_IMAGE_TYPES;
  //   if (types.every(type => file.type !== type)) {
  //     err = file.type + " is not a supported format\n";
  //     action === "add"
  //       ? setAddArticle({ ...addArticle, ["error"]: err })
  //       : setEditArticle({ ...editArticle, ["error"]: err });
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
  //       ? setAddArticle({ ...addArticle, ["error"]: err })
  //       : setEditArticle({ ...editArticle, ["error"]: err });
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const onEditArticleSubmit = () => {
    if (
      editArticle.category === "" ||
      editArticle.name === "" ||
      editArticle.heading === "" ||
      editArticle.league_name === "" ||
      editArticle.oddsText === "" 
     
    ) {
      toast.error("Please fill all fields");
    }

    // console.log('edit artical', editArticle)
    const formData = new FormData();
    formData.append("name", editArticle.name);
    formData.append("heading", editArticle.heading);
    formData.append("league_name", editArticle.league_name);
    formData.append("oddsText", editArticle.oddsText);
    formData.append("category", editArticle.category);
    // formData.append("image", editArticle.image);
     props.updateArtical(editArticle, formData)
    
    toggleEditArticle();
 
  };
  const handleFileChangeEdit = (e) => {
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
    setEditArticle({...editArticle, image})}
     }
  const handleFileChangeAdd = (e) => {
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
    setAddArticle({...addArticle, image})}
     }
  const onAddArticleSubmit = () => {
    if (
      addArticle.category === "" ||
      addArticle.name === "" ||
      addArticle.heading === "" ||
      addArticle.league_name === "" ||
      addArticle.oddsText === "" ||
      addArticle.image === null
    ) {
      toast.error("Please fill all fields");
// console.log('formdata', addArticle)
      
    }
// console.log('formdata', addArticle)
 let formData = new FormData();

formData.append("image", addArticle.image);
formData.append("name", addArticle.name);
formData.append("heading", addArticle.heading);
formData.append("league_name", addArticle.league_name);
formData.append("oddsText", addArticle.oddsText);
formData.append("category", addArticle.category);
props.addArticalAction(formData);
toggleAddArticle();


  };
  
  const handleInputChangeEdit = event => {
    const { name, value } = event.target;
    setEditArticle({ ...editArticle, [name]: value });
  };

  const handleInputChangeAdd = event => {
    const { name, value } = event.target;

    setAddArticle({ ...addArticle, [name]: value });
  };

  // let categoryVal;

  const handleInputChangeRichTextEdit = value => {
    setRichTextVal(value);
    setEditArticle({ ...editArticle, ["category"]: value.toString("html") });
    if (props.onChange) {
      props.onChange(value);
    }
  };

  const handleInputChangeRichTextAdd = value => {
    // console.log('value', value.toString("html"))
    setRichTextVal(value);
    setAddArticle({ ...addArticle, ["category"]: value.toString("html") });
    if (props.onChange) {
      props.onChange(value);
    }
  };

  //  var imagesPath;

  useEffect(() => {
    props.getArtical()
    setData(props.artical)
   
  }, []);
// console.log('props articals', props.artical)
  return (
    <div>
    <Header/>
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
          <Alert color="warning">{content.deleteConfirmationMsg}</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteArticle}>
            {content.confirmMsg}
          </Button>{" "}
          <Button color="secondary" onClick={toggleConfirmation}>
            {content.cancelMsg}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Add Article */}

      <Modal size="lg" isOpen={isAddArticleOpen}>
        <ModalHeader>Add Article</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="add-image">
                        Add image <span className={classes.error}>*</span>
                        <span style={{ marginLeft: 10, fontSize: 12 }}>
                          Note: For best viewing please add image with size (750
                          x 500)
                        </span>
                      </Label>
                      <Input
                        type="file"
                        id="add-image"
                        name="image"
                        label={addArticle.image || "choose an image file"}
                        onChange={handleFileChangeAdd}
                      />
                      <p className={classes.error}>{addArticle.error}</p>
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
                      <Label for="title-id">
                        Title <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="title-id"
                        value={addArticle.name}
                        onChange={handleInputChangeAdd}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col >
                    <FormGroup>
                      <Label>
                        Heading <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="text"
                        name="heading"
                        value={addArticle.heading}
                        onChange={handleInputChangeAdd}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col >
                    <FormGroup>
                      <Label for="league-name-id">
                        League Name <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="text"
                        name="league_name"
                        id="league-name-id"
                        value={addArticle.league_name}
                        onChange={handleInputChangeAdd}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col >
                    <FormGroup>
                      <Label for="odds-text-id">
                        Category <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="text"
                        name="oddsText"
                        id="odds-text-id"
                        value={addArticle.oddsText}
                        onChange={handleInputChangeAdd}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="category-id">
                        Category <span className={classes.error}>*</span>
                      </Label>

                      <RichTextEditor
                        value={richTextVal}
                        onChange={(e)=>handleInputChangeRichTextAdd(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAddArticleSubmit}>
          ADD
          </Button>{" "}
          <Button color="secondary" onClick={toggleAddArticle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit Articles */}

      <Modal size="lg" isOpen={isEditArticleOpen}>
        <ModalHeader>Edit Article</ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col>
                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="edit-image">
                        Update image <span className={classes.error}>*</span>
                        <span style={{ marginLeft: 10, fontSize: 12 }}>
                          Note: For best viewing please add image with size (750
                          x 500)
                        </span>
                      </Label>
                      <Input
                        type="file"
                        id="edit-image"
                        name="image"
                        label={"choose an image file"}
                        onChange={(e)=>handleFileChangeEdit(e)}
                      />

                      <p className={classes.error}>{editArticle.error}</p>
                    </FormGroup>
                  </Col>
                </Row>

            
                <Row form>
                  <Col xs="6">
                
                    <FormGroup>
                      <Label for="title-id">
                        Title <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="title-id"
                        value={editArticle.name}
                        onChange={handleInputChangeEdit}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col xs="6">
                    <FormGroup>
                      <Label>
                        Heading <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="text"
                        name="heading"
                        value={editArticle.heading}
                        onChange={handleInputChangeEdit}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="league-name-">
                        League Name <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="text"
                        name="league_name"
                        id="league-name-"
                        value={editArticle.league_name}
                        onChange={handleInputChangeEdit}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="odds-text">
                        Odds Text <span className={classes.error}>*</span>
                      </Label>
                      <Input
                        type="text"
                        name="oddsText"
                        id="odds-text"
                        value={editArticle.oddsText}
                        onChange={handleInputChangeEdit}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col>
                    <FormGroup>
                      <Label for="category-id">
                        Category <span className={classes.error}>*</span>
                      </Label>
                    
                       <RichTextEditor
                        value={richTextVal}
                        onChange={(e)=>handleInputChangeRichTextEdit(e)}
                      /> 
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>onEditArticleSubmit()}>
            {content.updateMsg}
          </Button>{" "}
          <Button color="secondary" onClick={(e)=>toggleEditArticle(e)}>
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
          {/* <DataGrid
            data={props.artical}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          /> */}
          <h2>Articles</h2>
          <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
           {props.artical.length> 0 && props.artical.slice(0,navigation.limit).map((item, i)=>{
          
             
         
          return    <Card key={i} style={{margin:8 , display:'flex', width:300 }} id="handelGrid">
          <Link to={`/showArtical/${item.id}`} style={{ textDecoration:'none'}}> 
              <CardImg top width="100%" src={item.image} alt="Articals"  />
              <CardBody>
              <CardTitle style={{fontWeight:'bold', color:'#282c35'}}>{item.heading}</CardTitle>
              <CardSubtitle style={{fontSize:10 , color:'#282c35'}}>{item.oddsText}</CardSubtitle>
              <CardText style={{fontSize:12 , color:'#282c35'}} className="cat"> {
                 
                setTimeout(()=>{
                    document.getElementsByClassName("cat").item(i).innerHTML = item.category 
                }, 500)
              } </CardText>
               
               
             

              </CardBody></Link>
              {props.auth.type == "1"   ?   
                  <span style={{ display:'flex', flexDirection:'row-reverse' }}>
                  <IconButton
                      aria-label="delete"
                      className={classes.margin}
                       onClick={() =>
                   
                   
                        props.deleteArtical(item.id)
                      //   onDeleteEditAddClick(params.data, AppConstants.DELETE_ACTION)
                       }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      aria-label="edit"
                      className={classes.margin}
                      onClick={() =>
                        toggleEditArticle(item.id)
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
              </span> : null}
            </Card>
           })}
          </div>
        </Col>
      </Row>
           <Button style={{width:'100%', backgroundColor:'#EBEAEA', color:'black', fontWeight:'bold'}} onClick={()=> handelLoadMore()}>LOAD MORE POSTS</Button>
    </Container>
    <Footer/>
     </div>
  );
};
ManageArticles.propTypes = {
  onChange: PropTypes.func
};
const mapStateToProps = store =>{
  return {
    artical : store.articalReducer.articals,
    auth:store.auth
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    addArticalAction : data => dispatch(addArticalAction(data)),
    getArtical : () => dispatch(getArtical()),
    deleteArtical : data => dispatch(deleteArtical(data)),
    updateArtical : ( data , id) => dispatch(updateArtical( data , id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageArticles);
