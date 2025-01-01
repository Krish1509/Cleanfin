/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import BcakImg from "../../../assets/images/authentication/img-auth-bg.jpg";

import { Card, CardBody, Col, Row } from "react-bootstrap";
import PhoneStep from "./PhoneStep";
import OTPStep from "./OTPStep";
import AboutStep from "./AboutStep";

const Login = () => {
  const [activeTab, setActiveTab] = useState("phone-tab");
  const [isOtpTabEnabled, setIsOtpTabEnabled] = useState(false);
  const [isAboutTabEnabled, setIsAboutTabEnabled] = useState(false);

  const handleTabSelect = (tab: string) => {
    if (
      (tab === "otp-tab" && !isOtpTabEnabled) ||
      (tab === "about-tab" && !isAboutTabEnabled)
    ) {
      return; // Prevent switching to disabled tabs
    }
    if (tab === "phone-tab") {
      setIsOtpTabEnabled(false);
      setIsAboutTabEnabled(false);
    }
    if (tab === "about-tab") {
      setIsOtpTabEnabled(false);
    }
    setActiveTab(tab);
  };

  const enableOtpTab = () => {
    setIsOtpTabEnabled(true);
    setActiveTab("otp-tab");
  };

  const enableAboutTab = () => {
    setIsAboutTabEnabled(true);
    setIsOtpTabEnabled(false);
    setActiveTab("about-tab");
  };

  return (
    <React.Fragment>
      <div
        className="auth-main v2"
        style={{ backgroundImage: `url(${BcakImg})` }}
      >
        <div className="bg-overlay bg-dark-custom"></div>

        <div className="auth-wrapper">
          <div className="auth-form">
            <Card className="my-5 mx-3">
              <CardBody className="d-flex justify-content-between">
                <div className="py-4 mb-3">
                  <Row className="nav-pills justify-content-between">
                    <Col className="nav-item auth-step">
                      <div
                        className={`nav-link ${
                          activeTab === "phone-tab" ? "active-auth" : ""
                        }`}
                        onClick={() => handleTabSelect("phone-tab")}
                      >
                        <span className="avtar rounded-circle auth-avatar">
                          <i className="ph-duotone ph-phone"></i>
                        </span>
                        <span className="d-none d-sm-inline">
                          Mobile Number
                        </span>
                      </div>
                    </Col>

                    <Col className="nav-item auth-step">
                      <div
                        className={`nav-link ${
                          activeTab === "otp-tab" ? "active-auth" : ""
                        }`}
                        onClick={() => handleTabSelect("otp-tab")}
                      >
                        <span className="avtar rounded-circle auth-avatar">
                          <i className="ph-duotone ph-lock-key"></i>
                        </span>
                        <span className="d-none d-sm-inline">
                          OTP Verification
                        </span>
                      </div>
                    </Col>

                    <Col className="nav-item auth-step">
                      <div
                        className={`nav-link ${
                          activeTab === "about-tab" ? "active-auth" : ""
                        }`}
                        onClick={() => handleTabSelect("about-tab")}
                      >
                        <span className="avtar rounded-circle auth-avatar">
                          <i className="ph-duotone ph-user"></i>
                        </span>
                        <span className="d-none d-sm-inline">About You</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                {activeTab === "phone-tab" ? (
                  <PhoneStep setActiveTab={enableOtpTab} />
                ) : activeTab === "otp-tab" ? (
                  <OTPStep setActiveTab={enableAboutTab} />
                ) : activeTab === "about-tab" ? (
                  <AboutStep />
                ) : (
                  ""
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
