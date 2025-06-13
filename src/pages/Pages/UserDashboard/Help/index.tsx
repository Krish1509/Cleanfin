/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

//import Components
import { Card, CardBody, Col, Row, Spinner } from "react-bootstrap";
import BreadcrumbItem from "../../../../Common/BreadcrumbItem";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { postRequest } from "../../../../service/fetch-services";
import ToastAlert from "../../../../helper/toast-alert";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").optional(),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]{10}$/, "Invalid phone number format")
    .optional(),
  query: Yup.string().required("Query is required"),
});

interface FormValues {
  email: string;
  phone: string;
  query: string;
}

const AddHelp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    try {
      setLoading(true);
      const result = await postRequest("userQuery/create", values);

      if (result) {
        ToastAlert.success(`User Query created successfully`);
        resetForm();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Query Form" subTitle={`Your Query`} />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              <div className="container">
                <Formik<FormValues>
                  initialValues={{
                    email: "",
                    phone: "",
                    query: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Row>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field type="email" className="form-control" id="email" placeholder="Email" name="email" />
                            {errors.email && touched.email ? <div className="invalid-feedback d-flex align-items-start">{errors.email}</div> : null}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <Field type="tel" className="form-control" id="phone" placeholder="Phone" name="phone" />
                            {errors.phone && touched.phone ? <div className="invalid-feedback d-flex align-items-start">{errors.phone}</div> : null}
                          </div>
                        </Col>
                        <Col sm={12}>
                          <div className="mb-3">
                            <label className="form-label">Query</label>
                            <Field type="text" as="textarea" rows="3" className="form-control" id="query" placeholder="Please describe your issue or question" name="query" />
                            {errors.query && touched.query ? <div className="invalid-feedback d-flex align-items-start">{errors.query}</div> : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <div className="text-end">
                          <button type="button" className="btn btn-outline-secondary me-1" onClick={() => navigate("/dashboard/user")}>
                            Cancel
                          </button>
                          <button type="submit" className="btn btn-primary" disabled={loading}>
                            Submit {loading ? <Spinner className="ml-2" size="sm" /> : ""}
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
      </Row>
    </React.Fragment>
  );
};

export default AddHelp;
