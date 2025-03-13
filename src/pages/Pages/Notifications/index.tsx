/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

//import Components
import { Card, CardBody, Col, Row, Spinner } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { postRequest } from "../../../service/fetch-services";
import ToastAlert from "../../../helper/toast-alert";
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import RichTextEditor from "../../../Common/Editor/RichTextEditor";
import Loader from "../../../Common/Loader/Loader";

const validationSchema = Yup.object().shape({
  message: Yup.string().required("Message is required!"),
});

interface FormValues {
  message: string;
}

const Notifications = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      // Submit user details to the backend
      setLoading(true);
      const body = {
        message: values?.message || "",
      };
      const url = "notification/send";
      const result = await postRequest(url, body);

      if (result) {
        console.log(result.message);
        ToastAlert.success(`Notification created successfully`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const handleCancel = (resetForm: () => void) => {
    resetForm();
  };

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Notifications" subTitle="Notifications" />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              <div className="container">
                <Formik<FormValues>
                  initialValues={{
                    message: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm(); // This resets the form after submission
                  }}
                >
                  {({ errors, touched, values, setFieldValue, resetForm }) => (
                    <Form>
                      <Row>
                        <Col sm={12}>
                          <div className="mb-3">
                            <label className="form-label">Message</label>
                            <RichTextEditor
                              value={values?.message}
                              onChange={(value: any) =>
                                setFieldValue("message", value)
                              }
                            />
                            {errors.message && touched.message ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.message}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary me-1"
                            onClick={() => handleCancel(resetForm)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                          >
                            Submit{" "}
                            {loading ? (
                              <Spinner className="ml-2" size="sm" />
                            ) : (
                              ""
                            )}
                          </button>
                        </div>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Loader updateLoading={loading}></Loader>
      </Row>
    </React.Fragment>
  );
};

export default Notifications;
