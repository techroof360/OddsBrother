import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import content from "../resources/properties";

import axios from "axios";
import apiEndpoints from "../resources/apiEndpoins";

const AddBookiePopup = React.forwardRef((props, ref) => {
  const initialFormState = {
    name: "",
    webLink: "",
    icon: ""
  };

  React.useImperativeHandle(ref, () => ({
    call() {
      // props.onSave(bet);
    }
  }));

  const [bookie, setBookie] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setBookie({ ...bookie, [name]: value });
  };

  const onSubmit = () => {
    axios.post(apiEndpoints.BOOKIE_API, bookie).then(res => {
      props.toggleAddBookie();
    });
  };

  useEffect(() => {}, []);

  return (
    <Modal size="lg" isOpen={props.isAddBookieOpen}>
      <ModalHeader>Add Bookie</ModalHeader>
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
                      value={bookie.name}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="webLink-id">Web Address</Label>
                    <Input
                      valid
                      type="text"
                      name="webLink"
                      id="webLink-id"
                      value={bookie.webLink}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="icon-id">Icon</Label>
                    <Input
                      invalid
                      type="text"
                      name="icon"
                      id="icon-id"
                      value={bookie.icon}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSubmit}>
          {content.addMsg}
        </Button>{" "}
        <Button color="secondary" onClick={props.toggleAddBookie}>
          {content.cancelMsg}
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default AddBookiePopup;
