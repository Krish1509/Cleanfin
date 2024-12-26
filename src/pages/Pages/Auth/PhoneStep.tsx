/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { InputGroup } from "react-bootstrap";
import authlogin from "../../../assets/images/authentication/img-auth-login.png";
import { postRequest } from "../../../service/fetch-services";
import { setUserDetails } from "../../../toolkit/Auth/reducer";
import { useDispatch } from "react-redux";

const PhoneStepSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Must be a valid 10-digit phone number"),
});

interface Props {
  setActiveTab: (tab: string) => void;
}

const PhoneStep: React.FC<Props> = ({ setActiveTab }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { phoneNumber: string }) => {
    try {
      setLoading(true);
      const body = {
        mobile: values?.phoneNumber,
      };
      const result = await postRequest("auth/login", body, false);
      console.log(result);
      if (result) {
        dispatch(setUserDetails(result?.data));
        setActiveTab("otp-tab");
      } else {
        setLoading(false);
        // setError(result?.message || "");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="text-center mb-4">
      <img src={authlogin} alt="images" className="img-fluid mb-3 auth-image" />
      <h4 className="f-w-500 mb-4">Login with your mobile number</h4>
      <div className="auth-inputs">
        <Formik
          initialValues={{ phoneNumber: "" }}
          validationSchema={PhoneStepSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <InputGroup>
                <InputGroup.Text>
                  <i className="ph-duotone ph-phone"></i>
                </InputGroup.Text>
                <Field
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Mobile Number"
                  name="phoneNumber"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="invalid-feedback d-flex align-items-start">
                    {errors.phoneNumber}
                  </div>
                ) : null}
              </InputGroup>
              <div className="d-grid mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  Login/Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PhoneStep;
