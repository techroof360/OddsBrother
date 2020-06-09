import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from "reactstrap";
import content from "../resources/properties";

const ConfirmationPoppu = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    call() {
      // props.onSave(bet);
    }
  }));

  useEffect(() => {}, []);

  return (
    <Modal size="lg" isOpen={props.isOpen}>
      <ModalHeader>{content.confirmationTitle}</ModalHeader>
      <ModalBody>
        <Alert color="warning">{props.confirmationMsg}</Alert>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.confirmationAction}>
          {content.confirmMsg}
        </Button>{" "}
        <Button color="secondary" onClick={props.toggleConfirmation}>
          {content.cancelMsg}
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default ConfirmationPoppu;
