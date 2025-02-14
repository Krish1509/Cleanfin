/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../../../../service/fetch-services";
import FilePreview from "../../../../Common/FileViewer";
import Loader from "../../../../Common/Loader/Loader";
import audio from "../../../../assets/images/user/audio.jpg";
import video from "../../../../assets/images/user/video.jpg";
import file from "../../../../assets/images/user/file.jpg";

const ViewContentBytes = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [listData, setListData] = useState<any>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const viewId = location?.state !== undefined ? location?.state?.id : "";

  const handleViewContentBytes = (id: string) => {
    navigate("/content/view", { state: { id: id } });
  };

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const body = {
        id: viewId,
      };
      const result = await postRequest("contentBites/view", body);
      const listResult = await postRequest("contentBites/list", {
        limit: 5,
        isActive: true,
      });

      if (result) {
        setData(result?.data);
      }
      if (listResult) {
        const { contentBites } = listResult.data;
        setListData(contentBites);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (viewId) {
      fetchDetail();
    }
  }, [viewId]);

  return (
    <React.Fragment>
      {!loading && (
        <Row>
          <Col sm={8}>
            <Card>
              <CardHeader>
                <FilePreview url={data?.filePath} />
              </CardHeader>
              <CardBody className="border-bottom">
                <Row>
                  <Col>
                    <Row>
                      <div className="">
                        <h4 className="d-inline-block me-1">{data?.title}</h4>
                        <p className="text-muted">
                          <i className="feather icon-clock me-1"></i>
                          <label className="mb-0">{data?.uploaded}</label>
                        </p>
                      </div>
                    </Row>
                    <Row>
                      <span
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: data?.description,
                        }}
                      ></span>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          {/* Sidebar view */}
          <Col sm={4}>
            {listData?.map((contentbyte: any) => (
              <Card
                className="overflow-hidden"
                key={contentbyte._id}
                onClick={() => handleViewContentBytes(contentbyte?._id)}
              >
                <CardBody className="p-0">
                  <Row className="d-flex">
                    <Col
                      sm={4}
                      className="d-flex align-items-center p-0"
                      style={{ width: "33.33%" }}
                    >
                      {/* <FilePreview url={contentbyte?.filePath} /> */}
                      <img
                        src={
                          contentbyte?.type === "audio"
                            ? audio
                            : contentbyte?.type === "video"
                            ? video
                            : file
                        }
                        className="img-fluid rounded-md-start object-fit-cover w-100 h-100"
                        alt="card-image"
                      />
                    </Col>
                    <Col sm={8} style={{ paddingLeft: 0, width: "66.66%" }}>
                      <div
                        className="h-100 gap-3 py-3 px-2"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5 className="mb-0 w-100 overflow-hidden text-nowrap text-truncate">
                          {contentbyte?.title}
                        </h5>
                        <p
                          className="mb-0 justify-content-between"
                          style={{ display: "flex" }}
                        >
                          <span className="text-muted">
                            <i className="feather icon-clock me-1"></i>
                            <label className="mb-0">
                              {contentbyte?.uploaded}
                            </label>
                          </span>
                          <span className="badge bg-light-secondary">
                            {contentbyte?.type}
                          </span>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))}
          </Col>
        </Row>
      )}

      <Loader updateLoading={loading}></Loader>
    </React.Fragment>
  );
};

export default ViewContentBytes;
