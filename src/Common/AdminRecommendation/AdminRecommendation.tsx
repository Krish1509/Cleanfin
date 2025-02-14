/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, Row } from "react-bootstrap";
import { IRecommendation } from "../../pages/Pages/UserDashboard/Helper/interfaces";
import ToggleSwitch from "../ToggleSwitch";
import { postRequest } from "../../service/fetch-services";
import ToastAlert from "../../helper/toast-alert";
import Loader from "../Loader/Loader";
import ConfirmationModal from "../ConfirmationModal";
import moment from "moment";
interface RecommendationProps {
  data: IRecommendation;
  setdata: (data: any) => void;
}

const AdminRecommendation: React.FC<RecommendationProps> = ({
  data,
  setdata,
}) => {
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const updateRecommendationDetails = async (
    id: string,
    key: string,
    value: unknown
  ) => {
    try {
      setUpdateLoading(true);
      const body = { id, [key]: value };
      const result = await postRequest("recommendation/edit", body, true);
      ToastAlert.success(result.message);
      // Update user in the local state
      setdata((prevList: any) => {
        if (key === "isActive" && value === false) {
          // Remove only the specific item
          return prevList.filter((rec: any) => rec._id !== id);
        } else {
          // Update the specific item
          return prevList.map((rec: any) =>
            rec._id === id ? { ...rec, [key]: value } : rec
          );
        }
      });
      setShowConfirm(false);
      setUpdateLoading(false);
    } catch (err) {
      console.error(err);
      setUpdateLoading(false);
    }
  };

  React.useEffect(() => {
    if (updateLoading) {
      setUpdateLoading(false);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Card className="statistics-card-1">
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <p className="mb-0 f-w-600">{data?.scriptData[0]?.name || ""} </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge bg-light-primary ms-2">
                {data?.action.toUpperCase()}
              </span>
              <div className="flex-grow-1 ms-3">
                <ToggleSwitch
                  checked={data?.isActive}
                  onChange={() => {
                    setShowConfirm(!showConfirm);
                  }}
                />
              </div>
            </div>
          </div>
          <Row className="g-3 mt-2 text-center">
            <div className="col-4">
              <div className="d-flex align-items-center mb-2">
                <p className="mb-0 ">Target 1</p>
                <ToggleSwitch
                  checked={data?.target1Achieved}
                  onChange={() =>
                    updateRecommendationDetails(
                      data?._id,
                      "target1Achieved",
                      !data?.target1Achieved
                    )
                  }
                />
              </div>
              <div className="mb-0 text-muted">{data?.target1 || "-"}</div>
            </div>
            <div className="col-4">
              <div className="d-flex align-items-center mb-2">
                <p className="mb-0 ">Target 2</p>
                <ToggleSwitch
                  checked={data?.target2Achieved}
                  onChange={() =>
                    updateRecommendationDetails(
                      data?._id,
                      "target2Achieved",
                      !data?.target2Achieved
                    )
                  }
                />
              </div>
              <div className="mb-0 text-muted">{data?.target2 || "-"}</div>
            </div>
            <div className="col-4">
              <div className="d-flex align-items-center mb-2">
                <p className="mb-0 ">Target 3</p>
                <ToggleSwitch
                  checked={data?.target3Achieved}
                  onChange={() =>
                    updateRecommendationDetails(
                      data?._id,
                      "target3Achieved",
                      !data?.target3Achieved
                    )
                  }
                />
              </div>
              <div className="mb-0 text-muted">{data?.target3 || "-"}</div>
            </div>
          </Row>
          <hr className="my-4 border-top border-secondary border-opacity-50" />
          <Row className="g-3 text-center">
            <div className="col-6">
              <p className="mb-0 f-w-600">Date</p>
              <div className="mb-0 text-muted">
                {moment(data?.date).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="col-6 border-start">
              <div className="d-flex align-items-center mb-2 justify-content-center">
                <p className="mb-0 f-w-600">Stop Loss</p>
                <ToggleSwitch
                  checked={data?.stopLossAchieved}
                  onChange={() =>
                    updateRecommendationDetails(
                      data?._id,
                      "stopLossAchieved",
                      !data?.stopLossAchieved
                    )
                  }
                />
              </div>
              <div className="mb-0 text-muted">{data?.stopLoss}</div>
            </div>
          </Row>
        </Card.Body>
      </Card>
      <Loader updateLoading={updateLoading}></Loader>
      {showConfirm ? (
        <ConfirmationModal
          show={showConfirm}
          handleConfirm={() =>
            updateRecommendationDetails(data?._id, "isActive", !data?.isActive)
          }
          handleClose={() => setShowConfirm(false)}
          message={`Are you sure you want to ${
            data?.isActive ? "deactivate" : "activate"
          } this record?`}
          loading={updateLoading}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default AdminRecommendation;
