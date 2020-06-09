import React, { useState, useEffect } from "react";
import "../style/ManageBounces.css";
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
import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import {
  addBonus,
  getBonus,
  deleteBounces,
  updateBonus,
} from "../redux/actions/ManageBouncesAction";
import { getBookie } from "../redux/actions/ManageBookieAction";
// import img from '../images/nfl.jpg';
import "../style/responsive.css";
import Header from "./Header";
import { toast } from "react-toastify";
import Footer from "./footer";

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
  Input,
} from "reactstrap";

const useStyles = makeStyles((theme) => ({
  modal: {
    height: 500,
  },
  imagepreview: {
    maxWidth: "30%",
  },
  margin: {
    margin: theme.spacing(0),
  },
  addButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  error: {
    color: "#FF0000",
  },
}));

const ManageBonuses = (props) => {
  const classes = useStyles();
  const initialFormState = {
    rank: "",
    name: "",
    url_home: "",
    url_registration: "",
    turnover: "",
    // odds: "",
    bonus_text: "",
    bookie_id: "1",
    image: "",
  };

  // const onGridReady = params => {
  //   params.api.sizeColumnsToFit();
  // };
  // let bounces = [{name:"mujahid",id:1, offer:'FREE 100% upto 100%'},{name:"mujahid",id:1,offer:'100% upto 100%'},{name:"mujahid",id:1, offer:'FREE 100% upto 100%'}]
  const [data, setData] = useState([]);
  const [editBonus, setEditBonus] = useState(initialFormState);
  const [addBonus, setAddBonus] = useState(initialFormState);

  // const [bookiesList, setBookieList] = useState([]);

  const [isAddBonusOpen, setIsAddBonusOpen] = useState(false);
  const [isEditBonusOpen, setIsEditBonusOpen] = useState(false);

  const [delConfirmation, setDelConfirmation] = useState({
    state: false,
    id: 0,
  });

  // const columnDefs = [
  //   { headerName: "Rank", field: "rank", width: 50 },
  //   { headerName: "Title", field: "title", width: 50 },
  //   { headerName: "URL Home", field: "affiliateUrlHome", width: 100 },
  //   { headerName: "URL Reg", field: "affiliateUrlReg", width: 100 },
  //   { headerName: "Turnover", field: "turnover", width: 50 },
  //   { headerName: "Bookie", field: "_embedded.bookie.name", width: 50 },

  //   {
  //     headerName: "Action",
  //     field: "bonusId",
  //     width: 50,
  //     cellRendererFramework: function(params) {
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
  const toggleAddBonus = () => {
    clearStates();
    setIsAddBonusOpen(!isAddBonusOpen);
  };

  const toggleEditBonus = (editBonusItem) => {
    // console.log('currenttArticals obj', editBonusItem)
    setIsEditBonusOpen(!isEditBonusOpen);
    let currenttArticals = props.bonus.filter(
      (item) => (item.id = editBonusItem)
    );

    const object = currenttArticals[0];
    //  console.log(' obj', object)
    if (object === undefined) {
      //  console.log('e')
    } else {
      setEditBonus({
        ...editBonus,
        id: object.id,
        rank: object.rank,
        name: object.name,
        url_home: object.url_home,
        url_registration: object.url_registration,
        turnover: object.turnover,
        // odds: object.odds,
        bonus_text: object.bonus_text,
        bookie_id: object.bookie_id,
      });
    }
  };

  const clearStates = () => {
    // setAddBonus(initialFormState);
    // setEditBonus(initialFormState);
  };

  const deleteBonus = () => {};

  const onDeleteEditAddClick = (editBonusItem, action) => {
    switch (action) {
      case AppConstants.ADD_ACTION:
        toggleAddBonus();
        break;

      case AppConstants.DELETE_ACTION:
        // console.log('bounces', editBonusItem.id)
        props.deleteBounces(editBonusItem.id);

        break;

      case AppConstants.EDIT_ACTION:
        toggleEditBonus(editBonusItem);
        break;
      default:
        alert("No implementation");
        break;
    }
  };

  const onEditBonusSubmit = () => {
    if (
      editBonus.rank === "" ||
      editBonus.name === "" ||
      editBonus.url_home === "" ||
      editBonus.url_registration === "" ||
      editBonus.turnover === "" ||
      // editBonus.odds === "" ||
      editBonus.bonus_text === "" ||
      editBonus.bookie_id === "" ||
      editBonus.image === ""
    ) {
      toast.error("Please fill all fields");
      return;
    } else {
      // console.log('test', editBonus)
      let data = new FormData();
      data.append("rank", editBonus.rank);
      data.append("name", editBonus.name);
      data.append("url_home", editBonus.url_home);
      data.append("url_registration", editBonus.url_registration);
      data.append("turnover", editBonus.turnover);
      // data.append('odds', editBonus.odds)
      data.append("bonus_text", editBonus.bonus_text);
      data.append("bookie_id", editBonus.bookie_id);
      data.append("image", editBonus.image);
      props.updateBonus(data, editBonus);
      toggleEditBonus();
    }
  };

  const onAddBonusSubmit = () => {
    if (
      addBonus.rank === "" ||
      addBonus.name === "" ||
      addBonus.url_home === "" ||
      addBonus.url_registration === "" ||
      addBonus.turnover === "" ||
      // addBonus.odds === "" ||
      addBonus.bonus_text === "" ||
      addBonus.bookie_id === "" ||
      addBonus.image === ""
    ) {
      toast.error("Please fill all fields");

      // console.log('data', addBonus)
    } else {
      // console.log('data bounce', addBonus)
      let data = new FormData();
      data.append("rank", addBonus.rank);
      data.append("name", addBonus.name);
      data.append("url_home", addBonus.url_home);
      data.append("url_registration", addBonus.url_registration);
      data.append("turnover", addBonus.turnover);
      // data.append('odds', addBonus.odds)
      data.append("bonus_text", addBonus.bonus_text);
      data.append("bookie_id", addBonus.bookie_id);
      data.append("image", addBonus.image);

      toggleAddBonus();
      props.addBonus(data);
    }

    // console.log('bounces', addBonus)
  };

  const handleFileChangeAdd = (e) => {
    // console.log('evt', e.target.files[0] )
    const image = e.target.files[0];

    let size = AppConstants.MAX_FILE_SIZE;
    const types = AppConstants.SUPPORTED_IMAGE_TYPES;
    // let err = "";
    if (image.size / 1000 > size) {
      toast.error(" is too large, please pick a smaller file");
    } else if (types.every((type) => image.type !== type)) {
      toast.error(AppConstants.IMAGES_VALIDATE);
    } else {
      setAddBonus({ ...addBonus, image });
      setEditBonus({ ...editBonus, image });
    }
  };
  const handleInputChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditBonus({ ...editBonus, [name]: value });
  };

  const handleInputChangeAdd = (event) => {
    const { name, value } = event.target;

    setAddBonus({ ...addBonus, [name]: value });
  };

  const onSelectChange = (action, event) => {
    alert("edit");
    // console.log('event.target.value', event.target.value)
    setAddBonus({ ...addBonus, bookie_id: event.target.value });
  };

  useEffect(() => {
    props.getBonus();
    props.getBookie();
    setData(props.bonus);
  }, []);
  // console.log('bounces', props.bonus)
  return (
    <div id="test">
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
            <Alert color="warning">{content.deleteConfirmationMsg}</Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={deleteBonus}>
              {content.confirmMsg}
            </Button>{" "}
            <Button color="secondary" onClick={toggleConfirmation}>
              {content.cancelMsg}
            </Button>
          </ModalFooter>
        </Modal>

        {/* Add  */}

        <Modal size="lg" isOpen={isAddBonusOpen}>
          <ModalHeader>Add Bonus</ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col>
                  <Row form>
                    <Col>
                      <FormGroup>
                        {/* <Label for="add-image">
                        Add logo image (Max dimensions 110 x 50){" "}
                        <span className={classes.error}>*</span>
                      </Label> */}
                        <Input
                          type="file"
                          id="add-image"
                          name="image"
                          label={addBonus.image || "choose an image file"}
                          onChange={(e) => handleFileChangeAdd(e)}
                        />
                        <p className={classes.error}>{addBonus.error}</p>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label>
                          Rank <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="number"
                          name="rank"
                          value={addBonus.rank}
                          onChange={(e) => handleInputChangeAdd(e)}
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
                          value={addBonus.name}
                          onChange={(e) => handleInputChangeAdd(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          URL Home <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="url_home"
                          id="title-id"
                          value={addBonus.url_home}
                          onChange={(e) => handleInputChangeAdd(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          URL Registration{" "}
                          <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="url_registration"
                          id="title-id"
                          value={addBonus.url_registration}
                          onChange={(e) => handleInputChangeAdd(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          Turnover <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="number"
                          name="turnover"
                          id="title-id"
                          value={addBonus.turnover}
                          onChange={(e) => handleInputChangeAdd(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          Odds <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="number"
                          name="odds"
                          id="title-id"
                          value={addBonus.odds}
                          onChange={(e) => handleInputChangeAdd(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="category-id">
                          Bookie <span className={classes.error}>*</span>
                        </Label>

                        <Input
                          type="select"
                          name="bookie_id"
                          id="bookie-add"
                          onChange={(e) => onSelectChange("add", e)}
                        >
                          {props.bookies.length > 0 &&
                            props.bookies.map((item, key) => (
                              // console.log('bookeie',item )
                              <option id={key} key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          Bonus Text <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="bonus_text"
                          id="title-id"
                          value={addBonus.bonus_text}
                          onChange={(e) => handleInputChangeAdd(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onAddBonusSubmit}>
              {content.addMsg}
            </Button>{" "}
            <Button color="secondary" onClick={toggleAddBonus}>
              {content.cancelMsg}
            </Button>
          </ModalFooter>
        </Modal>

        {/* Edit Bonuss */}

        <Modal size="lg" isOpen={isEditBonusOpen}>
          <ModalHeader>Edit Bonus</ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col>
                  <Row form>
                    <Col>
                      <FormGroup>
                        <Input
                          type="file"
                          id="add-image"
                          name="image"
                          label={editBonus.image || "choose an image file"}
                          onChange={(e) => handleFileChangeAdd(e)}
                        />
                        <p className={classes.error}>{editBonus.error}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label>
                          Rank <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="number"
                          name="rank"
                          value={editBonus.rank}
                          onChange={(e) => handleInputChangeEdit(e)}
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
                          value={editBonus.name}
                          onChange={(e) => handleInputChangeEdit(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          URL Home <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="url_home"
                          id="title-id"
                          value={editBonus.url_home}
                          onChange={(e) => handleInputChangeEdit(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          URL Registration{" "}
                          <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="url_registration"
                          id="title-id"
                          value={editBonus.url_registration}
                          onChange={(e) => handleInputChangeEdit(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          Turnover <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="number"
                          name="turnover"
                          id="title-id"
                          value={editBonus.turnover}
                          onChange={(e) => handleInputChangeEdit(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          Odds <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="number"
                          name="turnover"
                          id="title-id"
                          value={editBonus.turnover}
                          onChange={(e) => handleInputChangeEdit(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="category-id">
                          Bookie <span className={classes.error}>*</span>
                        </Label>

                        <Input
                          type="select"
                          name="bookie_id"
                          id="bookie-edit"
                          defaultValue={editBonus.bookie_id}
                          onChange={(e) => onSelectChange("edit", e)}
                        >
                          {props.bookies.length > 0 &&
                            props.bookies.map((item, key) => (
                              <option
                                id={key}
                                key={item.bookie_id}
                                value={item.bookie_id}
                              >
                                {item.name}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col>
                      <FormGroup>
                        <Label for="title-id">
                          Bonus Text <span className={classes.error}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="bonus_text"
                          id="title-id"
                          value={editBonus.bonus_text}
                          onChange={(e) => handleInputChangeEdit(e)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onEditBonusSubmit}>
              {content.updateMsg}
            </Button>{" "}
            <Button color="secondary" onClick={toggleEditBonus}>
              {content.cancelMsg}
            </Button>
          </ModalFooter>
        </Modal>

        <Row style={{paddingBottom:20}}>
          <Col>
            {/* <AppHeader /> */}
            {/* <OurCarousel /> */}
            {props.auth.type == "1" ? (
              <Button
                id="handelToggleBtn"
                variant="contained"
                color="primary"
                className={classes.addButton}
                onClick={() =>
                  onDeleteEditAddClick(null, AppConstants.ADD_ACTION)
                }
              >
                ADD
              </Button>
            ) : null}
            <h4 style={{ color: "#9a9a9a" }}>Bonuses</h4>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead
                  id="handelMobileView"
                  style={{ backgroundColor: "#000000" }}
                >
                  <TableRow>
                    <TableCell style={{ color: "white" }}>Bookmaker</TableCell>
                    <TableCell style={{ color: "white" }}>Bonus</TableCell>
                    <TableCell style={{ color: "white" }}>
                      Wagering Requirement
                    </TableCell>
                    <TableCell style={{ color: "white" }}>Min. odds</TableCell>
                    <TableCell style={{ color: "white" }}></TableCell>
                    {props.auth.type == "1" ? (
                      <TableCell style={{ color: "white" }}>Action</TableCell>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.bonus.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <img
                          id="handelImg"
                          style={{ width: 100 }}
                          src={row.image}
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell id="handelMobileView">
                        {row.bonus_text}
                      </TableCell>
                      <TableCell id="handelMobileView">
                        {row.turnover}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`${row.url_home}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            id="handelTxt"
                            style={{
                              backgroundColor: "#4991A8",
                              color: "white",
                              fontSize: 12,
                            }}
                          >
                            Claim Bonus
                          </Button>
                        </a>
                      </TableCell>
                      {props.auth.type == "1" ? (
                        <TableCell>
                          <span
                            style={{
                              display: "flex",
                              flexDirection: "row-reverse",
                            }}
                          >
                            <IconButton
                              aria-label="delete"
                              className={classes.margin}
                              onClick={
                                () =>
                                  // alert(row.id)
                                  props.deleteBounces(row.id)
                                //   onDeleteEditAddClick(params.data, AppConstants.DELETE_ACTION)
                              }
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                              aria-label="edit"
                              className={classes.margin}
                              onClick={() => toggleEditBonus(row.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <DataGrid
            data={data}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          /> */}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
ManageBonuses.propTypes = {
  onChange: PropTypes.func,
};
const mapStateToProps = (store) => {
  return {
    bookies: store.bookieReducer.bookies,
    bonus: store.bonusReducer.bonus,
    auth: store.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBonus: (data) => dispatch(addBonus(data)),
    getBonus: () => dispatch(getBonus()),
    deleteBounces: (data) => dispatch(deleteBounces(data)),
    getBookie: () => dispatch(getBookie()),
    updateBonus: (data, id) => dispatch(updateBonus(data, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageBonuses);
