/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleFormData } from "../../../service/fetch-services";
import { setUserDetails } from "../../../toolkit/Auth/reducer";
import ToastAlert from "../../../helper/toast-alert";

const AboutSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  age: Yup.number().required("Age is required").min(1, "Invalid age"),
});

const AboutStep: React.FC = () => {
  const userDetails = useSelector((state: any) => state?.Auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      // Submit user details to the backend
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("userId", userDetails?._id);
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("age", values.age);

        const result = await handleFormData("user/edit", formData);

        if (result) {
          dispatch(setUserDetails(result?.data?.user));
          localStorage.setItem("user", JSON.stringify(result?.data?.user));
          ToastAlert.success("User registered successfully");
          if (result?.data?.user?.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/dashboard/user");
          }
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  return (
    <div className="text-center mb-4">
      <h4 className="f-w-500 mb-4">About You</h4>
      <div className="auth-inputs">
        <Formik initialValues={{ firstName: "", lastName: "", age: "" }} validationSchema={AboutSchema} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <InputGroup className="mb-2">
                <Field type="text" className="form-control" id="floatingInput" placeholder="First name" name="firstName" />
                {errors.firstName && touched.firstName ? <div className="invalid-feedback d-flex align-items-start">{errors.firstName}</div> : null}
              </InputGroup>
              <InputGroup className="mb-2">
                <Field type="text" className="form-control" id="floatingInput" placeholder="Last name" name="lastName" />
                {errors.lastName && touched.lastName ? <div className="invalid-feedback d-flex align-items-start">{errors.lastName}</div> : null}
              </InputGroup>
              <InputGroup>
                <Field type="number" className="form-control" id="floatingInput" placeholder="Age" name="age" />
                {errors.age && touched.age ? <div className="invalid-feedback d-flex align-items-start">{errors.age}</div> : null}
              </InputGroup>
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  Submit {loading ? <Spinner className="ml-2" size="sm" /> : ""}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AboutStep;
