/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Button, Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { handleFormData, postRequest } from "../../../service/fetch-services";
import Pagination from "../../../Common/Pagination";
import { useNavigate } from "react-router-dom";
import { TypeOptions } from "./type";
import Loader from "../../../Common/Loader/Loader";
import ToggleSwitch from "../../../Common/ToggleSwitch";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import ToastAlert from "../../../helper/toast-alert";

type EducationOptionsType = {
  value: null | boolean;
  label: string;
}

const EducationOptions: EducationOptionsType[] = [
  { value: null, label: "All" },
  { value: true, label: "Education" },
  { value: false, label: "No education" },
];

type ContentBytesData = {
  _id: string;
  title: string;
  isEducation: boolean;
  description: string;
  type: string;
  url?: string;
  filePath?: string;
  fileExtension: string;
  isActive: boolean;
};

const ContentBytes = () => {
  const navigate = useNavigate();

  const [contentBytesData, setContentBytesData] = useState<ContentBytesData[]>(
    []
  );
  const [education, setEducation] = useState<EducationOptionsType>(EducationOptions[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<boolean>();
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

  const fetchContentBytesData = React.useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        limit: entriesPerPage,
        page: currentPage,
        search: searchQuery,
        isEducation: education.value
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
  }, [entriesPerPage, currentPage, searchQuery, education]);

  useEffect(() => {
    fetchContentBytesData();
  }, [entriesPerPage, currentPage, searchQuery, education]);

  const handleEditDate = (id: string) => {
    navigate("/contentBytes/edit", { state: { id: id } });
  };

  const updateUserDetails = React.useCallback(
    async (id: string, key: string, value: any) => {
      setUpdateLoading(true);
      try {
        const formData = new FormData();

        formData.append("id", id);
        formData.append("isActive", value);

        const result = await handleFormData("contentBites/edit", formData);
        ToastAlert.success(result.message);
        // Update user in the local state
        setContentBytesData((prevList) =>
          prevList.map((content) =>
            content._id === id ? { ...content, [key]: value } : content
          )
        );
        setUpdateLoading(false);
        setShowConfirm(false);
        setSelectedId("");
      } catch (err) {
        setUpdateLoading(false);
      }
    },
    []
  );

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
            <ul className="d-flex justify-content-between list-inline my-1 mx-4 w-100">
              <li className="d-flex align-items-center" style={{ gap: 10 }}>
                <h6>Education</h6>
                <Form.Select
                  defaultValue={String(education.value).toString()}
                  onChange={(e) => {
                    setEducation(EducationOptions[e.target.selectedIndex])
                  }}
                  style={{ paddingTop: '0.55rem', paddingBottom: '0.55rem' }}
                >
                  {EducationOptions.map((item: EducationOptionsType) => {
                    return (
                      <option value={String(item.value).toString()} key={String(item.value).toString()}>{item.label}</option>
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
                        <th>Sr No</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>is Education</th>
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
                          <td>{item?.isEducation ? "Education" : "-"}</td>
                          <td className="html-content">
                            <span
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxHeight: "300px",
                                whiteSpace: "normal",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button
                                type="button"
                                className="avtar avtar-xs btn btn-primary"
                                onClick={() => handleEditDate(item?._id)}
                              >
                                <i className="ti ti-pencil f-20"></i>
                              </Button>
                              <ToggleSwitch
                                checked={item?.isActive}
                                onChange={() => {
                                  setShowConfirm(!showConfirm);
                                  setSelectedStatus(!item?.isActive);
                                  setSelectedId(item?._id);
                                }}
                              />
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
          {showConfirm ? (
            <ConfirmationModal
              show={showConfirm}
              handleConfirm={() =>
                updateUserDetails(selectedId, "isActive", selectedStatus)
              }
              handleClose={() => setShowConfirm(false)}
              message={`Are you sure you want to ${selectedStatus ? "activate" : "deactivate"
                } this record?`}
              loading={updateLoading}
            />
          ) : (
            ""
          )}
        </Card>
      </div>

      <Loader updateLoading={loading || updateLoading}></Loader>
    </React.Fragment>
  );
};

export default ContentBytes;
