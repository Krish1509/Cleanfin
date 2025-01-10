/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import moment from "moment";

//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination"; // Import Pagination component
import DatePicker from "../../../Common/DatePicker";
import ToggleSwitch from "../../../Common/ToggleSwitch"; // Import the new ToggleSwitch component
import ToastAlert from "../../../helper/toast-alert";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import Loader from "../../../Common/Loader/Loader";

type UserListData = {
  id: string;
  age: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  // otp: string;
  role: string;
  subscription_end: string;
  subscription_start: string;
  isActive: boolean;
};

const User = () => {
  const [userListData, setUserListData] = useState<UserListData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<boolean>();
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

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

  const fetchUserListData = React.useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
      };
      const result = await postRequest("user/list", body, true);
      const { users, totalPages } = result.data;
      setUserListData(users);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [entriesPerPage, currentPage, searchQuery]);

  useEffect(() => {
    fetchUserListData();
  }, [entriesPerPage, currentPage, searchQuery, fetchUserListData]);

  const updateUserDetails = React.useCallback(
    async (id: string, key: string, value: any) => {
      setUpdateLoading(true);
      try {
        const body = {
          userId: id,
          [key]: value,
        };
        const result = await postRequest("user/edit", body, true);
        ToastAlert.success(result.message);
        // Update user in the local state
        setUserListData((prevList) =>
          prevList.map((user) =>
            user.id === id ? { ...user, [key]: value } : user
          )
        );
        setUpdateLoading(false);
        setShowConfirm(false);
        setSelectedId("");
      } catch (err) {
        setLoading(false);
      }
    },
    []
  );

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="User" subTitle="User List" />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">User List</h5>
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
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th>Subscription Start</th>
                        <th>Subscription End</th>
                        <th>Active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userListData.map((item, key) => (
                        <tr key={key}>
                          <td>
                            <div className="d-flex align-items-center">
                              <h6 className="mb-0">
                                {item?.firstName} {item?.lastName}
                              </h6>
                            </div>
                          </td>
                          <td>{item?.mobileNumber}</td>
                          <td>{item?.role}</td>
                          <td>
                            {moment(item?.subscription_start).format(
                              "YYYY-MM-DD"
                            )}
                          </td>
                          <td>
                            <DatePicker
                              minDate={new Date(item?.subscription_start)}
                              value={item?.subscription_end}
                              onChange={(date: any) =>
                                updateUserDetails(
                                  item.id,
                                  "subscription_end",
                                  date
                                )
                              }
                            />
                          </td>
                          <td>
                            <ToggleSwitch
                              checked={item?.isActive}
                              onChange={() =>
                                // updateUserDetails(
                                //   item._id,
                                //   "isActive",
                                //   !item?.isActive
                                // )
                                {
                                  setShowConfirm(!showConfirm);
                                  setSelectedStatus(!item?.isActive);
                                  setSelectedId(item?.id);
                                }
                              }
                            />
                          </td>
                          <td>
                            <a
                              href="#"
                              className="avtar avtar-xs btn btn-primary"
                            >
                              <i className="ti ti-pencil f-20"></i>
                            </a>
                            <a
                              href="#"
                              className="avtar avtar-xs btn btn-danger ms-1"
                            >
                              <i className="ti ti-trash f-20"></i>
                            </a>
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
          {showConfirm ? (
            <ConfirmationModal
              show={showConfirm}
              handleConfirm={() =>
                updateUserDetails(selectedId, "isActive", selectedStatus)
              }
              handleClose={() => setShowConfirm(false)}
              message={`Are you sure you want to ${
                selectedStatus ? "activate" : "deactivate"
              } this record?`}
              loading={updateLoading}
            />
          ) : (
            ""
          )}
        </Card>
      </div>

      <Loader updateLoading={showConfirm}></Loader>
    </React.Fragment>
  );
};

export default User;
