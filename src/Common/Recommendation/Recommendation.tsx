import React from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../helper/firebase-config";
import {
  IOptionScriptsList,
  IRecommendation,
} from "../../pages/Pages/UserDashboard/Helper/interfaces";
import { TouchlineData } from "../../service/socketService";
interface RecommendationWithTouchline extends IRecommendation {
  touchlineData?: TouchlineData; // Optional touchlineData property
}
interface RecommendationProps {
  data: RecommendationWithTouchline;
}

const Recommendation: React.FC<RecommendationProps> = ({ data }) => {
  const [optionScript, setOptionScript] = React.useState<IOptionScriptsList>();

  React.useEffect(() => {
    const fetchOptionScript = async () => {
      try {
        if (data?.scriptId) {
          const optionScriptDocRef = doc(db, "optionScripts", data.scriptId);
          const optionScriptDocSnap: DocumentSnapshot = await getDoc(
            optionScriptDocRef
          );

          if (optionScriptDocSnap.exists()) {
            const optionScriptData =
              optionScriptDocSnap.data() as IOptionScriptsList;

            if (optionScriptData) {
              setOptionScript(optionScriptData);
            }
          } else {
            console.log("No such document in optionScripts!");
          }
        }
      } catch (err) {
        console.error("Error fetching optionScript:", err);
      }
    };

    fetchOptionScript();
  }, [data?.scriptId]);

  return (
    <React.Fragment>
      <Col>
        <Card className="statistics-card-1">
          <Card.Body className="p-3">
            <div className="d-flex" style={{ height: "100%" }}>
              <div className="flex-grow-1">
                <div className="d-flex">
                  <h5
                    className="mb-0 text-muted font-bold"
                    style={{ minWidth: 60 }}
                  >
                    {optionScript?.name || ""}
                  </h5>
                </div>
                <div className="d-flex">
                  <span>{data?.touchlineData?.data?.last_traded_price}</span>
                </div>
                <div className="d-flex">
                  <span>
                    {data?.date?.seconds
                      ? new Date(
                          data.date.seconds * 1000 +
                            Math.floor(data.date.nanoseconds / 1e6)
                        ).toLocaleDateString("en-GB")
                      : "-"}
                  </span>
                </div>
              </div>
              <div
                className="d-flex flex-grow-1 justify-content-end"
                style={{ height: "100%" }}
              >
                <span
                  className={`badge ms-2 ${
                    data.action === "buy"
                      ? "bg-light-success"
                      : "bg-light-danger"
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
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-start pt-2 border-top">
                  <p className="mb-0 f-w-600 text-start" style={{ width: 70 }}>
                    Stop Loss:
                  </p>
                  <div className="d-flex align-items-center justify-content-center ms-1">
                    <div className="mb-0 text-muted">{data?.stopLoss}</div>
                  </div>
                </div>
              </div>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Recommendation;
