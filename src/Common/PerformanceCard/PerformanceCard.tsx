import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import { postRequest } from "../../service/fetch-services";
import { IPastPer } from "../../pages/Pages/UserDashboard/Helper/interfaces";

const PerformanceCard = () => {
  const [countLoading, SetCountLoading] = useState<boolean>(false);
  const [pastPerformanceCount, SetPastPerformanceCount] =
    useState<IPastPer>(Object);

  const fetchPastPerformanceCount = async () => {
    try {
      SetCountLoading(true);
      const result = await postRequest("past-performance/count");
      SetPastPerformanceCount(result?.data);
      SetCountLoading(false);
    } catch (err) {
      console.log(err);
      SetCountLoading(false);
    }
  };

  useEffect(() => {
    fetchPastPerformanceCount();
  }, []);

  return (
    <React.Fragment>
      {!countLoading ? (
        <Row>
          <Col xs={6} sm={4} md={4} lg={4} xxl={3}>
            <Card className="performancecard">
              <CardBody>
                <div>
                  <i className="fas fa-layer-group f-20 p-2 bg-light rounded "></i>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div>Total Calls</div>
                  <div>
                    <h4 className="font-weight-bold">
                      {pastPerformanceCount?.totalCalls || 0}
                    </h4>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={6} sm={4} md={4} lg={4} xxl={3}>
            <Card className="performancecard">
              <CardBody>
                <div>
                  <i className="fas fa-reply f-20 p-2 bg-light rounded "></i>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div>Exited Calls</div>
                  <div>
                    <h4 className="font-weight-bold">
                      {pastPerformanceCount?.exitedCalls || 0}
                    </h4>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={6} sm={4} md={4} lg={4} xxl={3}>
            <Card className="performancecard">
              <CardBody>
                <div>
                  <i className="fas fa-chart-bar f-20 p-2 bg-light rounded "></i>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div>Success Rate</div>
                  <div>
                    <h4 className="font-weight-bold">
                      {pastPerformanceCount?.successRate || 0}%
                    </h4>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={6} sm={4} md={4} lg={4} xxl={3}>
            <Card className="performancecard">
              <CardBody>
                <div>
                  <i className="fas fa-chart-line f-20 p-2 bg-light rounded "></i>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div>Annual Retunrs</div>
                  <div>
                    <h4 className="font-weight-bold">
                      {pastPerformanceCount?.annualReturns || 0}%
                    </h4>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default PerformanceCard;
