import React, { useEffect, useState } from "react";

//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination"; // Import Pagination component
import Loader from "../../../Common/Loader/Loader";
import moment from "moment";

type FeedbackListData = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  description: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
};

const Feedback = () => {
  const [feedbackListData, setFeedbackListData] = useState<FeedbackListData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset page to 1 when search query changes
  };

  const handleEntriesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset page to 1 when entries per page changes
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchFeedbackListData = React.useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
      };
      const result = await postRequest("feedback/list", body, true);
      const { feedbacks, totalPages } = result.data;
      setFeedbackListData(feedbacks);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [entriesPerPage, currentPage, searchQuery]);

  useEffect(() => {
    fetchFeedbackListData();
  }, [entriesPerPage, currentPage, searchQuery, fetchFeedbackListData]);

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Feedback" subTitle="Feedback List" />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">Feedback List</h5>
            </div>
          </CardHeader>
          <div className="d-sm-flex align-items-center mt-4">
            <ul className="list-inline ms-auto my-1 me-4">
              <li className="list-inline-item">
                <form className="form-search">
                  <Form.Control type="search" placeholder="Search...." className="ps-2 pe-3 pt-2" onChange={handleSearchChange} />
                </form>
              </li>
            </ul>
          </div>
          {!loading && (
            <React.Fragment>
              <CardBody className="pt-3">
                <div className="table-responsive">
                  <table className="table table-hover" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Description</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbackListData.map((item, key) => (
                        <tr key={key}>
                          <td>
                            {item?.firstName} {item?.lastName}
                          </td>
                          <td>{item?.email || ""}</td>
                          <td>{item?.mobileNumber ? item?.mobileNumber : "-"}</td>
                          <td className="html-content">
                            <span
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxHeight: "300px",
                                whiteSpace: "normal",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                          </td>
                          <td>{moment(item?.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
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

      <Loader updateLoading={loading}></Loader>
    </React.Fragment>
  );
};

export default Feedback;
