/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

//import Components
import { Card, CardBody, Col, Row } from "react-bootstrap";
import BreadcrumbItem from "../../../../Common/BreadcrumbItem";
import { Field, Form, Formik } from "formik";
import RichTextEditor from "../../../../Common/Editor/RichTextEditor";
import DatePicker from "../../../../Common/DatePicker";

const AddRecommendation = () => {
  return (
    <React.Fragment>
      <BreadcrumbItem
        mainTitle="Recommendation"
        subTitle="Recommendation Add"
      />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              <div className="container">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    age: "",
                    date: "",
                    time: "",
                    action: "",
                    priceCondition: "",
                    target1: "",
                    target2: "",
                    target3: "",
                    stopLoss: "",
                    isActive: false,
                    recommendation: "",
                  }}
                  //   validationSchema={AboutSchema}
                  onSubmit={(values) => console.log("ok", values)}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                      <Row>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Date</label>
                            <div className="custom-date">
                              <DatePicker
                                value={values?.date || null}
                                onChange={(date: any) =>
                                  setFieldValue("date", date)
                                }
                              />
                            </div>
                            {errors.date && touched.date ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.date}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Time</label>
                            <div className="custom-date">
                              <DatePicker
                                value={values?.date}
                                onChange={(date: any) =>
                                  setFieldValue("time", date)
                                }
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat="HH:mm"
                              />
                            </div>
                            {errors.time && touched.time ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.time}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Action</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="First name"
                              name="firstName"
                            />
                            {errors.firstName && touched.firstName ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">
                              Price Condition
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="First name"
                              name="firstName"
                            />
                            {errors.firstName && touched.firstName ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={4}>
                          <div className="mb-3">
                            <label className="form-label">Target 1</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="First name"
                              name="firstName"
                            />
                            {errors.firstName && touched.firstName ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="mb-3">
                            <label className="form-label">Target 2</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="First name"
                              name="firstName"
                            />
                            {errors.firstName && touched.firstName ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="mb-3">
                            <label className="form-label">Target 3</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="First name"
                              name="firstName"
                            />
                            {errors.firstName && touched.firstName ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Stop Loss</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="First name"
                              name="firstName"
                            />
                            {errors.firstName && touched.firstName ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label">Active</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="First name"
                              name="firstName"
                            />
                            {errors.firstName && touched.firstName ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12}>
                          <div className="mb-3">
                            <label className="form-label">Recommendation</label>
                            <RichTextEditor
                              value="test"
                              onChange={(e) => console.log(e)}
                            />
                            {errors.firstName && touched.firstName ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.firstName}
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
                          >
                            Cancel
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Submit
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

export default AddRecommendation;
