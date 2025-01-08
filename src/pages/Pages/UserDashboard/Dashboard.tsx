import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";
// import BreadcrumbItem from "../../../Common/BreadcrumbItem";
import ScrollSpy from "react-ui-scrollspy";
import Navigation from "./Components/Navigation";
import ContentBytes from "../../../Common/ContentBytes/ContentBytes";
import Recommendation from "../../../Common/Recommendation/Recommendation";
import PerformanceCard from "../../../Common/PerformanceCard/PerformanceCard";
import {postRequest} from "../../../service/fetch-services";
import {IRecommendation} from "./Helper/interfaces"

//import Components

const UserDashboard = () => {



  const [data, setData] = useState<IRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await postRequest("/api/list",{isActiveOnly:true});      
      setData(result?.data?.recommendations||[]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);



  return (
    <React.Fragment>
      {/* <BreadcrumbItem mainTitle="Dashboard" subTitle="Home" /> */}
      <div className="mb-3">
        <Card>
          <CardBody className="pt-0">
            <Navigation />
            <ScrollSpy scrollThrottle={100} useBoxMethod={false}>
              <div
                className="user-dashboard-container dashboard-recommendation"
                id="recommendation"
              >
                <div>
                  <h3>Hey Vishal Soni</h3>
                  <p className="mt-3 mb-5 font-weight-normal fs-5">
                    Here is your command center
                  </p>
                </div>
                <Col lg={12}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="mb-0">Recommendations</h5>
                    <button
                      type="button"
                      className="btn btn-sm my-2 me-1 btn-light-success"
                    >
                      View All
                      <i className="ms-2 fas fa-arrow-circle-right"></i>
                    </button>
                  </div>
                </Col>
                <Row>
                  {!loading && data?.map((item,i) => {
                    return (
                      <Col xs={12} sm={6} xxl={4} key={i}>
                        <Recommendation data={item}/>
                      </Col>
                    );
                  })}
                </Row>
              </div>
              <div className="user-dashboard-container" id="content-bytes">
                <Row>
                  <Col lg={12}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="mb-0">Content Bytes</h5>
                      <button
                        type="button"
                        className="btn btn-sm my-2 me-1 btn-light-success"
                      >
                        View All
                        <i className="ms-2 fas fa-arrow-circle-right"></i>
                      </button>
                    </div>
                  </Col>
                  {[1, 2, 3]?.map((i) => {
                    return (
                      <Col xs={6} key={i}>
                        <ContentBytes />
                      </Col>
                    );
                  })}
                </Row>
              </div>
              <div className="user-dashboard-container" id="past-performance">
                <h5 className="mb-4">Past Performance</h5>

                <Row>
                  {[1, 2, 3]?.map((i) => {
                    return (
                      <Col xs={6} sm={4} md={4} lg={4} xxl={3} key={i}>
                        <PerformanceCard />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </ScrollSpy>
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;
