/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import React from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import * as Yup from "yup";

// Define the shape of form values with proper types
interface ReplyFormValues {
  reply: string;
}

// Props interface with improved typing
interface ReplyModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (values: ReplyFormValues) => void;
  loading?: boolean;
  selectedData: any;
}

// Validation schema using Yup
const ReplySchema = Yup.object().shape({
  reply: Yup.string().required("Please enter a reply"),
});

const Reply: React.FC<ReplyModalProps> = ({ show, handleClose, handleConfirm, loading = false, selectedData }) => {
  // Initial form values
  const initialValues: ReplyFormValues = {
    reply: selectedData?.reply || "",
  };

  return (
    <Modal show={show} onHide={handleClose} id="removeCartModal" className="fade zoomIn" dialogClassName="modal-dialog-centered" size="lg">
      <Modal.Header closeButton>Reply</Modal.Header>
      <Modal.Body className="bg-transparent">
        <div>
          <Formik initialValues={initialValues} validationSchema={ReplySchema} onSubmit={(values) => handleConfirm(values)}>
            {({ isSubmitting, errors, touched, setFieldValue, values }) => (
              <Form>
                <Row>
                  <Col sm={12}>
                    <div className="mb-3">
                      <label htmlFor="reply" className="form-label">
                        Reply
                      </label>
                      <textarea
                        className="form-control"
                        id="reply"
                        placeholder="Enter your reply here"
                        name="reply"
                        onChange={(event) => setFieldValue("reply", event.target.value)}
                        value={values.reply}
                        rows={5}
                      />
                      {touched.reply && errors.reply && <div className="invalid-feedback d-block">{errors.reply}</div>}
                    </div>
                  </Col>
                </Row>

                <div className="d-flex gap-2 justify-content-end mt-4 mb-2">
                  <Button type="button" variant="light" className="btn w-sm" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="btn w-sm" id="submit-reminder" disabled={isSubmitting || loading}>
                    Submit {loading && <Spinner className="ms-2" size="sm" />}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Reply;
