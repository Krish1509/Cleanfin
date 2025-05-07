import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { postRequest } from "../../service/fetch-services";
import BarChart from "./BarChart";

export interface FIIDIIData {
  [date: string]: {
    FII: {
      totalBuy: number;
      totalSell: number;
      totalNet: number;
    };
    DII: {
      totalBuy: number;
      totalSell: number;
      totalNet: number;
    };
  };
}

const FIIDIITradesCard = () => {
  const [countLoading, SetCountLoading] = useState<boolean>(false);
  const [pastPerformanceCount, SetPastPerformanceCount] =
    useState<FIIDIIData>(Object);

  const fetchFIIDIITrades = async () => {
    try {
      SetCountLoading(true);
      const result = await postRequest("fiiDiiTrades/list", {
        groupBy: "day",
        period: 10
      });
      SetPastPerformanceCount(result?.data);
      SetCountLoading(false);
    } catch (err) {
      console.log(err);
      SetCountLoading(false);
    }
  };

  useEffect(() => {
    fetchFIIDIITrades();
  }, []);

  return (
    <React.Fragment>
      {!countLoading ? (
        <Row>
          <Col xs={12}>
            <BarChart data={pastPerformanceCount} />
          </Col>
        </Row>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default FIIDIITradesCard;
