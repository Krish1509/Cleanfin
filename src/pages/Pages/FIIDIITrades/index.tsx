/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Loader from "../../../Common/Loader/Loader";
import moment from "moment";
import { formatNum } from "../../../helper/formatNum";

// Define types for FII and DII
interface TransactionData {
  totalBuy: number;
  totalSell: number;
  totalNet: number;
}

interface FIIDIIData {
  FII: TransactionData;
  DII: TransactionData;
}

const FIIDIITrades = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [FIIDIITrades, setFIIDIITrades] = useState<{ [key: string]: FIIDIIData }>({});

  const fetchExitedCalls = async () => {
    try {
      setLoading(true);
      const result = await postRequest("fiiDiiTrades/list", {
        groupBy: "month",
        period: 5
      });
      setFIIDIITrades(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExitedCalls();
  }, []);

  return (
    <React.Fragment>
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">FII DII Trades</h5>
            </div>
          </CardHeader>
          {!loading && (
            <React.Fragment>
              <CardBody className="pt-0">
                <table className="table table-hover" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th></th>
                      <th colSpan={3} className="text-center" style={{ borderRight: '1px solid #DBE0E5' }}>FII Rs Crores</th>
                      <th colSpan={3} className="text-center">DII Rs Crores</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Buy</th>
                      <th>Sell</th>
                      <th>Net</th>
                      <th>Buy</th>
                      <th>Sell</th>
                      <th>Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(FIIDIITrades).map((date) => {
                      const { FII, DII } = FIIDIITrades[date];
                      return (
                        <tr key={date}>
                          <td>{moment(date).format("MMM YYYYY")}</td>
                          <td>{formatNum(FII.totalBuy)}</td>
                          <td>{formatNum(FII.totalSell)}</td>
                          <td>{formatNum(FII.totalNet)}</td>
                          <td>{formatNum(DII.totalBuy)}</td>
                          <td>{formatNum(DII.totalSell)}</td>
                          <td>{formatNum(DII.totalNet)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
            </React.Fragment>
          )}
        </Card>
      </div>

      <Loader updateLoading={loading}></Loader>
    </React.Fragment>
  );
};

export default FIIDIITrades;
