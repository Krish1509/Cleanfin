/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { postRequest } from "../../../../service/fetch-services";
import Loader from "../../../../Common/Loader/Loader";
// import moment from "moment";
import { IRecommendation } from "../Helper/interfaces";
import Pagination from "../../../../Common/Pagination";
import moment from "moment";
import PerformanceCard from "../../../../Common/PerformanceCard/PerformanceCard";

const PastPerformance = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [exitedCalls, setExitedCalls] = useState<IRecommendation[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleEntriesPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset page to 1 when entries per page changes
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchExitedCalls = async () => {
    try {
      setLoading(true);
      const result = await postRequest("past-performance/exit-calls", {
        limit: entriesPerPage,
        page: currentPage,
      });
      const { recommendations, totalPages } = result.data;
      setExitedCalls(recommendations);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExitedCalls();
  }, []);

  return (
    <React.Fragment>
      <div className="col-12 mt-4 pb-4">
        <PerformanceCard />
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">Exited Calls</h5>
            </div>
          </CardHeader>
          {!loading && (
            <React.Fragment>
              <CardBody className="pt-3">
                {/* <Row className="g-3 mb-3">
                  {exitedCalls?.map((data, index) => (
                    <Col md={6} xxl={3} key={index}>
                      <Card className="border mb-0">
                        <CardBody className="p-3">
                          <div className="d-flex align-items-center justify-content-between gap-1">
                            <h6 className="mb-0">
                              {data?.scriptData?.[0]?.name}
                            </h6>
                            <p className="mb-0 text-muted d-flex align-items-center gap-1">
                              <span
                                className={`badge ms-2 ${
                                  data.action === "buy"
                                    ? "bg-light-success"
                                    : "bg-light-danger"
                                }`}
                              >
                                {data?.action.toUpperCase()}
                              </span>
                            </p>
                          </div>
                          <h5 className="mb-2 mt-3">
                            <i className="fas fa-rupee-sign" />
                            {data?.price}
                          </h5>
                          <p className="mb-0 text-muted d-flex align-items-center gap-2">
                            Recommended Price
                          </p>
                          <div className="d-flex align-items-center gap-1">
                            <p className="mb-0 text-muted d-flex align-items-center gap-2 mt-2">
                              <span>
                                {moment(data?.date).format("YYYY-MM-DD")}
                              </span>
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                   ))}
                 </Row> */}
                <table className="table table-hover" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Script Name</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Return</th>
                      <th>Sell Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exitedCalls.map((item, key) => (
                      <tr key={key}>
                        <td>{item?.scriptData[0].name}</td>
                        <td>
                          {moment(item?.date).format("YYYY-MM-DD")} {item?.time}
                        </td>
                        <td>
                          {item?.price}{" "}
                          <span
                            className={`badge ms-2 ${
                              item.action === "buy"
                                ? "bg-light-success"
                                : "bg-light-danger"
                            }`}
                          >
                            {item?.action.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <>
                              {item?.profitLoss > 0 ? (
                                <i className="material-icons-two-tone text-success me-1">
                                  arrow_circle_up
                                </i>
                              ) : (
                                <i className="material-icons-two-tone text-danger me-1">
                                  arrow_circle_down
                                </i>
                              )}
                              {item?.profitLoss?.toFixed(2)}%
                            </>
                          </div>
                        </td>
                        <td>
                          {item?.target1Achieved
                            ? item?.target1
                            : item?.stopLossAchieved
                            ? item?.stopLoss
                            : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                entriesPerPage={entriesPerPage}
                onEntriesPerPageChange={handleEntriesPerPageChange}
              />
            </React.Fragment>
          )}
        </Card>
      </div>

      <Loader updateLoading={loading}></Loader>
    </React.Fragment>
  );
};

export default PastPerformance;
