import React from "react";
import { Card, CardBody } from "react-bootstrap";

const PerformanceCard = () => {
  return (
    <React.Fragment>
      <Card className="performancecard">
        <CardBody>
          <div>
         <i className="fas fa-chart-bar f-20 p-2 bg-light rounded "></i>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div >Total Calls</div>
           <div>
           <h4 className="font-weight-bold">309</h4>
           </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default PerformanceCard;
