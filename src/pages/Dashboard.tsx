import React, { useEffect, useState } from "react";

//import Components
import BreadcrumbItem from "../Common/BreadcrumbItem";
import visitor1 from "../assets/images/widget/img-visitor.png";
// import visitor from "../assets/images/widget/img-status-1.svg";
// import bgImg from "../assets/images/widget/img-status-7.svg";
import { Card, Col, Spinner } from "react-bootstrap";
import AdminRecommendation from "../Common/AdminRecommendation/AdminRecommendation";
import { postRequest } from "../service/fetch-services";
import { IRecommendation } from "./Pages/UserDashboard/Helper/interfaces";
import Loader from "../Common/Loader/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState<IRecommendation[]>([]);
  const [activeUsers, setActiveUsers] = useState();
  const [recommendationLoading, setRecommendationLoading] = useState<boolean>(false);

  const fetchActiveUsersCount = async () => {
    try {
      const body = {
        isActiveOnly: true,
      };
      const result = await postRequest("user/userCount", body);
      const { users } = result.data;
      setActiveUsers(users);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const body = {
          isActiveOnly: true,
        };
        const result = await postRequest("recommendation/list", body);
        const { recommendations } = result.data;
        setdata(recommendations);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data from Firestore:", err);
        setLoading(false);
      }
    };

    fetchRecommendations();
    fetchActiveUsersCount();
  }, []);

  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="Dashboard" subTitle="Home" />
      <div className="col-12 mt-4 pb-0">
        <Col md={12} xxl={4}>
          <Card className="statistics-card-1">
            <Card.Body>
              <img src={visitor1} alt="img" className="img-fluid img-bg" />
              <div className="d-flex align-items-center">
                <div className="avtar bg-brand-color-3 text-white me-3">
                  <i className="ph-duotone ph-users-four f-26"></i>
                </div>
                <div>
                  <p className="text-muted mb-0">Users</p>
                  <div className="d-flex align-items-end">
                    <h2 className="mb-0 f-w-500">{activeUsers || 0}</h2>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
      <div className="row mt-4 pb-4">
        {loading ? (
          <Spinner />
        ) : (
          data?.map((item) => (
            <Col md={6} xl={4} key={item?._id}>
              <AdminRecommendation data={item} setdata={setdata} updateLoading={recommendationLoading} setUpdateLoading={(val: boolean) => setRecommendationLoading(val)} />
            </Col>
          ))
        )}
      </div>
      <Loader updateLoading={recommendationLoading}></Loader>
    </React.Fragment>
  );
};

export default Dashboard;
