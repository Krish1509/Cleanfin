import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import * as Yup from 'yup';

interface ReasonModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (reason: string) => void;
  loading?: boolean;
}

const ReasonModal: React.FC<ReasonModalProps> = ({
  show,
  handleClose,
  handleConfirm,
  loading = false,
}) => {

  const validationSchema = Yup.object({
    reason: Yup.string()
      .required('Reason is required')
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      id="removeCartModal"
      className="fade zoomIn"
      dialogClassName="modal-dialog-centered"
    >
      <Modal.Header closeButton style={{ borderBottom: "none" }}></Modal.Header>
      <Modal.Body>
        <div className="mt-2">
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h5>Tell a reason for inactivation:</h5>
            <Formik
              initialValues={{ reason: "" }}
              validationSchema={validationSchema}
              onSubmit={({ reason }) => handleConfirm(reason)}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Field
                    type="text"
                    className={`form-control ${touched.reason && errors.reason ? 'is-invalid' : ''}`}
                    id="reason"
                    placeholder="Reason"
                    name="reason"
                  />
                  {touched.reason && errors.reason && (
                    <div className="invalid-feedback">{errors.reason}</div>
                  )}
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
                      disabled={isSubmitting || loading}
                    >
                      Yes {loading ? <Spinner className="ml-2" size="sm" /> : ""}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReasonModal;
