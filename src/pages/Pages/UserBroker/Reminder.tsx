/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import React from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import DatePicker from "../../../Common/DatePicker";
import * as Yup from "yup";

// Define the shape of form values with proper types
interface ReminderFormValues {
  remark: string;
  date: Date | string;
}

// Props interface with improved typing
interface ReminderModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (values: ReminderFormValues) => void;
  loading?: boolean;
  selectedData: any;
}

// Validation schema using Yup
const ReminderSchema = Yup.object().shape({
  remark: Yup.string().required("Please enter a remark"),
  date: Yup.date().required("Please select a date"),
});

const Reminder: React.FC<ReminderModalProps> = ({ show, handleClose, handleConfirm, loading = false, selectedData }) => {
  // Initial form values
  const initialValues: ReminderFormValues = {
    remark: selectedData?.remark || "",
    date: selectedData?.reminderDate || "",
  };

  return (
    <Modal show={show} onHide={handleClose} id="removeCartModal" className="fade zoomIn" dialogClassName="modal-dialog-centered" size="lg">
      <Modal.Header closeButton>Reminder</Modal.Header>
      <Modal.Body className="bg-transparent">
        <div>
          <Formik initialValues={initialValues} validationSchema={ReminderSchema} onSubmit={(values) => handleConfirm(values)}>
            {({ isSubmitting, errors, touched, setFieldValue, values }) => (
              <Form>
                <Row>
                  <Col sm={6}>
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        Date
                      </label>
                      <div className="custom-date">
                        <DatePicker
                          onChange={(date: Date) => setFieldValue("date", date)}
                          value={values?.date ? new Date(values?.date) : null}
                          id="date"
                          showTimeSelect
                          dateFormat="dd-MM-YYYY HH:mm"
                          autoComplete="off"
                        />
                        {touched.date && errors.date && <div className="invalid-feedback d-block">{errors.date}</div>}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <div className="mb-3">
                      <label htmlFor="remark" className="form-label">
                        Remark
                      </label>
                      <textarea
                        className="form-control"
                        id="remark"
                        placeholder="Enter your reminder details here"
                        name="remark"
                        onChange={(event) => setFieldValue("remark", event.target.value)}
                        value={values.remark}
                        rows={5}
                      />
                      {touched.remark && errors.remark && <div className="invalid-feedback d-block">{errors.remark}</div>}
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

export default Reminder;
