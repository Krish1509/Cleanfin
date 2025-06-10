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
          <Col xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className="performancecard mb-3">
              <CardBody>
                <div>
                  <i className="fas fa-layer-group f-20 p-2 bg-light rounded "></i>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div style={{ fontSize: '1.1rem' }} className="text-dark">Total Calls</div>
                  <div>
                    <h3 className="font-weight-bold mb-0 text-dark">
                      {pastPerformanceCount?.totalCalls || 0}
                    </h3>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className="performancecard mb-3">
              <CardBody>
                <div>
                  <i className="fas fa-reply f-20 p-2 bg-light rounded "></i>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div style={{ fontSize: '1.1rem' }} className="text-dark">Exited Calls</div>
                  <div>
                    <h3 className="font-weight-bold mb-0 text-dark">
                      {pastPerformanceCount?.exitedCalls || 0}
                    </h3>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card className="performancecard mb-3">
              <CardBody>
                <div>
                  <i className="fas fa-chart-bar f-20 p-2 bg-light rounded "></i>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div style={{ fontSize: '1.1rem' }} className="text-dark">Success Rate</div>
                  <div>
                    <h3 className="font-weight-bold mb-0 text-dark">
                      {pastPerformanceCount?.successRate || 0}%
                    </h3>
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
