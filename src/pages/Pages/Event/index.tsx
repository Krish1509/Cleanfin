import React, { useState, useEffect } from "react";
//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
// import ToastAlert from "../../../helper/toast-alert";
import Pagination from "../../../Common/Pagination";
import moment from "moment";
import Loader from "../../../Common/Loader/Loader";

type EventListData = {
  _id: string;
  title: string;
  country: string;
  date: string;
  impact: string;
  forecast: string;
  previous: string;
};

const Event = () => {
  const [eventListData, setEventListData] = useState<EventListData[]>([]);
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

  const fetchEventListData = React.useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
      };
      const result = await postRequest("event/list", body, true);
      const { events, totalPages } = result.data;
      setEventListData(events);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [entriesPerPage, currentPage, searchQuery]);

  useEffect(() => {
    fetchEventListData();
  }, [entriesPerPage, currentPage, searchQuery, fetchEventListData]);

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Event" subTitle="Event List" />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">Event List</h5>
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
          {!loading && (
            <React.Fragment>
              <CardBody className="pt-3">
                <div className="table-responsive">
                  <table className="table table-hover" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Country</th>
                        <th>Date</th>
                        <th>Impact</th>
                        <th>Forecast</th>
                        <th>Previous</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventListData?.map((item, key) => (
                        <tr key={key}>
                          <td>{item?.title}</td>
                          <td>{item?.country}</td>
                          <td>{moment(item?.date).format("YYYY-MM-DD hh:mm A")}</td>
                          <td>{item?.impact}</td>
                          <td>{item?.forecast}</td>
                          <td>{item?.previous}</td>
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

export default Event;
