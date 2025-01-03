/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
//import Components
import { Card, CardBody, Col, Row, Spinner } from "react-bootstrap";
import BreadcrumbItem from "../../../../Common/BreadcrumbItem";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { postRequest } from "../../../../service/fetch-services";
import ToastAlert from "../../../../helper/toast-alert";
import RichTextEditor from "../../../../Common/Editor/RichTextEditor";

interface FormValues {
  content: string;
}

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Page content is required!"),
});

const UpdateStaticPages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location?.state !== undefined ? location?.state?.row : "";

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    try {
      // Submit user details to the backend
      setLoading(true);
      const body = {
        pageName: editData?.pageName,
        content: values?.content || "",
      };

      const result = await postRequest("static-pages/update", body);

      if (result) {
        ToastAlert.success("Page content updated successfully");
        navigate("/staticPages");
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
      <BreadcrumbItem mainTitle="Static Pages" subTitle="Static Page Edit" />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              <div className="container">
                <Formik<FormValues>
                  initialValues={{
                    content: editData?.content || "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                      <Row>
                        <Col sm={12}>
                          <div className="mb-3">
                            <label className="form-label">Page Content</label>
                            <RichTextEditor
                              value={values?.content}
                              onChange={(value) =>
                                setFieldValue("content", value)
                              }
                            />
                            {errors.content && touched.content ? (
                              <div className="invalid-feedback d-flex align-items-start">
                                {errors.content}
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
                            onClick={() => navigate("/staticPages")}
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
      </Row>
    </React.Fragment>
  );
};

export default UpdateStaticPages;
