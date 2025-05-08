import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Loader from "../../../Common/Loader/Loader";
import moment from "moment";
import { formatNum } from "../../../helper/formatNum";
import { RiArrowDownSLine } from "react-icons/ri";

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
  const [selectedMonthData, setSelectedMonthData] = useState<{ [key: string]: FIIDIIData } | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);  // Track the selected month
  const [selectedYear, setSelectedYear] = useState<string | null>(null);  // Track the selected year

  const fetchExitedCalls = async () => {
    try {
      setLoading(true);
      const result = await postRequest("fiiDiiTrades/list", {
        groupBy: "month",
        period: 5,
      });
      setFIIDIITrades(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchMonthData = async (month: string, year: string) => {
    try {
      setLoading(true);
      const result = await postRequest(`fiiDiiTrades/getMonthlyData`, {
        month: month,
        year: year
      });
      setSelectedMonthData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleRowClick = (date: string) => {
    const month = moment(date).format('M')
    const year = moment(date).format('YYYY')

    if (selectedMonth === month && selectedYear === year) {
      setSelectedMonth(null);
      setSelectedMonthData(null);
    } else {
      setSelectedMonth(month);
      setSelectedYear(year);
      fetchMonthData(month, year);
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
                      const formattedDate = moment(date).format("MMM YYYY");

                      const checkSelection = selectedMonth === moment(date).format('M') && selectedYear === moment(date).format('YYYY');

                      return (
                        <React.Fragment key={date}>
                          <tr style={{ cursor: 'pointer' }} onClick={() => handleRowClick(date)}>
                            <td>
                              <RiArrowDownSLine className="f-20 m-r-10" style={{ transform: checkSelection ? "rotate(180deg)" : "rotate(0)" }} />
                              {formattedDate}
                            </td>
                            <td>{formatNum(FII.totalBuy)}</td>
                            <td>{formatNum(FII.totalSell)}</td>
                            <td>{formatNum(FII.totalNet)}</td>
                            <td>{formatNum(DII.totalBuy)}</td>
                            <td>{formatNum(DII.totalSell)}</td>
                            <td>{formatNum(DII.totalNet)}</td>
                          </tr>
                          {checkSelection && selectedMonthData && (
                            <>
                              {Object.keys(selectedMonthData).map((date) => {
                                const { FII, DII } = selectedMonthData[date];
                                const formattedDate = moment(date).format("DD MMM YYYY");
                                return (
                                  <React.Fragment key={date}>
                                    <tr onClick={() => handleRowClick(date)} style={{ background: "#80808020" }}>
                                      <td>{formattedDate}</td>
                                      <td>{formatNum(FII.totalBuy)}</td>
                                      <td>{formatNum(FII.totalSell)}</td>
                                      <td>{formatNum(FII.totalNet)}</td>
                                      <td>{formatNum(DII.totalBuy)}</td>
                                      <td>{formatNum(DII.totalSell)}</td>
                                      <td>{formatNum(DII.totalNet)}</td>
                                    </tr>
                                  </React.Fragment>
                                );
                              })}
                            </>
                          )}
                        </React.Fragment>
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
