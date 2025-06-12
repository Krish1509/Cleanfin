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

  const handleEntriesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, entriesPerPage]);

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
                <div className="table-responsive">
                  <table className="table table-hover" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>SCRIPT NAME</th>
                        <th>ENTRY DATE</th>
                        <th>RECOMMENDED PRICE</th>
                        <th>RETURNS</th>
                        <th>EXIT PRICE</th>
                        <th>EXIT DATE</th>
                        <th>DURATION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exitedCalls.map((item, key) => (
                        <tr key={key}>
                          <td>{item?.scriptData[0].name}</td>
                          <td>
                            {moment(item?.createdAt).format("YYYY-MM-DD")} {item?.time}
                          </td>
                          <td>
                            <span className={`badge me-2 ${item.action === "buy" ? "bg-light-success" : "bg-light-danger"}`}>{item?.action.toUpperCase()}</span>
                            {item?.price}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <>
                                {item?.profitLoss > 0 ? (
                                  <i className="material-icons-two-tone text-success me-1">arrow_circle_up</i>
                                ) : (
                                  <i className="material-icons-two-tone text-danger me-1">arrow_circle_down</i>
                                )}
                                {item?.profitLoss?.toFixed(2)}%
                              </>
                            </div>
                          </td>
                          <td>{item?.sellPrice}</td>
                          <td>{moment(item?.closeDate).format("YYYY-MM-DD HH:mm")}</td>
                          <td>{moment(item?.closeDate).diff(moment(item?.createdAt), "days")} days</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
