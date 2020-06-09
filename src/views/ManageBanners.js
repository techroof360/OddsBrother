import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DataGrid from "../components/DataGrid";
import content from "../resources/properties";
// import apiEndpoints from "../resources/apiEndpoins";
import AppConstants from "../resources/AppConstants";
// import RichTextEditor from "react-rte";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
// import img from '../images/nfl.jpg';
import { connect } from "react-redux";
import {
  addBanner,
  getBanners,
  deleteBanner,
} from "../redux/actions/ManageBannerAction";
import "../style/responsive.css";
import Header from "./Header";
import { toast } from "react-toastify";
import Footer from "./footer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
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
    maxHeight: 50,
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

const ManageBanners = (props) => {
  const classes = useStyles();

  // const onGridReady = params => {
  //   params.api.sizeColumnsToFit();
  // };

  // const [data, setData] = useState([]);
  // console.log('check banner img', data)
  // const [editBanner, setEditBanner] = useState({});
  const [addBanner, setAddBanner] = useState({
    banner: "",
  });

  // const [fileEdit, setFileEdit] = useState({
  //   imageUrl: "",
  //   file: null
  // });

  const [fileAdd] = useState({
    imageUrl: "",
    isPreviewHidden: true,
    file: null,
  });

  // const [richTextEdit, setRichTextEdit] = useState(
  //   RichTextEditor.createEmptyValue()
  // );

  const [isAddBannerOpen, setIsAddBannerOpen] = useState(false);

  const [delConfirmation, setDelConfirmation] = useState({
    state: false,
    id: 0,
  });

  const hideField = props.auth.type == "1" ? false : true;
  //  hide: hideField,
  // const columnDefs = [
  //   {
  //     headerName: "Banner",
  //     field: "banner",
  //     width: 50,
  //     height: 200,
  //     // cellRendererFramework: function(params) {
  //     //   return (
  //     //     <img
  //     //       className={classes.imagepreview}
  //     //       src="{imgpath}"
  //     //       alt="img"
  //     //     />
  //     //   );
  //     // }
  //   },
  //   {
  //     headerName: "Action",
  //     field: "bannerId",
  //     hide:hideField,
  //     width: 50,
  //     cellRendererFramework: function(params) {
  //       // console.log('params', params)
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
  //         </div>
  //       );
  //     }
  //   }
  // ];

  const toggleConfirmation = () => {
    setDelConfirmation(!delConfirmation);
  };
  const toggleAddBanner = () => {
    clearStates();
    setIsAddBannerOpen(!isAddBannerOpen);
  };

  const clearStates = () => {
    // setAddBanner(initialFormState);
  };

  // const deleteBanner = () => {
  //   axios.delete(apiEndpoints.BANNER_API + delConfirmation.id).then(res => {
  //     setDelConfirmation({
  //       state: !delConfirmation.state,
  //       id: 0
  //     });
  //     setData(data.filter(banner => banner.bannerId !== delConfirmation.id));
  //   });
  // };

  const onDeleteEditAddClick = (bannerItem, action) => {
    switch (action) {
      case AppConstants.ADD_ACTION:
        toggleAddBanner();
        break;

      case AppConstants.DELETE_ACTION:
        // console.log('delete banner', bannerItem.id)
        props.deleteBanner(bannerItem.id);
        // setDelConfirmation({
        //   state: !delConfirmation.state,
        //   id: bannerItem.bannerId
        // });
        break;
      default:
        alert("No implementation");
        break;
    }
  };

  const checkMimeType = (file, action) => {
    let err = "";
    const types = AppConstants.SUPPORTED_IMAGE_TYPES;
    if (types.every((type) => file.type !== type)) {
      err = file.type + " is not a supported format\n";
      setAddBanner({ ...addBanner, ["error"]: err });
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
      setAddBanner({ ...addBanner, ["error"]: err });
      return false;
    } else {
      return true;
    }
  };

  const onAddBannerSubmit = () => {
    // console.log('formdata',addBanner)

    if (addBanner.banner === "") {
      toast.error("Please Select File");
    } else {
      let formdata = new FormData();
      formdata.append("banner", addBanner.banner);
      props.addBanner(formdata);
      toggleAddBanner();
    }
  };

  const handleFileChangeAdd = (e) => {
    const banner = e.target.files[0];

    let size = AppConstants.MAX_FILE_SIZE;
    const types = AppConstants.SUPPORTED_IMAGE_TYPES;
    let err = "";
    if (banner.size / 1000 > size) {
      toast.error(" is too large, please pick a smaller file");
    } else if (types.every((type) => banner.type !== type)) {
      toast.error(AppConstants.IMAGES_VALIDATE);
    } else {
      setAddBanner({ ...addBanner, banner });
    }
  };

  useEffect(() => {
    props.getBanners();
  }, []);
  // console.log(' props.auth.type banner', props.auth.type)
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
            <Alert color="warning">{content.deleteConfirmationMsg}</Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={deleteBanner}>
              {content.confirmMsg}
            </Button>{" "}
            <Button color="secondary" onClick={toggleConfirmation}>
              {content.cancelMsg}
            </Button>
          </ModalFooter>
        </Modal>
        {/* Add Banner */}
        <Modal size="lg" isOpen={isAddBannerOpen}>
          <ModalHeader>Add Banner</ModalHeader>
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
                            Note: For best viewing please add image with size
                            (750 x 500)
                          </span>
                        </Label>
                        <Input
                          type="file"
                          id="add-image"
                          name="banner"
                          label={"choose an image file"}
                          accept="image/*"
                          onChange={(e) => handleFileChangeAdd(e)}
                        />
                        <p className={classes.error}>{addBanner.error}</p>
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
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onAddBannerSubmit}>
              ADD
            </Button>
            <Button color="secondary" onClick={toggleAddBanner}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Row>
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
            <TableContainer component={Paper}>
              <Table style={{ width: "100%" }}>
                <TableHead style={{ backgroundColor: "black" }}>
                  <TableRow
                    style={{
                      fontFamily: "Nunito Sans",
                      color: "#bdbdbd",
                      marginLeft: 10,
                      paddingTop: 5,
                    }}
                  >
                    <TableCell style={{ color: "white" }}>Banner</TableCell>
                    {props.auth.type == "1" ? (
                      <TableCell style={{ color: "white" }}>Action</TableCell>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {console.log('settledBets', settledBets)} */}
                  {props.banners.map((row) => {
                    return (
                      <TableRow
                        align="right"
                        key={row.name}
                        className="table-row"
                      >
                        <TableCell>
                          <img
                            width="100px"
                            src={row.banner}
                            alt="banner images"
                          />
                        </TableCell>
                        {props.auth.type == "1" ? (
                          <TableCell onClick={() => props.deleteBanner(row.id)}>
                            <DeleteIcon fontSize="small" />
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <DataGrid
            data={props.banners}
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
ManageBanners.propTypes = {
  onChange: PropTypes.func,
};
const mapStateToProps = (store) => {
  return {
    banners: store.bannerReducer.banners,
    auth: store.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBanner: (data) => dispatch(addBanner(data)),
    getBanners: () => dispatch(getBanners()),
    deleteBanner: (data) => dispatch(deleteBanner(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageBanners);
