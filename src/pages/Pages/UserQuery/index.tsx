/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Button, Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination"; // Import Pagination component
import Loader from "../../../Common/Loader/Loader";
import Reply from "./Reply";
import ToastAlert from "../../../helper/toast-alert";
import moment from "moment";

type UserQueryListData = {
  email: string;
  phone: string;
  query: string;
  _id: string;
  userId: any;
  createdAt: string;
};

const UserQuery = () => {
  const [userQueryListData, setUserQueryListData] = useState<UserQueryListData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [showReminder, setShowReminder] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any>("");

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

  const fetchUserQueryListData = React.useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
      };
      const result = await postRequest("userQuery/list", body, true);
      const { userQueries, pages } = result.data;
      setUserQueryListData(userQueries);
      setTotalPages(pages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [entriesPerPage, currentPage, searchQuery]);

  useEffect(() => {
    fetchUserQueryListData();
  }, [entriesPerPage, currentPage, searchQuery, fetchUserQueryListData]);

  const handleUpdateReminder = async (data: any) => {
    try {
      setUpdateLoading(true);
      const body = { id: selectedId?._id, reply: data?.reply };
      const result = await postRequest("userQuery/update", body);
      ToastAlert.success(result.message);
      setUserQueryListData((prevList) => prevList.map((data) => (data._id === selectedId?._id ? { ...data, ...result?.data } : data)));
      setShowReminder(false);
      setSelectedId("");
      setUpdateLoading(false);
    } catch (err) {
      console.log(err);
      setUpdateLoading(false);
    }
  };

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="User Query" subTitle="User Query List" />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">User Query List</h5>
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
                        <th style={{ width: "15%" }}>Date</th>
                        <th style={{ width: "15%" }}>Name</th>
                        <th style={{ width: "15%" }}>Email</th>
                        <th style={{ width: "10%" }}>Phone</th>
                        <th style={{ width: "45%" }}>Query</th>
                        <th style={{ width: "10%" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userQueryListData.map((item, key) => (
                        <tr key={key}>
                          <td style={{ width: "15%" }}>{item?.createdAt ? moment(item?.createdAt).format("DD/MM/YYYY HH:mm") : ""}</td>
                          <td style={{ width: "15%" }}>
                            {item?.userId?.firstName} {item?.userId?.lastName || ""}
                          </td>
                          <td style={{ width: "15%" }}>{item?.email}</td>
                          <td style={{ width: "10%" }}>{item?.phone}</td>
                          <td
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 4,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxHeight: "510px",
                              whiteSpace: "normal",
                            }}
                          >
                            {item?.query}
                          </td>
                          <td style={{ width: "10%" }}>
                            <Button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                                setShowReminder(true);
                                setSelectedId(item);
                              }}
                            >
                              Reply
                            </Button>
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
          {showReminder ? (
            <Reply
              show={showReminder}
              handleClose={() => setShowReminder(false)}
              handleConfirm={(data: any) => {
                handleUpdateReminder(data);
              }}
              loading={updateLoading}
              selectedData={selectedId}
            />
          ) : (
            ""
          )}
        </Card>
      </div>

      <Loader updateLoading={loading}></Loader>
    </React.Fragment>
  );
};

export default UserQuery;
