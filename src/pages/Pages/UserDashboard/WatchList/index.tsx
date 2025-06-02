/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Card, CardBody, CardHeader } from "react-bootstrap";
// import Loader from "../../../../Common/Loader/Loader";

const WatchList = () => {
  return (
    <React.Fragment>
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">All Watchlists</h5>
            </div>
            <div className="mt-4">
              <Button type="button" variant="outline-primary" className="me-2 active">
                Watchlist 1
              </Button>
              <Button type="button" variant="outline-primary" className="me-2">
                Watchlist 2
              </Button>
              <Button type="button" variant="outline-primary">
                <i className="feather icon-plus"></i>
              </Button>
            </div>
          </CardHeader>

          <React.Fragment>
            <CardBody className="pt-3">
              <div className="table-responsive">
                <table className="table table-hover" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Qty</th>
                      <th>Mkt.Price</th>
                      <th>Invested</th>
                      <th>Current</th>
                      <th>Returns</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Appl</td>
                      <td>10</td>
                      <td>200</td>
                      <td>400</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="ti ti-arrow-up text-success f-18 align-text-bottom" />
                          <span className="text-success">1000</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="ti ti-arrow-down text-danger f-18 align-text-bottom" />
                          <span className="text-danger">1000</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </React.Fragment>
        </Card>
      </div>

      {/* <Loader updateLoading={loading}></Loader> */}
    </React.Fragment>
  );
};

export default WatchList;
