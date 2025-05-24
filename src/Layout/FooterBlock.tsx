/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import mewaLogo from "../assets/images/mewa-logo.png";
import mewaLogoWhite from "../assets/images/mewa-logo-white.png";
import { getAllowedDashboard } from "../helper/auth";

const FooterBlock = () => {
  const selectThemeMode = createSelector(
    (state: any) => state.Theme,
    (theme) => theme.themeMode
  );
  
  const themeMode = useSelector(selectThemeMode);

  return (
    <React.Fragment>
      <div className="auth-sidefooter">
        <img
          src={themeMode === "dark" ? mewaLogoWhite : mewaLogo}
          className="img-brand img-fluid"
          alt="images"
          style={{ width: "70px", height: "35px" }}
        />
        <hr className="mb-3 mt-4" />
        <Row>
          <Col className="my-1">
            <p className="m-0">
              Made with &#9829; by Team
              <Link
                to="https://themeforest.net/user/phoenixcoded"
                target="_blank"
              >
                {" "}
                Phoenixcoded
              </Link>
            </p>
          </Col>
          <div className="col-auto my-1">
            <ul className="list-inline footer-link mb-0">
              <li className="list-inline-item">
                <Link to={`/${getAllowedDashboard()}`}>Home</Link>
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
                <Link to="https://phoenixcoded.support-hub.io/" target="_blank">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default FooterBlock;
