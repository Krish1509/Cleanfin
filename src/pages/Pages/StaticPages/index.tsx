/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
//import Components
import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import { Button, Card, CardBody, CardHeader } from "react-bootstrap";
import { getRequest } from "../../../service/fetch-services";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Common/Loader/Loader";

type StaticPageListData = {
  _id: string;
  pageName: string;
  content?: any;
};

const StaticPages = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<StaticPageListData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getRequest("static-pages/list");
      const { pages } = result;
      setData(pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditDate = (item: any) => {
    navigate("/staticPages/edit", { state: { row: item } });
  };

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Static Pages" subTitle="Static Page List" />
      <div className="col-12 mt-4 pb-4">
        <Card className="table-card">
          <CardHeader>
            <div className="d-sm-flex align-items-center justify-content-between">
              <h5 className="mb-3 mb-sm-0">Static Pages</h5>
            </div>
          </CardHeader>
          {!loading && (
            <React.Fragment>
              <CardBody className="pt-3">
                <div className="table-responsive">
                  <table className="table table-hover" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th style={{ width: "15%" }}>Page Name</th>
                        <th style={{ width: "70%" }}>Content</th>
                        <th style={{ width: "15%", textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, key) => (
                        <tr key={key}>
                          <td style={{ width: "15%" }}>{item?.pageName}</td>
                          <td
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 4,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxHeight: "510px",
                              whiteSpace: "normal",
                            }}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item?.content,
                              }}
                            />
                          </td>
                          <td style={{ width: "15%" }}>
                            <div className="d-flex align-items-center justify-content-center">
                              <Button type="button" className="avtar avtar-xs btn btn-primary" onClick={() => handleEditDate(item)}>
                                <i className="ti ti-pencil f-20"></i>
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
        </Card>
      </div>

      <Loader updateLoading={loading}></Loader>
    </React.Fragment>
  );
};

export default StaticPages;
