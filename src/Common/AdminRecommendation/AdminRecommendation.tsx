/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { IRecommendation } from "../../pages/Pages/UserDashboard/Helper/interfaces";
import ToggleSwitch from "../ToggleSwitch";
import { postRequest } from "../../service/fetch-services";
import ToastAlert from "../../helper/toast-alert";
import ConfirmationModal from "../ConfirmationModal";
import ReasonModal from "../ReasonModal";
import moment from "moment";
import { TouchlineData } from "../../service/socketService";

interface RecommendationWithTouchline extends IRecommendation {
  touchlineData?: TouchlineData; // Optional touchlineData property
}
interface RecommendationProps {
  data: RecommendationWithTouchline;
  setdata: (data: any) => void;
  updateLoading: boolean;
  setUpdateLoading: (data: boolean) => void;
}

const AdminRecommendation: React.FC<RecommendationProps> = ({
  data,
  setdata,
  updateLoading,
  setUpdateLoading,
}) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showReason, setShowReason] = useState<boolean>(false);

  const updateRecommendationDetails = async (
    id: string,
    updates: { [key: string]: unknown }
  ) => {
    try {
      setUpdateLoading(true);
      const body = { id, ...updates };
      const result = await postRequest("recommendation/edit", body, true);
      ToastAlert.success(result.message);
      // Update user in the local state
      setdata((prevList: any) => {
        if (updates.isActive === false) {
          // Remove only the specific item
          return prevList.filter((rec: any) => rec._id !== id);
        } else {
          // Update the specific item
          return prevList.map((rec: any) =>
            rec._id === id ? { ...rec, ...updates } : rec
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
        <Card.Body className="p-3">
          <div className="d-flex" style={{ height: "100%" }}>
            <div className="flex-grow-1">
              <div className="d-flex">
                <h5
                  className="mb-0 text-muted font-bold"
                  style={{ minWidth: 60 }}
                >
                  {data?.scriptData[0]?.name || ""}
                </h5>
              </div>
              <div className="d-flex">
                <span>{data?.touchlineData?.data?.last_traded_price}</span>
              </div>
              <div className="d-flex">
                <span>{moment(data?.date).format("YYYY-MM-DD")}</span>
              </div>
            </div>
            <div
              className="d-flex flex-grow-1 justify-content-end"
              style={{ height: "100%" }}
            >
              <span
                className={`badge ms-2 ${
                  data.action === "buy" ? "bg-light-success" : "bg-light-danger"
                }`}
              >
                {data?.action.toUpperCase()}
              </span>
              <div className="ms-3">
                {data?.recommendation ? (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="top">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: data.recommendation,
                          }}
                        />
                      </Tooltip>
                    }
                  >
                    <i
                      className="fas fa-exclamation-circle"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </OverlayTrigger>
                ) : (
                  <i className="fas fa-exclamation-circle"></i>
                )}
              </div>
            </div>
          </div>
          <hr className="my-3 border-top border-secondary border-opacity-50" />
          <Row className="g-3 text-center">
            <div className="col-6">
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 f-w-600 pb-1 h5">Price</p>
                <span className="badge bg-light-secondary me-2">
                  {data?.priceCondition?.toUpperCase()}
                </span>
              </div>
              <div className="mb-0 text-muted pb-1 pt-2 d-flex">
                {data?.price || "-"}
              </div>
            </div>
            <div className="col-6 border-start">
              <div className="d-flex align-items-center justify-content-start pb-2">
                <p className="mb-0 f-w-600 text-start" style={{ width: 70 }}>
                  Target:
                </p>
                <div className="d-flex align-items-center justify-content-center ms-1">
                  <div className="mb-0 text-muted">{data?.target1}</div>
                  <ToggleSwitch
                    checked={data?.target1Achieved}
                    onChange={() =>
                      updateRecommendationDetails(data?._id, {
                        target1Achieved: !data?.target1Achieved,
                      })
                    }
                  />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-start pt-2 border-top">
                <p className="mb-0 f-w-600 text-start" style={{ width: 70 }}>
                  Stop Loss:
                </p>
                <div className="d-flex align-items-center justify-content-center ms-1">
                  <div className="mb-0 text-muted">{data?.stopLoss}</div>
                  <ToggleSwitch
                    checked={data?.stopLossAchieved}
                    onChange={() =>
                      updateRecommendationDetails(data?._id, {
                        stopLossAchieved: !data?.stopLossAchieved,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </Row>
        </Card.Body>
      </Card>
      {showConfirm ? (
        <ConfirmationModal
          show={showConfirm}
          handleConfirm={() => {
            if (!data?.isActive) {
              updateRecommendationDetails(data?._id, {
                isActive: !data?.isActive,
              });
            } else {
              setShowConfirm(false);
              setShowReason(true);
            }
          }}
          handleClose={() => setShowConfirm(false)}
          message={`Are you sure you want to ${
            data?.isActive ? "deactivate" : "activate"
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
            updateRecommendationDetails(data?._id, {
              isActive: !data?.isActive,
              reason: reason,
            });
            setShowReason(false);
          }}
          loading={updateLoading}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default AdminRecommendation;
