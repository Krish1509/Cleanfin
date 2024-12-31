import React, { useEffect, useState } from "react";

//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination"; // Import Pagination component

type RecommendationListData = {
  _id: string;
  date: string;
  time: string;
  action: string;
  priceCondition: string;
  target1: number;
  target1Achieved: boolean;
  target2: number;
  target2Achieved: boolean;
  target3: number;
  target3Achieved: boolean;
  stopLoss: number;
  stopLossAchieved: boolean;
  recommendation: string;
  isActive: boolean;
};

const Recommendation = () => {
  const [recommendationListData, setRecommendationListData] = useState<RecommendationListData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset page to 1 when search query changes
  };

  const handleEntriesPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset page to 1 when entries per page changes
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchRecommendationListData = React.useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
      };
      const result = await postRequest("recommendation/list", body, true);
      console.log(result.data, result.totalPages);
      const { totalPages } = result.data;
      setRecommendationListData(result.data);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [entriesPerPage, currentPage, searchQuery]);

  useEffect(() => {
    fetchRecommendationListData();
  }, [entriesPerPage, currentPage, searchQuery, fetchRecommendationListData]);

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Recommendation" subTitle="Recommendation List" />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">Recommendation List</h5>
            </div>
          </CardHeader>
          <div className="d-sm-flex align-items-center mt-4">
            <ul className="list-inline ms-auto my-1 me-4">
              <li className="list-inline-item">
                <form className="form-search">
                  <Form.Control
                    type="search"
                    placeholder="Search...."
                    className="ps-2 pe-3 pt-2"
                    onChange={handleSearchChange}
                  />
                </form>
              </li>
            </ul>
          </div>
          {loading ? (
            <center className="m-4">Loading...</center>
          ) : (
            <React.Fragment>
              <CardBody className="pt-3">
                <div className="table-responsive">
                  <table className="table table-hover" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>Target 1</th>
                        <th>Target 2</th>
                        <th>Recommendation</th>
                        <th>isActive</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recommendationListData.map((item, key) => (
                        <tr key={key}>
                          <td>
                            {item?.priceCondition}
                          </td>
                          <td>{item?.recommendation}</td>
                          <td>
                            <div className="form-check form-switch mb-2 d-flex justify-content-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="notify1"
                                checked={item?.isActive}
                                // onChange={() =>
                                //   updateUserDetails(
                                //     item._id,
                                //     "isActive",
                                //     !item?.isActive
                                //   )
                                // }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </React.Fragment>
          )}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            entriesPerPage={entriesPerPage}
            onEntriesPerPageChange={handleEntriesPerPageChange}
          />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Recommendation;
