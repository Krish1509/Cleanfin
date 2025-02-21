/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

const ConfirmationModal = ({
  show,
  handleClose,
  handleConfirm,
  message = "",
  loading = false,
}: any) => {
  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        id="removeCartModal"
        className="fade zoomIn"
        dialogClassName="modal-dialog-centered"
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
        ></Modal.Header>
        <Modal.Body className="bg-transparent">
          <div className="mt-2 text-center">
            <i className="fas fa-exclamation-circle fs-1"></i>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h5>Are you sure ?</h5>
              <p className="text-muted mx-4 mb-0">
                {message
                  ? message
                  : "Are you sure you want to change this record ?"}
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <Button
              type="button"
              variant="light"
              className="btn w-sm"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="btn w-sm"
              id="remove-cartproduct"
              onClick={handleConfirm}
              disabled={loading}
            >
              Yes {loading ? <Spinner className="ml-2" size="sm" /> : ""}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmationModal;
