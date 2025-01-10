/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Col, Row, Spinner } from "react-bootstrap";
import codeVerify from "../../../assets/images/authentication/img-auth-code-varify.png";
import { postRequest } from "../../../service/fetch-services";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../toolkit/Auth/reducer";
import { useNavigate } from "react-router-dom";
import { requestFCMToken } from "../../../helper/firebase-config";

const OTPSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .length(4, "OTP must be 4 digits"),
});

interface Props {
  setActiveTab: (tab: string) => void;
}

const OTPStep: React.FC<Props> = ({ setActiveTab }) => {
  const userDetails = useSelector((state: any) => state?.Auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: any) => void,
    values: any
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      // Only allow a single digit
      const otp = values.otp.split("");
      otp[index] = value;
      setFieldValue("otp", otp.join(""));

      // Move to the next input if available
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // Allow backspace
      const otp = values.otp.split("");
      otp[index] = "";
      setFieldValue("otp", otp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && e.currentTarget.value === "") {
      // Move to the previous input on backspace if the current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const generateToken = async () => {
    const token = await requestFCMToken();
    return token || "";
  };

  const handleSubmit = async (values: { otp: string }) => {
    try {
      setLoading(true);
      const token = await generateToken();
      const body = {
        otp: values?.otp,
        userId: userDetails?._id,
        fcmToken: token || "",
      };
      const result = await postRequest("auth/verifyOtp", body, false);
      if (result) {
        dispatch(setUserDetails(result?.data?.user));
        localStorage.setItem("userToken", result?.data?.token);
        localStorage.setItem("user", JSON.stringify(result?.data?.user));
        if (userDetails?.firstName && userDetails?.lastName) {
          if (result?.data?.user?.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/dashboard/user");
          }
        } else {
          setActiveTab("about-tab");
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="text-center mb-4">
      <img
        src={codeVerify}
        alt="images"
        className="img-fluid mb-3 auth-image"
      />
      <h4 className="f-w-500 mb-3">Please confirm with OTP</h4>
      <div className="auth-inputs">
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={OTPSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <Row className="g-3 text-center">
                {[0, 1, 2, 3].map((index) => (
                  <Col key={index}>
                    <Field
                      name={`otp[${index}]`}
                      render={({ field }: any) => (
                        <input
                          {...field}
                          type="text"
                          className="text-center form-control"
                          placeholder="0"
                          maxLength={1}
                          ref={(el) => (inputRefs.current[index] = el!)}
                          onChange={(e) =>
                            handleInputChange(e, index, setFieldValue, values)
                          }
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          value={values.otp[index] || ""}
                        />
                      )}
                    />
                  </Col>
                ))}
                {errors.otp && touched.otp ? (
                  <div className="invalid-feedback d-flex align-items-start">
                    {errors.otp}
                  </div>
                ) : null}
              </Row>
              <div className="d-grid mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={values.otp.length < 4 || loading}
                >
                  Verify OTP{" "}
                  {loading ? <Spinner className="ml-2" size="sm" /> : ""}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OTPStep;
