/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import moment from "moment";

//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination"; // Import Pagination component
import Loader from "../../../Common/Loader/Loader";
import { IOptionScriptsList } from "../UserDashboard/Helper/interfaces";
import ToggleSwitch from "../../../Common/ToggleSwitch";

type segmentIDMappingType = {
  id: number | undefined;
  code: string;
}

const segmentIDMapping: segmentIDMappingType[] = [
  { id: undefined, code: "Not selected" },
  { id: 1, code: "NSE_EQ" },
  { id: 2, code: "NSE_FO" },
  { id: 5, code: "MCX_FO" },
];

const OptionScripts = () => {
  const [optionScriptsListData, setOptionScriptsListData] = useState<IOptionScriptsList[]>([]);
  const [selectedSegmentID, setSelectedSegmentID] = useState<segmentIDMappingType>(segmentIDMapping[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
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

  const fetchOptionScriptsListData = React.useCallback(async () => {
    try {
      setUpdateLoading(true);
      setLoading(true);
      const body = {
        segmentID: selectedSegmentID.id,
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
      };
      const result = await postRequest("option-scripts/all", body, true);
      const { optionScripts, totalPages } = await result;
      setOptionScriptsListData(optionScripts);
      setTotalPages(totalPages);
      setLoading(false);
      setUpdateLoading(false);
    } catch (err) {
      setLoading(false);
      setUpdateLoading(false);
    }
  }, [entriesPerPage, currentPage, searchQuery, selectedSegmentID]);

  useEffect(() => {
    fetchOptionScriptsListData();
  }, [entriesPerPage, currentPage, searchQuery, fetchOptionScriptsListData, selectedSegmentID]);

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Option Scripts" subTitle="Option Scripts List" />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">Option Scripts List</h5>
            </div>
          </CardHeader>
          <div className="d-sm-flex align-items-center w-100 mt-4">
            <ul className="d-flex justify-content-between list-inline my-1 mx-4 w-100">
              <li className="d-flex align-items-center" style={{ gap: 10 }}>
                <h6>Segment</h6>
                <Form.Select
                  defaultValue={selectedSegmentID.id}
                  onChange={(e) => {
                    setSelectedSegmentID(segmentIDMapping[e.target.selectedIndex])
                  }}
                  style={{ paddingTop: '0.55rem', paddingBottom: '0.55rem' }}
                >
                  {segmentIDMapping.map((item: segmentIDMappingType) => {
                    return (
                      <option value={item.id} key={item.id}>{item.code}</option>
                    )
                  })}
                </Form.Select>
              </li>
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>segmentID</th>
                        <th>Expire</th>
                        <th>Inst</th>
                        <th>Lot</th>
                        <th>Opt</th>
                        <th>Ser</th>
                        <th>Strike</th>
                        <th>Sym</th>
                        <th>Tick</th>
                        <th>Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optionScriptsListData.map((item, key) => (
                        <tr key={key}>
                          <td>{item?._id}</td>
                          <td>{item?.name}</td>
                          <td>{item?.code}</td>
                          <td>{item?.segmentID}</td>
                          <td>{item?.exp}</td>
                          <td>{item?.inst}</td>
                          <td>{item?.lot}</td>
                          <td>{item?.opt || "-"}</td>
                          <td>{item?.ser || "-"}</td>
                          <td>{item?.strike || "-"}</td>
                          <td>{item?.sym}</td>
                          <td>{item?.tick}</td>
                          <td>
                            <ToggleSwitch
                              checked={item?.isActive}
                              onChange={() => { }}
                            // onChange={() =>
                            //   // updateUserDetails(
                            //   //   item._id,
                            //   //   "isActive",
                            //   //   !item?.isActive
                            //   // )
                            //   {
                            //     setShowConfirm(!showConfirm);
                            //     setSelectedStatus(!item?.isActive);
                            //     setSelectedId(item?.id);
                            //   }
                            // }
                            />
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
        </Card>
      </div>

      <Loader updateLoading={updateLoading}></Loader>
    </React.Fragment>
  );
};

export default OptionScripts;
