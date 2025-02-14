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
  description: Yup.string().required("Description is required!"),
});

interface FormValues {
  description: string;
}

const AddFeedback = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      // Submit user details to the backend
      const user = JSON.parse(localStorage.getItem("user") || "");
      setLoading(true);
      const body = {
        userId: user?._id,
        description: values?.description || "",
      };
      const url = "feedback/create";
      const result = await postRequest(url, body);

      if (result) {
        ToastAlert.success(`Feedback created successfully`);
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
      <BreadcrumbItem mainTitle="Content Bytes" subTitle="Add Feedback" />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              <div className="container">
                <Formik<FormValues>
                  initialValues={{
                    description: "",
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
                            <label className="form-label">Description</label>
                            <RichTextEditor
                              value={values?.description}
                              onChange={(value: any) =>
                                setFieldValue("description", value)
                              }
                            />
                            {errors.description && touched.description ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.description}
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

export default AddFeedback;
