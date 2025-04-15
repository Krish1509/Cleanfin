/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

//import Components
import { Card, CardBody, Col, Row, Spinner } from "react-bootstrap";
import BreadcrumbItem from "../../../../Common/BreadcrumbItem";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { postRequest } from "../../../../service/fetch-services";
import ToastAlert from "../../../../helper/toast-alert";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]{10}$/, "Invalid phone number format")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
    .required("Pincode is required"),
});

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const UserBrokerRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const result = await postRequest("userBrokerRegistration/create", values);

      if (result) {
        ToastAlert.success(`User Broker Registration created successfully`);
        navigate("/dashboard/user");
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
      <BreadcrumbItem mainTitle="User Broker Registration" subTitle={`User Broker Registration Add`} />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              <div className="container">
                <Formik<FormValues>
                  initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Row>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <Field type="text" className="form-control" id="first_name" placeholder="First Name" name="first_name" />
                            {errors.first_name && touched.first_name ? <div className="invalid-feedback d-flex align-items-start">{errors.first_name}</div> : null}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <Field type="text" className="form-control" id="last_name" placeholder="Last Name" name="last_name" />
                            {errors.last_name && touched.last_name ? <div className="invalid-feedback d-flex align-items-start">{errors.last_name}</div> : null}
                          </div>
                        </Col>
                      </Row>
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
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Address</label>
                            <Field type="text" as="textarea" rows="1" className="form-control" id="address" placeholder="Address" name="address" />
                            {errors.address && touched.address ? <div className="invalid-feedback d-flex align-items-start">{errors.address}</div> : null}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">City</label>
                            <Field type="text" className="form-control" id="city" placeholder="City" name="city" />
                            {errors.city && touched.city ? <div className="invalid-feedback d-flex align-items-start">{errors.city}</div> : null}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <Field type="text" className="form-control" id="state" placeholder="State" name="state" />
                            {errors.state && touched.state ? <div className="invalid-feedback d-flex align-items-start">{errors.state}</div> : null}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Pincode</label>
                            <Field type="number" className="form-control" id="pincode" placeholder="Pincode" name="pincode" />
                            {errors.pincode && touched.pincode ? <div className="invalid-feedback d-flex align-items-start">{errors.pincode}</div> : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <div className="text-end">
                          <button type="button" className="btn btn-outline-secondary me-1" onClick={() => navigate("/recommendation")}>
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

export default UserBrokerRegistration;
