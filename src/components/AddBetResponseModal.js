import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const AddBetResponseModal = props => {
  useEffect(() => {
    //console.log(bet);
  });

  return (
    <Modal size="lg" isOpen={isAddBetOpen} toggle={toggleAddBet}>
      <ModalBody>//TODO</ModalBody>
    </Modal>
  );
};

export default AddBetResponseModal;
