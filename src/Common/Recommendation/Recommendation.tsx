import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import P1 from "../../assets/images/application/img-brand-6.png";
import { IRecommendation } from "../../pages/Pages/UserDashboard/Helper/interfaces";

interface RecommendationProps {
  data: IRecommendation;
}

const Recommendation: React.FC<RecommendationProps> = ({ data }) => {

  return (
    <React.Fragment>
      <Col>
        <Card className="statistics-card-1">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img src={P1} alt="img" className="img-fluid rounded-img" />
                <div className="flex-grow-1 ms-3">
                  <p className="mb-0 text-muted font-bold">Apple Inc.</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <span className="badge bg-light-primary ms-2">
                  {data?.action}
                </span>
                <div className="flex-grow-1 ms-3">
                  <i className="fas fa-exclamation-circle"></i>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-around mt-4">
              <div className="d-flex align-items-center justify-content-between flex-column">
                <div>Target 1</div>
                <div>{data?.target1}</div>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-column">
                <div>Target 2</div>
                <div>{data?.target2}</div>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-column">
                <div>Target 3</div>
                <div>{data?.target2}</div>
              </div>
            </div>

            <div className="border w-100 mt-3"></div>

            <Row className="g-3 mt-2 text-center">
              <div className="col-6">
                <p className="mb-0 text-muted">Date</p>
                <h5 className="mb-0">
                  {" "}
                  {data?.date
                    ? new Date(data.date).toLocaleDateString("en-US")
                    : "No date available"}
                </h5>
              </div>
              <div className="col-6 border-start">
                <p className="mb-0 text-muted">Stop Loss</p>
                <h5 className="mb-0">{data?.stopLoss}</h5>
              </div>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Recommendation;
