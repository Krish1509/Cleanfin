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
import { initializeSocket, TouchlineData, reconnectSocket } from "../service/socketService";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../helper/firebase-config";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState<IRecommendation[]>([]);
  const [activeUsers, setActiveUsers] = useState();
  const [recommendationLoading, setRecommendationLoading] = useState<boolean>(false);

  useEffect(() => {
    reconnectSocket();
    const socket = initializeSocket();

    socket.on("newTouchlineData", (data: TouchlineData) => {
      setdata((prevData) =>
        prevData.map((item) => {
          if (data?.data.scrip.scrip_token === item.scriptCode.toString()) {
            return { ...item, touchlineData: data };
          }
          return item;
        })
      );
    });
  }, []);

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
    reconnectSocket();
    const socket = initializeSocket();

    socket.on("newTouchlineData", (data: TouchlineData) => {
      setdata((prevData) =>
        prevData.map((item) => {
          if (data?.data.scrip.scrip_token === item.scriptCode.toString()) {
            return { ...item, touchlineData: data };
          }
          return item;
        })
      );
    });
  }, []);

  const fetchData = () => {
    try {
      setLoading(true);

      // Create a query to filter documents where isActive is true
      const recommendationsQuery = query(
        collection(db, "recommendations"),
        where("isActive", "==", true) // Filter for isActive = true
      );

      // Listening for real-time updates using onSnapshot
      const unsubscribe = onSnapshot(recommendationsQuery, (querySnapshot) => {
        const fetchedData = querySnapshot.docs.map((doc) => {
          const data = doc.data() as IRecommendation;

          // Include the document ID in the returned object
          return {
            ...data,
            id: doc.id, // Add the document ID to each item
          };
        });

        const sortedData = fetchedData.sort((a, b) => {
          const dateTimeA = new Date(`${a.date.toDate().toISOString().split("T")[0]}T${a.time}`);
          const dateTimeB = new Date(`${b.date.toDate().toISOString().split("T")[0]}T${b.time}`);
          return dateTimeB.getTime() - dateTimeA.getTime(); // Newest first
        });

        setdata(sortedData); // Set the sorted data to state
        setLoading(false);
      });

      // Cleanup function to unsubscribe from the snapshot listener when the component is unmounted
      return () => unsubscribe();
    } catch (err) {
      console.log("Error fetching data from Firestore:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
