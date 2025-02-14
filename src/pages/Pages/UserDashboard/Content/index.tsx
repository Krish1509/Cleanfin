/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import ContentBytes from "../../../../Common/ContentBytes/ContentBytes";
import { IContentbytes } from "../Helper/interfaces";
import { postRequest } from "../../../../service/fetch-services";
import Loader from "../../../../Common/Loader/Loader";

const Content = () => {
  const [filter, setFilter] = useState<null | "audio" | "video" | "file">(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [contentBytes, SetcontentBytes] = useState<IContentbytes[]>([]);
  const [contentBytesLoading, SetcontentBytesLoading] =
    useState<boolean>(false);

  const fetchContentBytes = async () => {
    try {
      setLoading(true);
      SetcontentBytesLoading(true);
      const result = await postRequest("contentBites/list", {
        type: filter,
        isActive: true,
      });
      SetcontentBytes(result?.data?.contentBites);
      SetcontentBytesLoading(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      SetcontentBytesLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentBytes();
  }, [filter]);

  return (
    <React.Fragment>
      <div className="pb-2">
        <div className="menucontainer">
          <div className="menu">
            <div
              onClick={() => setFilter(null)}
              className={`menu-item ${filter === null ? "active" : ""}`}
            >
              All
            </div>
            <div
              onClick={() => setFilter("video")}
              className={`menu-item ${filter === "video" ? "active" : ""}`}
            >
              Video
            </div>
            <div
              onClick={() => setFilter("audio")}
              className={`menu-item ${filter === "audio" ? "active" : ""}`}
            >
              Audio
            </div>
            <div
              onClick={() => setFilter("file")}
              className={`menu-item ${filter === "file" ? "active" : ""}`}
            >
              File
            </div>
          </div>
        </div>

        <Card>
          <CardBody>
            <div id="content-bytes">
              <Row>
                {!contentBytesLoading &&
                  contentBytes?.map((item, i) => {
                    return (
                      <Col xs={6} key={i}>
                        <ContentBytes data={item} />
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </CardBody>
        </Card>
      </div>

      <Loader updateLoading={loading}></Loader>
    </React.Fragment>
  );
};

export default Content;
