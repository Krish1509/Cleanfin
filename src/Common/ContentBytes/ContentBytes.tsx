import React from "react";
// import { Card, CardBody, Col, Row } from "react-bootstrap";
import cardImage from "../../assets/images/application/img-post-3.jpg";

//import Components

const ContentBytes = () => {
  return (
    <React.Fragment>
      {/* <BreadcrumbItem mainTitle="Dashboard" subTitle="Home" /> */}
      <div className="mb-3">
        <div className="card overflow-hidden">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={cardImage}
                className="img-fluid rounded-md-start"
                alt="card-image"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body d-flex flex-column justify-content-between h-100">
                <h5 className="card-title">Monthly Sectoral Update Jan 2025</h5>

                <div className="card-text d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </div>
                  <span className="badge bg-light-primary ms-2">VIDEO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContentBytes;
