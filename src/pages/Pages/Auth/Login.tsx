/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import BcakImg from "../../../assets/images/authentication/img-auth-bg.jpg";

// img
import logolight from "../../../assets/images/logo-white.svg";

import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import PhoneStep from "./PhoneStep";
import OTPStep from "./OTPStep";
import AboutStep from "./AboutStep";

const Login = () => {
  const [activeTab, setActiveTab] = useState("phone-tab");

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <div
        className="auth-main v2"
        style={{ backgroundImage: `url(${BcakImg})` }}
      >
        <div className="bg-overlay bg-dark-custom"></div>

        <div className="auth-wrapper">
          <div className="auth-sidecontent">
            <div className="auth-sidefooter">
              <img
                src={logolight}
                className="img-brand img-fluid"
                alt="images"
              />
              <hr className="mb-3 mt-4" />
              <Row>
                <Col className="my-1">
                  <p className="m-0">
                    Light Able ♥ crafted by Team{" "}
                    <a
                      href="https://themeforest.net/user/phoenixcoded"
                      target="_blank"
                    >
                      Phoenixcoded
                    </a>
                  </p>
                </Col>
                <div className="col-auto my-1">
                  <ul className="list-inline footer-link mb-0">
                    <li className="list-inline-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        to="https://pcoded.gitbook.io/light-able/"
                        target="_blank"
                      >
                        Documentation
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        to="https://phoenixcoded.support-hub.io/"
                        target="_blank"
                      >
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </Row>
            </div>
          </div>
          <div className="auth-form">
            <Card className="my-5 mx-3">
              <CardBody className="d-block">
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
                  <PhoneStep setActiveTab={setActiveTab} />
                ) : activeTab === "otp-tab" ? (
                  <OTPStep setActiveTab={setActiveTab} />
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
