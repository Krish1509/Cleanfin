/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

//import Components
import { Card, CardBody, Col, Row, Spinner } from "react-bootstrap";
import BreadcrumbItem from "../../../../Common/BreadcrumbItem";
import FilePreview from "../../../../Common/FileViewer";
import { Field, Form, Formik } from "formik";
import RichTextEditor from "../../../../Common/Editor/RichTextEditor";
import Select from "react-select";
import * as Yup from "yup";
import {
  handleFormData,
  postRequest,
} from "../../../../service/fetch-services";
import ToastAlert from "../../../../helper/toast-alert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeOptions } from "../type";

const validationSchema = Yup.object().shape({
  type: Yup.string().required("Type is required!"),
  title: Yup.string().required("Title is required!"),
  description: Yup.string().required("Description is required!"),
  url: Yup.string().when("type", {
    is: "url",
    then: (schema) =>
      schema.required("URL is required!").url("Invalid URL format!"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

interface FormValues {
  type: string;
  title: string;
  description: string;
  filePath?: string;
  url?: string;
}

const AddContentBytes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editId = location?.state !== undefined ? location?.state?.id : "";
  const user = JSON.parse(localStorage.getItem("user") || "");

  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [getLoading, setGetLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [error, setError] = useState("");

  const handleSubmit = async (values: any) => {
    try {
      // Submit user details to the backend
      const formData = new FormData();
      formData.append("userId", user?._id);
      formData.append("type", values?.type);
      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("url", values?.url);
      if (selectedFile) {
        formData.append("filePath", selectedFile);
      }

      setLoading(true);

      if (editData?._id) {
        formData.append("id", editData?._id);
      }
      const url = editData?._id ? "contentBites/edit" : "contentBites/add";
      const result = await handleFormData(url, formData);

      if (result) {
        ToastAlert.success(
          `Content Bytes ${editData?._id ? "updated" : "created"} successfully`
        );
        navigate("/contentBytes");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const fetchDetail = async () => {
    try {
      // Submit user details to the backend
      setGetLoading(true);
      const body = {
        id: editId,
      };
      const result = await postRequest("contentBites/view", body);

      if (result) {
        setEditData(result?.data);
      }
      setGetLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (editId) {
      fetchDetail();
    }
  }, [editId]);

  const handleFileChange = (e: any, type: string) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;

    const allowedTypes: Record<string, string[]> = {
      file: [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
      ],
      audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
      video: ["video/mp4", "video/ogg", "video/webm"],
    };

    if (!allowedTypes[type]?.includes(fileType)) {
      setError(`Invalid file type! Please upload a valid ${type} file.`);
      setSelectedFile(null);
      e.target.value = ""; // Clear the file input
    } else {
      setError("");
      setSelectedFile(file);
    }
  };

  return (
    <React.Fragment>
      <BreadcrumbItem
        mainTitle="Content Bytes"
        subTitle={`Content Bytes ${editData?._id ? "Edit" : "Add"}`}
      />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              {getLoading ? (
                <center className="m-4">Loading...</center>
              ) : (
                <div className="container">
                  <Formik<FormValues>
                    initialValues={{
                      type: editData?.type || "url",
                      title: editData?.title || "",
                      description: editData?.description || "",
                      url: editData?.url || "",
                      filePath: editData?.filePath || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched, values, setFieldValue }) => (
                      <Form>
                        <Row>
                          <Col sm={6}>
                            <div className="mb-3">
                              <label className="form-label">Type</label>
                              <Select
                                isSearchable={true}
                                options={TypeOptions}
                                placeholder="Select"
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(value) => {
                                  setFieldValue("type", value?.value);
                                  setSelectedFile(null);
                                  setError("");
                                }}
                                value={TypeOptions?.filter(
                                  (obj) => values?.type === obj.value
                                )}
                              />
                              {errors.type && touched.type ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.type}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                          <Col sm={6}>
                            <div className="mb-3">
                              <label className="form-label">File Or URL</label>
                              {values?.type === "url" ? (
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="url"
                                  placeholder="Url"
                                  name="url"
                                />
                              ) : (
                                <input
                                  type="file"
                                  className="form-control"
                                  id="url"
                                  name={values?.type}
                                  onChange={(e) =>
                                    handleFileChange(e, values?.type)
                                  }
                                  accept={
                                    values?.type === "file"
                                      ? ".pdf,.jpg,.jpeg,.png,.gif,.bmp"
                                      : values?.type === "audio"
                                        ? "audio/*"
                                        : values?.type === "video"
                                          ? "video/*"
                                          : ""
                                  }
                                />
                              )}
                              {errors.url && touched.url ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.url}
                                </div>
                              ) : null}
                              {!error &&
                                values?.type !== "url" &&
                                !selectedFile &&
                                (editData?._id ? !editData?.filePath : true) ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  File is required
                                </div>
                              ) : null}
                              {error ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {error}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        {selectedFile || editData?.filePath ? (
                          <div
                            className="list-unstyled mb-3"
                            id="file-previews"
                          >
                            <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                              <div className="py-3 px-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto" style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
                                    {selectedFile ? (
                                      // Display newly selected file
                                      selectedFile.type.startsWith("image/") ||
                                        selectedFile.type.startsWith("video/") ||
                                        selectedFile.type.startsWith("audio/") ||
                                        selectedFile.type.startsWith("file/") ||
                                        selectedFile.type.startsWith("application/") ||
                                        selectedFile.type.startsWith("text/") ? (
                                        <FilePreview
                                          type={"file"}
                                          file={selectedFile}
                                        />
                                      ) : (
                                        <Link
                                          to={URL.createObjectURL(selectedFile)}
                                          target="_blank"
                                          className="text-muted font-weight-bold"
                                        >
                                          {selectedFile.name}
                                        </Link>
                                      )
                                    ) : (
                                      // Display existing file from editData
                                      editData?.filePath ? (
                                          <FilePreview
                                            type={"url"}
                                            // file={editData?.filePath}
                                            url={editData?.filePath}
                                          />
                                        ) : (
                                          <Link
                                            to={editData.filePath}
                                            target="_blank"
                                            className="text-muted font-weight-bold"
                                          >
                                            {editData?.filePath}
                                          </Link>
                                        )
                                      )
                                    }
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          </div>
                        ) : (
                          ""
                        )}
                        <Row>
                          <Col sm={12}>
                            <div className="mb-3">
                              <label className="form-label">Title</label>
                              <Field
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Title"
                                name="title"
                              />
                              {errors.title && touched.title ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.title}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col sm={12}>
                            <div className="mb-3">
                              <label className="form-label">Description</label>
                              <RichTextEditor
                                value={values?.description}
                                onChange={(value) =>
                                  setFieldValue("description", value)
                                }
                              />
                              {errors.description && touched.description ? (
                                <div className="invalid-feedback d-flex align-items-start">
                                  {errors.description}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <div className="text-end">
                            <button
                              type="button"
                              className="btn btn-outline-secondary me-1"
                              onClick={() => navigate("/contentBytes")}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={loading}
                            >
                              Submit{" "}
                              {loading ? (
                                <Spinner className="ml-2" size="sm" />
                              ) : (
                                ""
                              )}
                            </button>
                          </div>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddContentBytes;
