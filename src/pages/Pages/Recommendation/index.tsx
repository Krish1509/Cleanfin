/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Button, Card, CardBody, CardHeader, Form } from "react-bootstrap";
import moment from "moment";
import ToggleSwitch from "../../../Common/ToggleSwitch";
import { postRequest } from "../../../service/fetch-services";
import ToastAlert from "../../../helper/toast-alert";
import Pagination from "../../../Common/Pagination";
import EditableNumberInput from "../../../Common/EditableNumberInput";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import ReasonModal from "../../../Common/ReasonModal";
import fireStoreLogo from "../../../assets/images/firestore.png";
import Loader from "../../../Common/Loader/Loader";
import { IOptionScriptsList } from "../UserDashboard/Helper/interfaces";

type RecommendationListData = {
  _id: string;
  scriptId: string;
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
  firestore?: boolean;
  scriptData: IOptionScriptsList[];
};

const Recommendation = () => {
  const navigate = useNavigate();

  const [recommendationListData, setRecommendationListData] = useState<
    RecommendationListData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showReason, setShowReason] = useState<boolean>(false);
  const [showDeletion, setShowDeletion] = useState<boolean>(false);
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

  const fetchRecommendationListData = React.useCallback(async () => {
    try {
      setUpdateLoading(true);
      setLoading(true);
      const body = {
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
      };
      const result = await postRequest("recommendation/list", body, true);
      const { recommendations, totalPages } = result.data;
      setRecommendationListData(recommendations);
      setTotalPages(totalPages);
      setLoading(false);
      setUpdateLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setUpdateLoading(false);
    }
  }, [entriesPerPage, currentPage, searchQuery]);

  useEffect(() => {
    fetchRecommendationListData();
  }, [entriesPerPage, currentPage, searchQuery, fetchRecommendationListData]);

  const updateRecommendationDetails = React.useCallback(
    async (id: string, updates: { [key: string]: unknown }) => {
      try {
        setUpdateLoading(true);
        const body = { id, ...updates };
        const result = await postRequest("recommendation/edit", body, true);
        ToastAlert.success(result.message);
        // Update user in the local state
        setRecommendationListData((prevList) =>
          prevList.map((data) =>
            data._id === id ? { ...data, ...updates } : data
          )
        );
        setShowConfirm(false);
        setSelectedId("");
        setUpdateLoading(false);
      } catch (err) {
        console.log(err);
        setUpdateLoading(false);
      }
    },
    []
  );

  // Update recommendation details when a value is changed
  const handleValueUpdate = (id: string, key: string, value: unknown) => {
    updateRecommendationDetails(id, { [key]: value });
  };

  const handleEditDate = (item: any) => {
    navigate("/recommendation/edit", {
      state: { id: item?._id, segmentID: item?.scriptData[0]?.segmentID },
    });
  };

  const handleDelete = React.useCallback(async () => {
    try {
      setUpdateLoading(true);
      const result = await postRequest("recommendation/delete", { id: selectedId }, true);

      if (result) {
        ToastAlert.success(result.message);

        setRecommendationListData((prevList) =>
          prevList.filter((item) => item._id !== selectedId)
        );
      }

      setShowDeletion(false);
      setUpdateLoading(false);
    } catch (err) {
      console.log(err);
      setUpdateLoading(false);
      setShowDeletion(false);
      ToastAlert.error("Failed to delete the recommendation.");
    }
  }, [selectedId]);

  return (
    <React.Fragment>
      <BreadcrumbItem
        mainTitle="Recommendation"
        subTitle="Recommendation List"
      />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">Recommendation List</h5>
              <Button
                onClick={() => navigate("/recommendation/add")}
                className="btn btn-primary"
              >
                Add
              </Button>
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
                        <th>Script Name</th>
                        <th>Date</th>
                        <th>Target 1</th>
                        <th>Target 2</th>
                        <th>Target 3</th>
                        <th>Stop Loss</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recommendationListData.map((item, key) => (
                        <tr key={key}>
                          <td>
                            {item?.firestore ? (
                              <img
                                src={fireStoreLogo}
                                style={{
                                  marginRight: "5px",
                                  height: "20px",
                                  width: "20px",
                                }}
                              />
                            ) : (
                              ""
                            )}
                            {item?.scriptData[0].name}
                          </td>
                          <td>
                            {moment(item?.date).format("YYYY-MM-DD")}{" "}
                            {item?.time}
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-between">
                              <EditableNumberInput
                                id={item._id}
                                value={item.target1}
                                placeholder="target1"
                                keyName="target1"
                                onUpdate={handleValueUpdate}
                              />
                              <ToggleSwitch
                                checked={item?.target1Achieved}
                                onChange={() =>
                                  updateRecommendationDetails(item?._id, { target1Achieved: !item?.target1Achieved })
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-between">
                              <EditableNumberInput
                                id={item._id}
                                value={item.target2}
                                placeholder="target2"
                                keyName="target2"
                                onUpdate={handleValueUpdate}
                              />
                              <ToggleSwitch
                                checked={item?.target2Achieved}
                                onChange={() =>
                                  updateRecommendationDetails(item?._id, { target2Achieved: !item?.target2Achieved })
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-between">
                              <EditableNumberInput
                                id={item._id}
                                value={item.target3}
                                placeholder="target3"
                                keyName="target3"
                                onUpdate={handleValueUpdate}
                              />
                              <ToggleSwitch
                                disabled={updateLoading}
                                checked={item?.target3Achieved}
                                onChange={() =>
                                  updateRecommendationDetails(item?._id, { target3Achieved: !item?.target3Achieved })
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-between">
                              <EditableNumberInput
                                id={item._id}
                                value={item.stopLoss}
                                placeholder="stopLoss"
                                keyName="stopLoss"
                                onUpdate={handleValueUpdate}
                              />
                              <ToggleSwitch
                                checked={item?.stopLossAchieved}
                                onChange={() =>
                                  updateRecommendationDetails(item?._id, { stopLossAchieved: !item?.stopLossAchieved })
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <ToggleSwitch
                                checked={item?.isActive}
                                onChange={() => {
                                  setShowConfirm(!showConfirm);
                                  setSelectedStatus(!item?.isActive);
                                  setSelectedId(item?._id);
                                }}
                              />
                              <Button
                                type="button"
                                className="avtar avtar-xs btn btn-primary"
                                onClick={() => handleEditDate(item)}
                              >
                                <i className="ti ti-pencil f-20"></i>
                              </Button>
                              <Button
                                type="button"
                                className="avtar avtar-xs btn btn-danger ms-1"
                                variant="danger"
                                onClick={() => {
                                  setShowDeletion(!showDeletion);
                                  setSelectedId(item?._id);
                                }}
                              >
                                <i className="ti ti-trash f-20"></i>
                              </Button>
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

          {showDeletion ? (
            <ConfirmationModal
              show={showDeletion}
              handleConfirm={handleDelete}
              handleClose={() => setShowDeletion(false)}
              message={`Are you sure you want to delete this record?`}
              loading={updateLoading}
            />
          ) : (
            ""
          )}

          {showConfirm ? (
            <ConfirmationModal
              show={showConfirm}
              handleConfirm={() => {
                if (selectedStatus) {
                  updateRecommendationDetails(selectedId, { isActive: selectedStatus })
                } else {
                  setShowConfirm(false)
                  setShowReason(true)
                }
              }}
              handleClose={() => setShowConfirm(false)}
              message={`Are you sure you want to ${selectedStatus ? "activate" : "deactivate"
                } this record?`}
              loading={updateLoading}
            />
          ) : (
            ""
          )}

          {showReason ? (
            <ReasonModal
              show={showReason}
              handleClose={() => setShowReason(false)}
              handleConfirm={(reason) => {
                updateRecommendationDetails(selectedId, { isActive: selectedStatus, reason: reason })
                setShowReason(false)
              }}
              loading={updateLoading}
            />
          ) : (
            ""
          )}
        </Card>
      </div>

      <Loader updateLoading={updateLoading}></Loader>
    </React.Fragment>
  );
};

export default Recommendation;
