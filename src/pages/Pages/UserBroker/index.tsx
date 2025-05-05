/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import moment from "moment";

//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Button, Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination"; // Import Pagination component
import Loader from "../../../Common/Loader/Loader";
import Reminder from "./Reminder";
import ToastAlert from "../../../helper/toast-alert";

type UserBrokerListData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  broker_id: string;
  createdAt: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  _id: string;
};

const UserBroker = () => {
  const [userListData, setUserBrokerListData] = useState<UserBrokerListData[]>([]);
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

  const fetchUserBrokerListData = React.useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
      };
      const result = await postRequest("userBrokerRegistration/list", body, true);
      const { userBrokerRegistration, pages } = result.data;
      setUserBrokerListData(userBrokerRegistration);
      setTotalPages(pages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [entriesPerPage, currentPage, searchQuery]);

  useEffect(() => {
    fetchUserBrokerListData();
  }, [entriesPerPage, currentPage, searchQuery, fetchUserBrokerListData]);

  const handleUpdateReminder = async (data: any) => {
    try {
      setUpdateLoading(true);
      const body = { id: selectedId?._id, reminderDate: data?.date ? moment(data?.date) : "", remark: data?.remark };
      const result = await postRequest("userBrokerRegistration/update", body);
      ToastAlert.success(result.message);
      setUserBrokerListData((prevList) => prevList.map((data) => (data._id === selectedId?._id ? { ...data, ...result?.data } : data)));
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
      <BreadcrumbItem mainTitle="User Broker" subTitle="User Broker List" />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">User Broker List</h5>
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pincode</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userListData.map((item, key) => (
                        <tr key={key}>
                          <td>
                            <div className="d-flex align-items-center">
                              <h6 className="mb-0">
                                {item?.first_name} {item?.last_name}
                              </h6>
                            </div>
                          </td>
                          <td>{item?.email}</td>
                          <td>{item?.phone}</td>
                          <td>{item?.address}</td>
                          <td>{item?.city}</td>
                          <td>{item?.state}</td>
                          <td>{item?.pincode}</td>
                          <td>{moment(item?.createdAt).format("YYYY-MM-DD HH:mm A")}</td>
                          <td>
                            <Button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                                setShowReminder(true);
                                setSelectedId(item);
                              }}
                            >
                              Reminder
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
            <Reminder
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

export default UserBroker;
