import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import mewaLogo from "../assets/images/mewa-logo.png";
import { Link } from "react-router-dom";

// css
import "../assets/scss/landing.scss";

const Footerpage = () => {
  return (
    <React.Fragment>
      <footer className="pc-footer footer border-top ">
        <div className="footer-top">
          <Container>
            <Row className="gy-4">
              <div
                className="col-md-2 wow animate__fadeInUp"
                data-wow-delay="0.2s"
              >
                <img
                  src={mewaLogo}
                  alt="image"
                  className="img-fluid mb-3"
                  style={{ width: "100px" }}
                />
              </div>
              <Col md={8}>
                <Row className="gy-4">
                  <Col
                    sm={4}
                    className="wow animate__fadeInUp"
                    data-wow-delay="0.8s"
                  >
                    <h5 className="mb-sm-4 mb-2">Help & Support</h5>
                    <ul className="list-unstyled footer-link mb-0">
                      <li>
                        <Link
                          to="https://pcoded.gitbook.io/light-able"
                          target="_blank"
                        >
                          Documentation
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://phoenixcoded.authordesk.app/"
                          target="_blank"
                        >
                          Support
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://themeforest.net/user/phoenixcoded#contact"
                          target="_blank"
                        >
                          Reach Us
                        </Link>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footerpage;
