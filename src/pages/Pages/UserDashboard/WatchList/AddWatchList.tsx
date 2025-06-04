/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { postRequest } from "../../../../service/fetch-services";
import ToastAlert from "../../../../helper/toast-alert";
import * as Yup from "yup";

interface AddModalProps {
  show: boolean;
  handleClose: () => void;
  handleAfterCreate: (data: any) => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
});

const AddWatchList: React.FC<AddModalProps> = ({ show, handleClose, handleAfterCreate }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleSubmit = async (values: any) => {
    try {
      // Submit user details to the backend
      setLoading(true);
      const body = {
        ...values,
      };
      const result = await postRequest("watchlist/create", body);

      if (result) {
        ToastAlert.success("Watchlist created successfully!");
        setLoading(false);
        handleClose();
        handleAfterCreate(result?.data);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} id="removeCartModal" className="fade zoomIn" dialogClassName="modal-dialog-centered">
      <Modal.Header closeButton style={{ borderBottom: "none" }}>
        Add Watchlist
      </Modal.Header>
      <Modal.Body className="bg-transparent">
        <Formik initialValues={{ name: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field type="text" className="form-control" id="name" placeholder="Name" name="name" />
              {touched.name && errors.name && <div className="invalid-feedback d-flex align-items-start">{errors.name}</div>}
              <div className="d-flex gap-2 justify-content-end mt-4 mb-2">
                <Button type="button" variant="light" className="btn w-sm" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary" className="btn w-sm" id="remove-cartproduct" disabled={isSubmitting || loading}>
                  Save {loading ? <Spinner className="ml-2" size="sm" /> : ""}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddWatchList;
