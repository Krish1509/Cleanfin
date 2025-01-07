import React from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";
// import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import ScrollSpy from "react-ui-scrollspy";
import Navigation from "./Components/Navigation";
import ContentBytes from "../../../Common/ContentBytes/ContentBytes";

//import Components

const UserDashboard = () => {
  return (
    <React.Fragment>
      {/* <BreadcrumbItem mainTitle="Dashboard" subTitle="Home" /> */}
      <div className="mb-3">
        <Card>
          <CardBody className="pt-0">
            <Navigation />
            <ScrollSpy scrollThrottle={100} useBoxMethod={false}>
              <div
                className="user-dashboard-container dashboard-recommendation"
                id="recommendation"
              >
                <h1>Recommendation</h1>
              </div>
              <div className="user-dashboard-container" id="content-bytes">
                <Row>
                  <Col lg={12}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="mb-0">Content Bytes</h5>
                      <button
                        type="button"
                        className="btn btn-sm my-2 me-1 btn-light-success"
                      >
                        View All
                        <i className="ms-2 fas fa-arrow-circle-right"></i>
                      </button>
                    </div>
                  </Col>
                  {[1, 2, 3]?.map((i) => {
                    return (
                      <Col xs={6} key={i}>
                        <ContentBytes />
                      </Col>
                    );
                  })}
                </Row>
              </div>
              <div className="user-dashboard-container" id="past-performance">
                <h1>Past Performance</h1>
              </div>
            </ScrollSpy>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;
