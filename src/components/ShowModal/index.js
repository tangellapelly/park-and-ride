import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./index.css";
const ShowModal = (props) => {
  const [show, setShow] = useState(props.show);

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const { notices } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Alert..</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notices.map((notice, index) => {
          return notice;
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowModal;
