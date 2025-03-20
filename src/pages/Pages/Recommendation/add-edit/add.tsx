/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

//import Components
import { Card, CardBody, Col, Row, Spinner } from "react-bootstrap";
import BreadcrumbItem from "../../../../Common/BreadcrumbItem";
import { Field, Form, Formik } from "formik";
import RichTextEditor from "../../../../Common/Editor/RichTextEditor";
import DatePicker from "../../../../Common/DatePicker";
import Select from "react-select";
import * as Yup from "yup";
import { postRequest } from "../../../../service/fetch-services";
import ToastAlert from "../../../../helper/toast-alert";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ToggleSwitch from "../../../../Common/ToggleSwitch";

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required!"),
  action: Yup.string().required("Action is required!"),
  priceCondition: Yup.string().required("Price Condition is required!"),
  stopLoss: Yup.string().required("Stop loss is required!"),
  scriptId: Yup.string().required("Script Id is required!"),
});

interface FormValues {
  date: string;
  time: string;
  action: string;
  priceCondition: string;
  price: number;
  target1: number;
  target2: number;
  target3: number;
  stopLoss: number;
  recommendation: string;
  target1Achieved: boolean;
  target2Achieved: boolean;
  target3Achieved: boolean;
  stopLossAchieved: boolean;
  scriptId: string;
  segmentID: number;
}

const AddRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editId = location?.state !== undefined ? location?.state?.id : "";
  const segmentId =
    location?.state !== undefined ? location?.state?.segmentID : "";
  const ActionOptions = [
    { value: "buy", label: "Buy" },
    { value: "sell", label: "Sell" },
  ];
  const PriceOptions = [
    { value: "above", label: "Above" },
    { value: "below", label: "Below" },
    { value: "cmp", label: "CMP" },
  ];
  const SegmentOptions = [
    { value: 1, label: "NSE_EQ" },
    { value: 2, label: "NSE_FO" },
    { value: 5, label: "MCX_FO" },
  ];

  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [getLoading, setGetLoading] = useState(false);
  const [scriptloading, setScriptloading] = useState(false);
  const [scriptdata, setScriptdata] = useState<any>([]);

  const handleSubmit = async (values: any) => {
    try {
      // Submit user details to the backend
      setLoading(true);
      const body = {
        ...values,
        date: values?.date ? moment(values?.date).format("YYYY-MM-DD") : "",
        time: values?.time || "",
      };
      if (editData?._id) {
        body.id = editData?._id;
      }
      const url = editData?._id ? "recommendation/edit" : "recommendation/add";
      const result = await postRequest(url, body);

      if (result) {
        ToastAlert.success(
          `Recommendation ${editData?._id ? "updated" : "created"} successfully`
        );
        navigate("/recommendation");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const handlechange = async (value: number) => {
    try {
      setScriptloading(true);
      const result = await postRequest("option-scripts/list", {
        segmentID: value,
      });

      if (result) {
        const formattedArray = result?.data?.map(
          (item: { _id: any; name: any }) => ({
            value: item._id,
            label: item.name,
          })
        );

        setScriptdata(formattedArray);
      }

      setScriptloading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (segmentId) {
      handlechange(segmentId);
    }
  }, [segmentId]);

  const fetchDetail = async () => {
    try {
      // Submit user details to the backend
      setGetLoading(true);
      const body = {
        id: editId,
      };
      const result = await postRequest("recommendation/view", body);

      if (result) {
        setEditData(result?.data);
      }
      setGetLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (editId) {
      fetchDetail();
    }
  }, [editId]);

  return (
    <React.Fragment>
      <BreadcrumbItem
        mainTitle="Recommendation"
        subTitle={`Recommendation ${editData?._id ? "Edit" : "Add"}`}
      />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              {getLoading ? (
                <center className="m-4">Loading...</center>
              ) : (
                <div className="container">
                  <Formik<FormValues>
                    initialValues={{
                      date: editData?.date || "",
                      time: editData?.time || "",
                      action: editData?.action || "",
                      priceCondition: editData?.priceCondition || "",
                      price: editData?.price || "",
                      target1: editData?.target1 || "",
                      target2: editData?.target2 || "",
                      target3: editData?.target3 || "",
                      stopLoss: editData?.stopLoss || "",
                      recommendation: editData?.recommendation || "",
                      target1Achieved: editData?.target1Achieved || false,
                      target2Achieved: editData?.target2Achieved || false,
                      target3Achieved: editData?.target3Achieved || false,
                      stopLossAchieved: editData?.stopLossAchieved || false,
                      scriptId: editData?.scriptId || "",
                      segmentID: segmentId || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched, values, setFieldValue }) => (
                      <Form>
                        <Row>
                          <Col sm={6}>
                            <div className="mb-3">
                              <label className="form-label">Segment</label>
                              <Select
                                isSearchable={true}
                                isClearable
                                options={SegmentOptions}
                                placeholder="Select"
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(value) => {
                                  setFieldValue(
                                    "segmentID",
                                    value?.value || ""
                                  );

                                  // Only call handlechange if a value is selected
                                  if (value) {
                                    handlechange(value?.value);
                                  }
                                  if (!value) {
                                    setScriptdata([]);
                                    setFieldValue("scriptId", "");
                                  }
                                }}
                                value={SegmentOptions?.filter(
                                  (obj) => values?.segmentID === obj.value
                                )}
                              />

                              {errors.action && touched.action ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.action}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className="mb-3">
                              <label className="form-label">Script</label>
                              <Select
                                isClearable
                                isSearchable={true}
                                options={scriptdata}
                                placeholder="Select"
                                className="react-select"
                                isDisabled={
                                  scriptloading || !scriptdata?.length
                                }
                                classNamePrefix="react-select"
                                onChange={(selectedOption) => {
                                  setFieldValue(
                                    "scriptId",
                                    selectedOption ? selectedOption.value : ""
                                  );
                                }}
                                value={scriptdata?.filter(
                                  (obj: any) => values?.scriptId === obj.value
                                )}
                              />

                              {errors.scriptId && touched.scriptId ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.scriptId}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
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
                                  minDate={new Date()}
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
                                  value={
                                    values?.time
                                      ? new Date(`1970-01-01T${values?.time}`)
                                      : null
                                  }
                                  onChange={(date: any) => {
                                    console.log(date);
                                    setFieldValue(
                                      "time",
                                      moment(date).format("HH:mm")
                                    );
                                  }}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeFormat="HH:mm"
                                  dateFormat="HH:mm"
                                  autoComplete="off"
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
                              <Select
                                isSearchable={true}
                                isClearable
                                options={ActionOptions}
                                placeholder="Select"
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(value) =>
                                  setFieldValue("action", value?.value)
                                }
                                value={ActionOptions?.filter(
                                  (obj) => values?.action === obj.value
                                )}
                              />
                              {errors.action && touched.action ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.action}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className="mb-3">
                              <label className="form-label">
                                Price Condition
                              </label>
                              <Select
                                isClearable
                                isSearchable={true}
                                options={PriceOptions}
                                placeholder="Select"
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(value) =>
                                  setFieldValue("priceCondition", value?.value)
                                }
                                value={PriceOptions?.filter(
                                  (obj) => values?.priceCondition === obj.value
                                )}
                              />
                              {errors.priceCondition &&
                                touched.priceCondition ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.priceCondition}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col sm={12}>
                            <div className="mb-3">
                              <label className="form-label">Price</label>
                              <Field
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="Price"
                                name="price"
                              />
                              {errors.price && touched.price ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.price}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={`${editData?._id ? "5" : "6"}`}>
                            <div className="mb-3">
                              <label className="form-label">Target 1</label>
                              <Field
                                type="number"
                                className="form-control"
                                id="target1"
                                placeholder="Target 1"
                                name="target1"
                              />
                              {errors.target1 && touched.target1 ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.target1}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                          {editData?._id ? (
                            <Col sm={1}>
                              <div className="mb-3">
                                <label className="form-label">Achived</label>
                                <ToggleSwitch
                                  checked={values?.target1Achieved}
                                  onChange={() =>
                                    setFieldValue(
                                      "target1Achieved",
                                      !values?.target1Achieved
                                    )
                                  }
                                />
                              </div>
                            </Col>
                          ) : (
                            ""
                          )}
                          <Col sm={`${editData?._id ? "5" : "6"}`}>
                            <div className="mb-3">
                              <label className="form-label">Target 2</label>
                              <Field
                                type="number"
                                className="form-control"
                                id="target2"
                                placeholder="Target 2"
                                name="target2"
                              />
                              {errors.target2 && touched.target2 ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.target2}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                          {editData?._id && <Col sm={1} />}
                        </Row>
                        <Row>
                          <Col sm={`${editData?._id ? "5" : "6"}`}>
                            <div className="mb-3">
                              <label className="form-label">Target 3</label>
                              <Field
                                type="number"
                                className="form-control"
                                id="target3"
                                placeholder="Target 3"
                                name="target3"
                              />
                              {errors.target3 && touched.target3 ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.target3}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                          {editData?._id && <Col sm={1} />}
                          <Col sm={`${editData?._id ? "5" : "6"}`}>
                            <div className="mb-3">
                              <label className="form-label">Stop Loss</label>
                              <Field
                                type="number"
                                className="form-control"
                                id="stopLoss"
                                placeholder="Stop Loss"
                                name="stopLoss"
                              />
                              {errors.stopLoss && touched.stopLoss ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.stopLoss}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                          {editData?._id ? (
                            <Col sm={1}>
                              <div className="mb-3">
                                <label className="form-label">Achived</label>
                                <ToggleSwitch
                                  checked={values?.stopLossAchieved}
                                  onChange={() =>
                                    setFieldValue(
                                      "stopLossAchieved",
                                      !values?.stopLossAchieved
                                    )
                                  }
                                />
                              </div>
                            </Col>
                          ) : (
                            ""
                          )}
                        </Row>
                        <Row>
                          <Col sm={12}>
                            <div className="mb-3">
                              <label className="form-label">
                                Recommendation
                              </label>
                              <RichTextEditor
                                value={values?.recommendation}
                                onChange={(value) =>
                                  setFieldValue("recommendation", value)
                                }
                              />
                              {errors.recommendation &&
                                touched.recommendation ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.recommendation}
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
                              onClick={() => navigate("/recommendation")}
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
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddRecommendation;
