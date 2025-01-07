/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Button, Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination";
import { useNavigate } from "react-router-dom";
import { TypeOptions } from "./type";

type ContentBytesData = {
  _id: string;
  title: string;
  description: string;
  type: string;
  url?: string;
  filePath?: string;
  fileExtension: string;
};

const ContentBytes = () => {
  const navigate = useNavigate();

  const [contentBytesData, setContentBytesData] = useState<ContentBytesData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

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

  const fetchContentBytesData = React.useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
      };
      const result = await postRequest("contentBites/list", body, true);
      const { contentBites, totalPages } = result.data;
      setContentBytesData(contentBites);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [entriesPerPage, currentPage, searchQuery]);

  useEffect(() => {
    fetchContentBytesData();
  }, [entriesPerPage, currentPage, searchQuery]);

  const handleEditDate = (id: string) => {
    navigate("/contentBytes/edit", { state: { id: id } });
  };

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Content Bytes" subTitle="Content Bytes list" />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">Content Bytes list</h5>
              <Button
                onClick={() => navigate("/contentBytes/add")}
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
          {loading ? (
            <center className="m-4">Loading...</center>
          ) : (
            <React.Fragment>
              <CardBody className="pt-3">
                <div className="table-responsive">
                  <table className="table table-hover" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentBytesData?.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item?.title}</td>
                          <td>
                            {item?.type
                              ? TypeOptions?.find(
                                  (type) => type?.value === item?.type
                                )?.label
                              : ""}
                          </td>
                          <td className="html-content">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button
                                type="button"
                                className="avtar avtar-xs btn-link-success btn-pc-default"
                                onClick={() => handleEditDate(item?._id)}
                              >
                                <i className="ti ti-edit-circle f-20"></i>
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
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ContentBytes;
