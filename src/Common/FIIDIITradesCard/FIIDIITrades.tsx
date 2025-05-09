import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { postRequest } from "../../service/fetch-services";
import BarChart from "./BarChart";
import { TradeTime } from "./contsant";

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

type FIIDIITradesCardProps = {
  tradesTimes: TradeTime;
}

const FIIDIITradesCard = ({ tradesTimes }: FIIDIITradesCardProps) => {
  const [countLoading, SetCountLoading] = useState<boolean>(false);
  const [pastPerformanceCount, SetPastPerformanceCount] =
    useState<FIIDIIData>(Object);

  const fetchFIIDIITrades = React.useCallback(async () => {
    try {
      SetCountLoading(true);
      const result = await postRequest("fiiDiiTrades/list", {
        groupBy: tradesTimes,
        period: 7
      });
      SetPastPerformanceCount(result?.data);
      SetCountLoading(false);
    } catch (err) {
      console.log(err);
      SetCountLoading(false);
    }
  }, [tradesTimes]);

  useEffect(() => {
    fetchFIIDIITrades();
  }, [tradesTimes, fetchFIIDIITrades]);

  return (
    <React.Fragment>
      {!countLoading ? (
        <Row>
          <Col xs={12}>
            <BarChart data={pastPerformanceCount} tradesTimes={tradesTimes} />
          </Col>
        </Row>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default FIIDIITradesCard;
