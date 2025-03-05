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
  touchlineData?: TouchlineData;  // Optional touchlineData property
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
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-0 text-muted font-bold">{optionScript?.name}</h5>
                  <p className="mb-0">{data?.touchlineData?.data?.last_traded_price}</p>
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ marginBottom: "auto" }}
              >
                <span className="badge bg-light-primary ms-2">
                  {data?.action.toUpperCase()}
                </span>
                <div className="flex-grow-1 ms-3">
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
                    <i
                      className="fas fa-exclamation-circle"
                      style={{ cursor: "pointer" }}
                    ></i>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-around mt-4">
              <div className="d-flex align-items-center justify-content-between flex-column">
                <div>Target 1</div>
                <div className="d-flex align-items-center justify-content-around gap-1">
                  <div>{data?.target1 || "-"}</div>
                  {data?.target1Achieved && (
                    <div className="check-icon beat-animation">
                      <i className="ph-duotone ph-seal-check "></i>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between flex-column">
                <div>Target 2</div>
                <div className="d-flex align-items-center justify-content-around gap-1">
                  <div>{data?.target2 || "-"}</div>
                  {data?.target2Achieved && (
                    <div className="check-icon beat-animation">
                      <i className="ph-duotone ph-seal-check "></i>
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-column">
                <div>Target 3</div>
                <div className="d-flex align-items-center justify-content-around gap-1">
                  <div>{data?.target3 || "-"}</div>
                  {data?.target3Achieved && (
                    <div className="check-icon beat-animation">
                      <i className="ph-duotone ph-seal-check "></i>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border w-100 mt-3"></div>

            <Row className="g-3 mt-2 text-center">
              <div className="col-4">
                <p className="mb-0 text-muted">Date</p>
                <h5 className="mb-0">
                  {" "}
                  {data?.date?.seconds
                    ? new Date(
                      data.date.seconds * 1000 +
                      Math.floor(data.date.nanoseconds / 1e6)
                    ).toLocaleDateString("en-GB")
                    : "-"}
                </h5>
              </div>
              <div className="col-4 border-start">
                <p className="mb-0 text-muted">Stop Loss</p>
                <div className="d-flex align-items-center justify-content-center gap-1">
                  <div>{data?.stopLoss || "-"}</div>
                  {data?.stopLossAchieved && (
                    <div className="check-icon beat-animation">
                      <i className="ph-duotone ph-seal-check "></i>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-4 border-start">
                <p className="mb-0 text-muted">Price</p>
                <div className="d-flex align-items-center justify-content-center gap-1">
                  <div>{data?.price || "-"}</div>
                  <span className="badge bg-light-secondary ms-2">
                    {data?.priceCondition?.toUpperCase()}
                  </span>
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
